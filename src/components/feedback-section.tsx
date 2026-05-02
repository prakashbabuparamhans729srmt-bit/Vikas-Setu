'use client';

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Send, MessageSquare, Quote, BrainCircuit, Lightbulb, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, serverTimestamp, doc, query, orderBy, limit } from "firebase/firestore"
import { addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

export function FeedbackSection() {
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [pollValue, setPollValue] = useState("yes")

  // Idea Submission State
  const [ideaTitle, setIdeaTitle] = useState("")
  const [ideaDesc, setIdeaDesc] = useState("")
  const [isSubmittingIdea, setIsSubmittingIdea] = useState(false)
  const [isIdeaDialogOpen, setIsIdeaDialogOpen] = useState(false)

  const feedbackQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(10));
  }, [db]);
  const { data: feedbackItems, isLoading: feedbackLoading } = useCollection(feedbackQuery);

  const handleVote = () => {
    if (!user) {
      toast({ title: "Auth Required", description: "Log in to register your opinion node.", variant: "destructive" });
      return;
    }
    if (!db) return;
    
    const voteRef = doc(db, "userProfiles", user.uid, "pollVotes", "day-poll");
    setDocumentNonBlocking(voteRef, {
      id: "day-poll",
      pollId: "day-poll",
      pollOptionId: pollValue,
      userId: user.uid,
      createdAt: serverTimestamp()
    }, { merge: true });

    toast({ title: "Vote Registered", description: "Opinion node synchronized with national data." });
  }

  const handleSendFeedback = async () => {
    if (!feedback.trim()) return;
    if (!user) {
      toast({ title: "Auth Required", description: "Connect your node to broadcast feedback.", variant: "destructive" });
      return;
    }
    if (!db) return;
    setIsSending(true)
    
    try {
      const feedbackRef = collection(db, "feedback");
      addDocumentNonBlocking(feedbackRef, {
        userId: user.uid,
        userName: user.displayName || "Citizen Node",
        type: "General",
        content: feedback,
        createdAt: serverTimestamp()
      });
      
      setFeedback("")
      setIsSending(false)
      toast({ title: "Broadcast Logged", description: "Feedback node successfully pushed to the stream." });
    } catch (error) {
      setIsSending(false)
    }
  }

  const handleSubmitIdea = async () => {
    if (!ideaTitle.trim() || !ideaDesc.trim()) return;
    if (!user) {
      toast({ title: "Auth Required", description: "Node authentication required for innovation proposals.", variant: "destructive" });
      return;
    }
    if (!db) return;
    setIsSubmittingIdea(true);

    try {
      const ideasRef = collection(db, "feedback");
      addDocumentNonBlocking(ideasRef, {
        userId: user.uid,
        userName: user.displayName || "Citizen Node",
        type: "Idea",
        content: `Title: ${ideaTitle}\n\nDescription: ${ideaDesc}`,
        createdAt: serverTimestamp()
      });

      setIdeaTitle("");
      setIdeaDesc("");
      setIsSubmittingIdea(false);
      setIsIdeaDialogOpen(false);
      toast({ title: "Innovation Logged", description: "Your idea node has been pushed to the national registry." });
    } catch (error) {
      setIsSubmittingIdea(false);
    }
  }

  return (
    <section id="feedback" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center space-y-6">
          <Badge className="bg-primary text-black px-6 py-2 text-xs font-black uppercase tracking-[0.3em] rounded-full">CITIZEN FEEDBACK LOOP</Badge>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <h2 className="text-5xl font-black font-headline text-white tracking-tighter uppercase italic">{t('section_feedback_title')}</h2>
            <Dialog open={isIdeaDialogOpen} onOpenChange={setIsIdeaDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary hover:bg-white text-white hover:text-black font-black uppercase tracking-widest px-8 rounded-2xl h-14 cyan-glow flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 animate-pulse" /> {t('propose_title')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#14181B]/95 backdrop-blur-3xl border-secondary/20 rounded-[2.5rem] shadow-2xl max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black uppercase text-white tracking-tighter italic">Propose <span className="text-secondary">Innovation</span> Node</DialogTitle>
                  <DialogDescription className="text-white/40 font-medium">Broadcast your architectural ideas for a better Bharat.</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Idea Title</Label>
                    <Input 
                      value={ideaTitle}
                      onChange={(e) => setIdeaTitle(e.target.value)}
                      placeholder="e.g., Rural Solar Mesh Grid" 
                      className="bg-black/40 border-white/5 rounded-xl h-12 text-white font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Detailed Protocol</Label>
                    <Textarea 
                      value={ideaDesc}
                      onChange={(e) => setIdeaDesc(e.target.value)}
                      placeholder="Describe the impact and implementation..." 
                      className="bg-black/40 border-white/5 rounded-2xl min-h-[120px] text-white font-medium"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleSubmitIdea}
                    disabled={isSubmittingIdea || !ideaTitle.trim() || !ideaDesc.trim()}
                    className="w-full h-14 bg-secondary text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl group"
                  >
                    {isSubmittingIdea ? "SYNCING NODE..." : t('submit_idea')}
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-white/40 max-w-2xl mx-auto font-medium">Your pulse shapes the national trajectory. Every node contributes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <Card className="lg:col-span-4 border border-primary/20 bg-black/60 backdrop-blur-xl rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <CardHeader className="bg-primary p-8 text-black text-center">
              <CardTitle className="text-sm font-black flex items-center justify-center gap-3 uppercase tracking-[0.2em]">
                <BrainCircuit className="w-5 h-5 animate-pulse interactive-icon" /> {t('poll_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10 relative z-10">
              <p className="text-2xl font-black text-white text-center leading-tight tracking-tighter">
                {t('poll_q')}
              </p>
              
              <RadioGroup value={pollValue} onValueChange={setPollValue} className="space-y-4">
                {[
                  { id: 'r1', label: 'हाँ, बिल्कुल', val: 'yes' },
                  { id: 'r2', label: 'नहीं', val: 'no' },
                  { id: 'r3', label: 'पता नहीं', val: 'idk' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:border-primary/50 transition-all bg-white/5 group/opt cursor-pointer" onClick={() => setPollValue(option.val)}>
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={option.val} id={option.id} className="border-primary text-primary" />
                      <Label htmlFor={option.id} className="text-lg font-bold text-white/80 group-hover/opt:text-white transition-colors cursor-pointer">{option.label}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-center p-10 pt-0">
              <Button onClick={handleVote} className="w-full h-16 bg-white text-black hover:bg-primary transition-all text-lg font-black rounded-2xl uppercase shadow-lg">
                {t('poll_btn')}
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-8 space-y-10">
            <Card className="bg-white/5 shadow-2xl border-white/10 rounded-[3rem] backdrop-blur-md overflow-hidden">
              <CardHeader className="border-b border-white/5 p-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-black flex items-center gap-3 text-white/60 tracking-widest uppercase">
                    <MessageSquare className="w-5 h-5 text-primary interactive-icon" /> {t('feedback_title')}
                  </CardTitle>
                  <Badge variant="outline" className="border-primary/40 text-primary uppercase font-black tracking-widest text-[10px] animate-pulse">LIVE CONNECT</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5 max-h-[450px] overflow-y-auto custom-scrollbar">
                  {feedbackLoading ? (
                    <div className="p-10 text-center animate-pulse text-primary font-black uppercase tracking-widest text-[10px]">SYNCING NODES...</div>
                  ) : feedbackItems && feedbackItems.length > 0 ? (
                    feedbackItems.map((item: any, i: number) => (
                    <div key={i} className="p-8 space-y-4 hover:bg-primary/[0.02] transition-colors group">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-primary text-black flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(7,241,214,0.3)]">
                            {(item.userName || item.userId || "C").charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white text-lg">{item.userName || "Citizen Node"}</p>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">STREAM FEED • {item.createdAt?.toDate?.()?.toLocaleDateString() || "Recent"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative pl-8">
                        <Quote className="absolute top-0 left-0 w-5 h-5 text-primary/20 interactive-icon" />
                        <p className="text-white/60 italic font-medium text-lg leading-relaxed group-hover:text-white/90 transition-colors">"{item.content}"</p>
                      </div>
                    </div>
                  ))) : (
                    <div className="p-20 text-center text-white/20 font-black uppercase tracking-widest">NO NODES DETECTED IN STREAM</div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-10 bg-white/[0.02] border-t border-white/5 rounded-b-[3rem] flex flex-col gap-6">
                 <div className="w-full flex gap-4">
                    <Textarea 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your experience or idea for Vikas Setu..." 
                      className="resize-none min-h-[80px] flex-1 bg-black/40 border-white/10 focus:border-primary/50 text-white rounded-2xl p-4 font-medium"
                    />
                    <Button 
                      disabled={isSending || !feedback.trim()}
                      onClick={handleSendFeedback}
                      className="h-auto bg-primary hover:bg-white text-black hover:text-black flex flex-col items-center justify-center gap-2 px-8 rounded-2xl transition-all cyan-glow"
                    >
                      <Send className={cn("h-6 w-6 interactive-icon", isSending && "animate-ping")} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{isSending ? "SYNCING" : t('button_send')}</span>
                    </Button>
                 </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
