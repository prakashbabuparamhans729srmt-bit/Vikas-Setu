
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, TrendingUp, BarChart3, Clock, Globe, Shield, Activity } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useUser, useFirestore } from "@/firebase"
import { doc, serverTimestamp } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"

const initialSchemes = [
  { id: 1, name: "PM Kisan", state: "National", rating: 4.9, votes: 125, progress: 95 },
  { id: 2, name: "Rythu Bharosa", state: "Telangana", rating: 4.8, votes: 89, progress: 92 },
  { id: 3, name: "Majhi Ladki Bahin", state: "Maharashtra", rating: 4.5, votes: 210, progress: 88 },
  { id: 4, name: "Ayushman Bharat", state: "National", rating: 4.4, votes: 450, progress: 76 },
]

export function ImpactDashboard() {
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [schemes] = useState(initialSchemes)
  const [activeActions, setActiveActions] = useState<Record<string, 'up' | 'down' | null>>({})

  const handleAction = (id: number, type: 'up' | 'down') => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please authorize your node to cast a vote.", variant: "destructive" });
      return;
    }
    if (!db) return;

    const voteType = type === 'up' ? 'upvote' : 'downvote';
    const voteId = `vote-scheme-${id}`;
    const voteRef = doc(db, "userProfiles", user.uid, "schemeVotes", voteId);

    setDocumentNonBlocking(voteRef, {
      id: voteId,
      schemeId: String(id),
      userId: user.uid,
      voteType: voteType,
      createdAt: serverTimestamp()
    }, { merge: true });

    setActiveActions(prev => ({ ...prev, [id]: prev[id] === type ? null : type }));
    
    toast({
      title: type === 'up' ? "Trust Vector Increased" : "Efficiency Logged",
      description: `Data node ${id} feedback processed via public protocol.`,
    });
  }

  return (
    <section id="impact" className="py-32 bg-[#070707]">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full uppercase font-black text-[10px] tracking-[0.2em]">NATIONAL PROGRESS ENGINE</Badge>
          <h2 className="text-5xl font-black font-headline tracking-tighter text-white uppercase">{t('section_impact_title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">Processing real-time data from 1.4B demographic nodes to visualize the national trajectory.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 shadow-2xl border border-white/5 bg-[#161C21]/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden group">
            <CardHeader className="border-b border-white/5 p-10">
              <CardTitle className="flex items-center gap-4 text-white uppercase font-black tracking-tighter text-2xl">
                <BarChart3 className="text-primary w-8 h-8 interactive-icon" /> SYSTEM THROUGHPUT ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-6xl font-black text-white tracking-tighter">68.4% <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-4">Overall Completion</span></span>
                  <Badge className="bg-primary text-black font-black px-6 py-2 rounded-xl text-[10px] tracking-widest uppercase">TARGET 2030: 100%</Badge>
                </div>
                <div className="relative h-6 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_#07f1d6] transition-all duration-1000 ease-out" style={{ width: '68.4%' }} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { label: "2020-21 FY", val: 70 },
                  { label: "2021-22 FY", val: 75 },
                  { label: "2022-23 FY", val: 82, active: true },
                  { label: "2023-24 LIVE", val: 68, live: true }
                ].map((stat, i) => (
                  <div key={i} className="space-y-4 group/stat cursor-pointer" onClick={() => toast({ title: `${stat.label} Snapshot`, description: `Historical completion vector: ${stat.val}%` })}>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover/stat:text-white transition-colors">
                      <span className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary interactive-icon" /> {stat.label}</span>
                      <span className={cn("transition-colors", stat.active ? 'text-primary' : stat.live ? 'text-secondary' : '')}>{stat.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={cn("h-full transition-all duration-700", stat.live ? 'bg-secondary' : stat.active ? 'bg-primary' : 'bg-white/20')} style={{ width: `${stat.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border border-primary/20 bg-[#070707] text-white rounded-[3rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8">
               <Globe className="w-12 h-12 text-primary/10 animate-spin-slow interactive-icon group-hover:text-primary/40 transition-colors" />
            </div>
            <CardHeader className="p-10">
              <CardTitle className="flex items-center gap-4 text-primary uppercase font-black text-xl tracking-tighter">
                <TrendingUp className="text-primary w-6 h-6 interactive-icon" /> GROWTH INSIGHTS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-8">
              {[
                { label: "High-Velocity Sector", title: "Infrastructure (NHAI)", desc: "+15.4% Completion YoY", color: "hover:border-primary/50" },
                { label: "Public Trust Vector", title: "8.4 / 10.0", desc: "250,000 Verified Nodes", color: "hover:border-secondary/50" }
              ].map((item, i) => (
                <div key={i} className={cn("p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-3 group transition-all cursor-pointer", item.color)} onClick={() => toast({ title: item.label, description: item.title })}>
                  <p className={cn("text-[10px] font-black uppercase tracking-[0.3em]", i === 0 ? "text-primary" : "text-secondary")}>{item.label}</p>
                  <p className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{item.title}</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
              <div className="p-8 rounded-[2rem] bg-primary/[0.05] border border-primary/30 flex items-center justify-between group hover:bg-primary transition-all duration-500 cursor-pointer" onClick={() => toast({ title: "Hyper Growth Protocol", description: "Digital index performance exceeded expectations." })}>
                 <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-black">Digital Index</p>
                   <p className="text-xl font-black text-white group-hover:text-black uppercase tracking-tighter">HYPER GROWTH</p>
                 </div>
                 <div className="text-right">
                    <span className="text-4xl font-black text-primary group-hover:text-black">↑ 22%</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-white/5 bg-white/[0.01] rounded-[4rem] overflow-hidden">
          <CardHeader className="bg-white/[0.02] border-b border-white/5 p-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <CardTitle className="text-3xl font-black font-headline flex items-center gap-6 text-white uppercase tracking-tighter">
                <Shield className="w-10 h-10 text-primary interactive-icon" /> TOP RATED RESOURCE NODES
              </CardTitle>
              <Button variant="outline" className="border-primary/20 text-primary uppercase font-black tracking-widest h-12 px-8 rounded-xl hover:bg-primary/10" onClick={() => toast({ title: "Analysis Refreshed", description: "Fetching latest node performance metrics..." })}>
                <Activity className="mr-2 w-4 h-4 animate-pulse interactive-icon" /> REFRESH SYNC
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 bg-white/5 hover:bg-white/5">
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-[10px]">NODE NAME</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-[10px]">STATE HUB</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-[10px]">PUBLIC RATING</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-center text-[10px]">ENGAGEMENT</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-right text-[10px]">SYSTEM ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schemes.map((scheme) => (
                  <TableRow key={scheme.name} className="border-white/5 hover:bg-primary/[0.03] transition-all cursor-pointer group">
                    <TableCell className="p-8 font-black text-2xl text-white group-hover:text-primary transition-colors tracking-tighter uppercase">{scheme.name}</TableCell>
                    <TableCell className="p-8">
                      <Badge variant="outline" className="border-white/10 text-white/60 font-black uppercase tracking-widest text-[8px]">{scheme.state}</Badge>
                    </TableCell>
                    <TableCell className="p-8">
                      <div className="flex items-center gap-4 font-black">
                        <span className="text-primary text-xl">★ {scheme.rating}</span>
                        <div className="hidden sm:flex h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary cyan-glow" style={{ width: `${scheme.rating * 20}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-8 text-center text-white/40 font-black uppercase tracking-widest text-[10px]">{scheme.votes}k INTERACTIONS</TableCell>
                    <TableCell className="p-8 text-right">
                      <div className="flex justify-end gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("h-12 w-12 border border-primary/20 hover:bg-primary hover:text-black transition-all rounded-xl", activeActions[scheme.id] === 'up' && "bg-primary text-black")}
                          onClick={(e) => { e.stopPropagation(); handleAction(scheme.id, 'up'); }}
                        >
                          <ThumbsUp className="h-6 w-6 interactive-icon" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("h-12 w-12 border border-secondary/20 hover:bg-secondary hover:text-white transition-all rounded-xl", activeActions[scheme.id] === 'down' && "bg-secondary text-white")}
                          onClick={(e) => { e.stopPropagation(); handleAction(scheme.id, 'down'); }}
                        >
                          <ThumbsDown className="h-6 w-6 interactive-icon" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
