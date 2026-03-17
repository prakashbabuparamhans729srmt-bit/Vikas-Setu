"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, TrendingUp, BarChart3, Clock, Globe, Shield } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const topRatedSchemes = [
  { name: "PM Kisan", state: "National", rating: 4.9, votes: "125k", progress: 95 },
  { name: "Rythu Bharosa", state: "Telangana", rating: 4.8, votes: "89k", progress: 92 },
  { name: "Ladki Bahin", state: "Maharashtra", rating: 4.5, votes: "210k", progress: 88 },
  { name: "Ayushman Bharat", state: "National", rating: 4.4, votes: "450k", progress: 76 },
]

export function ImpactDashboard() {
  const { t } = useLanguage()

  return (
    <section id="impact" className="py-32 bg-background">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full uppercase font-black text-xs tracking-widest">NATIONAL PROGRESS ENGINE</Badge>
          <h2 className="text-5xl font-black font-headline tracking-tighter text-white uppercase">{t('section_impact_title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">Processing real-time data from 1.4B demographic nodes to visualize the national trajectory.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 shadow-2xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] overflow-hidden group">
            <CardHeader className="border-b border-white/5 p-10">
              <CardTitle className="flex items-center gap-4 text-white uppercase font-black tracking-tighter text-2xl">
                <BarChart3 className="text-primary w-8 h-8 interactive-icon" /> SYSTEM THROUGHPUT ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-6xl font-black text-white tracking-tighter">68.4% <span className="text-xs font-black text-primary uppercase tracking-[0.4em] ml-4">Overall Completion</span></span>
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
                  <div key={i} className="space-y-4 group/stat cursor-default">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                      <span className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary interactive-icon" /> {stat.label}</span>
                      <span className={stat.active ? 'text-primary' : stat.live ? 'text-secondary' : ''}>{stat.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-700 ${stat.live ? 'bg-secondary' : stat.active ? 'bg-primary' : 'bg-white/20'}`} style={{ width: `${stat.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border border-primary/20 bg-black text-white rounded-[3rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
               <Globe className="w-12 h-12 text-primary/10 animate-spin-slow interactive-icon" />
            </div>
            <CardHeader className="p-10">
              <CardTitle className="flex items-center gap-4 text-primary uppercase font-black text-xl tracking-tighter">
                <TrendingUp className="text-primary w-6 h-6 interactive-icon" /> GROWTH INSIGHTS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-8">
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-3 group hover:border-primary/50 transition-all">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">High-Velocity Sector</p>
                <p className="text-2xl font-black text-white leading-tight">Infrastructure (NHAI)</p>
                <p className="text-xs text-white/30 font-bold uppercase tracking-widest">+15.4% Completion YoY</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-3 group hover:border-secondary/50 transition-all">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Public Trust Vector</p>
                <p className="text-2xl font-black text-white leading-tight">8.4 / 10.0</p>
                <p className="text-xs text-white/30 font-bold uppercase tracking-widest">250,000 Verified Nodes</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-primary/[0.05] border border-primary/30 flex items-center justify-between group hover:bg-primary transition-all duration-500">
                 <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-black">Digital Index</p>
                   <p className="text-xl font-black text-white group-hover:text-black uppercase">HYPER GROWTH</p>
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
            <CardTitle className="text-3xl font-black font-headline flex items-center gap-6 text-white uppercase tracking-tighter">
              <Shield className="w-10 h-10 text-primary interactive-icon" /> TOP RATED RESOURCE NODES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 bg-white/5 hover:bg-white/5">
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8">NODE NAME</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8">STATE HUB</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8">PUBLIC RATING</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-center">ENGAGEMENT</TableHead>
                  <TableHead className="font-black text-white/40 uppercase tracking-widest p-8 text-right">SYSTEM ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRatedSchemes.map((scheme) => (
                  <TableRow key={scheme.name} className="border-white/5 hover:bg-primary/[0.03] transition-all cursor-pointer group">
                    <TableCell className="p-8 font-black text-2xl text-white group-hover:text-primary transition-colors">{scheme.name}</TableCell>
                    <TableCell className="p-8">
                      <Badge variant="outline" className="border-white/10 text-white/60 font-black uppercase tracking-widest text-[10px]">{scheme.state}</Badge>
                    </TableCell>
                    <TableCell className="p-8">
                      <div className="flex items-center gap-4 font-black">
                        <span className="text-primary text-xl">★ {scheme.rating}</span>
                        <div className="hidden sm:flex h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary cyan-glow" style={{ width: `${scheme.rating * 20}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-8 text-center text-white/40 font-black uppercase tracking-widest text-[10px]">{scheme.votes} INTERACTIONS</TableCell>
                    <TableCell className="p-8 text-right">
                      <div className="flex justify-end gap-3">
                        <Button variant="ghost" size="icon" className="h-12 w-12 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all rounded-xl">
                          <ThumbsUp className="h-6 w-6 interactive-icon" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all rounded-xl">
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
