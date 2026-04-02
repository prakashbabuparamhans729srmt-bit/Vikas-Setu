
"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Send, MessageSquare, Quote, Star, Users, BrainCircuit, Sparkles, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp, setDoc, doc, query, orderBy, limit } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export function FeedbackSection() {
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  const [feedback, setFeedback] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [pollValue, setPollValue] = useState("yes")

  const feedbackQuery = useMemo(() => {
    return query(collection(db, "feedback"), orderBy("timestamp", "desc"), limit(10));
  }, [db]);
  const { data: feedbackItems, loading: feedbackLoading } = useCollection(feedbackQuery);

  const handleVote = () => {
    if (!user) {
      toast({ title: "Auth Required", description: "Log in to synchronize your opinion node.", variant: "destructive" });
      return;
    }
    const voteRef = doc(db, "polls", "day-poll", "votes", user.uid);
    setDoc(voteRef, {
      optionId: pollValue,
      userId: user.uid,
      timestamp: serverTimestamp()
    }).then(() => {
      toast({ title: "Vote Synchronized", description: "Opinion node registered." });
    }).catch(async (e) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: voteRef.path,
        operation: 'write',
        requestResourceData: { optionId: pollValue }
      }));
    });
  }

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    if (!user) {
      toast({ title: "Auth Required", description: "Connect your node to share feedback.", variant: "destructive" });
      return;
    }
    setIsSending(true)
    
    const feedbackRef = collection(db, "feedback");
    addDoc(feedbackRef, {
      userName: user.displayName || "Anonymous Citizen",
      location: "Bharat",
      text: feedback,
      rating: 5,
      timestamp: serverTimestamp(),
      userId: user.uid
    }).then(() => {
      setIsSending(false)
      setFeedback("")
      toast({ title: "Feedback Logged", description: "Your data node has been added to the public stream." });
    }).catch(async (e) => {
      setIsSending(false)
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'feedback',
        operation: 'create',
        requestResourceData: { text: feedback }
      }));
    });
  }

  return (
    <section id="feedback" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center space-y-6">
          <Badge className="bg-primary text-black px-6 py-2 text-xs font-black uppercase tracking-[0.3em] rounded-full">CITIZEN FEEDBACK LOOP</Badge>
          <h2 className="text-5xl font-black font-headline text-white tracking-tighter uppercase">{t('section_feedback_title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium">Every citizen is a sensor. Your pulse shapes the national trajectory. Input your data below.</p>
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
              <Button onClick={handleVote} className="w-full h-16 bg-white text-black hover:bg-primary transition-all text-lg font-black rounded-2xl uppercase">
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
                            {item.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white text-lg">{item.userName}</p>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.location} • LIVE DATA</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, star) => (
                            <Star key={star} className={`w-4 h-4 interactive-icon ${star < (item.rating || 5) ? 'text-primary fill-primary' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="relative pl-8">
                        <Quote className="absolute top-0 left-0 w-5 h-5 text-primary/20 interactive-icon" />
                        <p className="text-white/60 italic font-medium text-lg leading-relaxed group-hover:text-white/90 transition-colors">"{item.text}"</p>
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
                      className="resize-none min-h-[80px] flex-1 bg-black/40 border-white/10 focus:border-primary/50 text-white rounded-2xl p-4"
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
