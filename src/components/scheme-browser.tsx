"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, ThumbsUp, ThumbsDown, Info, ExternalLink, Star, Briefcase, Heart, Book, Home, Smartphone, Users } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const categories = [
  { name: "All Yojanaye", count: 5300, icon: "✅" },
  { name: "Central Sarkar", count: 1200, icon: "🏛️" },
  { name: "State Sarkar", count: 4100, icon: "🗺️" },
  { name: "Kisan Yojana", count: 450, icon: "🌾" },
  { name: "Mahila Yojana", count: 320, icon: "👩" },
  { name: "Yuva Yojana", count: 280, icon: "🧑‍🎓" },
  { name: "Swasthya", count: 190, icon: "🏥" },
  { name: "Shiksha", count: 210, icon: "📚" },
  { name: "Gramin", count: 670, icon: "🏘️" },
  { name: "Shehri", count: 340, icon: "🏙️" },
]

const trendingSchemes = [
  { name: "PM Kisan Samman Nidhi", votes: "12k", type: "Central" },
  { name: "Jal Jeevan Mission", votes: "8.5k", type: "Central" },
  { name: "UP: Swamitva Yojana", votes: "5.2k", type: "Uttar Pradesh" },
  { name: "Digital India Mission", votes: "4.1k", type: "Central" },
  { name: "Maharashtra: Ladki Bahin", votes: "3.8k", type: "Maharashtra" },
]

export function SchemeBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Yojanaye")
  const { t } = useLanguage()

  return (
    <div id="schemes" className="container mx-auto px-4 py-32 space-y-16">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h2 className="text-5xl font-black font-headline tracking-tighter text-white uppercase">{t('section_schemes_title')}</h2>
        <div className="flex gap-4 p-3 bg-white/5 rounded-3xl shadow-2xl border border-white/10 focus-within:border-primary/50 transition-all backdrop-blur-md">
          <Input 
            className="border-none bg-transparent shadow-none text-xl h-14 focus-visible:ring-0 text-white placeholder:text-white/20" 
            placeholder={t('placeholder_search')}
          />
          <Button size="lg" className="h-14 bg-primary text-black font-black hover:bg-primary/80 gap-3 px-8 cyan-glow rounded-2xl">
            <Search className="h-6 w-6 interactive-icon" /> {t('search_btn')}
          </Button>
          <Button size="lg" variant="outline" className="h-14 gap-3 hidden sm:flex border-white/10 text-white hover:bg-white hover:text-black rounded-2xl">
            <Filter className="h-6 w-6 interactive-icon" /> {t('filter_btn')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Category Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
          <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-sm font-black flex items-center gap-3 text-white/60 tracking-widest uppercase">
                <Filter className="w-4 h-4 text-primary interactive-icon" /> CATEGORIES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <nav className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      activeCategory === cat.name 
                      ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xl transition-transform">{cat.icon}</span>
                      {cat.name}
                    </span>
                    <Badge variant={activeCategory === cat.name ? "secondary" : "outline"} className="rounded-full border-white/10 bg-black/20 text-[10px]">
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card className="bg-black border-primary/20 rounded-[2rem] overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="border-b border-white/5">
              <CardTitle className="text-sm font-black flex items-center gap-3 text-primary tracking-widest uppercase">
                🚀 TRENDING NODES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {trendingSchemes.map((scheme, i) => (
                <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-white group-hover/item:text-primary transition-colors">{scheme.name}</p>
                    <div className="flex items-center gap-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-primary interactive-icon" /> {scheme.votes}</span>
                      <span>•</span>
                      <span>{scheme.type}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-white/40 border border-white/10">
                    {i+1}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Featured Content */}
        <div className="lg:col-span-9 space-y-10">
          <Card className="border border-primary/20 rounded-[3rem] overflow-hidden bg-black/40 backdrop-blur-xl group hover:border-primary/50 transition-all duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-80 md:h-full overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/tap/1000/1000" 
                  alt="Jal Jeevan Mission" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
                   <Badge className="w-fit mb-4 bg-primary text-black font-black uppercase tracking-widest text-[10px]">FEATURED NODE</Badge>
                </div>
              </div>
              <div className="p-12 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-5xl font-black font-headline tracking-tighter text-white uppercase leading-none">JAL JEEVAN <br /><span className="text-primary italic">MISSION</span></h3>
                  <p className="text-xs text-primary font-black uppercase tracking-[0.4em]">Har Ghar Nal Se Jal</p>
                </div>
                <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">🎯 Target Year</p>
                    <p className="text-2xl font-black text-white">2026</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">✅ Live Progress</p>
                    <p className="text-2xl font-black text-primary">78.4%</p>
                  </div>
                </div>
                <p className="text-white/50 leading-relaxed font-medium">
                  Revolutionizing rural infrastructure by ensuring 100% digital-monitored household tap connections across the subcontinent.
                </p>
                <div className="flex gap-6">
                  <Button className="flex-1 bg-white text-black hover:bg-primary hover:text-black gap-3 font-black h-16 rounded-2xl transition-all">
                    <ThumbsUp className="h-5 w-5 interactive-icon" /> VOTE NODE
                  </Button>
                  <Button variant="outline" className="flex-1 gap-3 font-black h-16 rounded-2xl border-white/10 hover:border-primary transition-all text-white">
                    <Info className="h-5 w-5 interactive-icon" /> SYSTEM LOGS
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="group glass-card rounded-[2.5rem] border-white/5 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col">
                <div className="h-48 bg-black relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/scheme-${i}/600/400`} 
                    className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <Badge className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white backdrop-blur-md uppercase text-[10px] font-black tracking-widest">NATIONAL</Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black text-white group-hover:text-primary transition-colors leading-tight uppercase">PM GARIB KALYAN <br />YOJANA SYSTEM</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6 flex-1">
                  <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-2">Securing the nutrition pipeline for the subcontinent's most vulnerable demographic nodes.</p>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/60 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-2"><Star className="w-3 h-3 text-primary fill-primary interactive-icon" /> 4.8 SCORE</span>
                    <span className="flex items-center gap-2"><Users className="w-3 h-3 text-primary interactive-icon" /> 1.2M NODES</span>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex gap-4">
                   <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-black uppercase border border-white/5 hover:border-primary hover:bg-transparent text-white rounded-xl">DETAILS</Button>
                   <Button variant="secondary" size="sm" className="flex-1 text-[10px] font-black uppercase bg-primary text-black hover:bg-white transition-colors rounded-xl">APPLY NOW</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
             <Button variant="link" className="text-primary font-black text-lg hover:tracking-widest transition-all uppercase">SEE ALL 5,300+ RESOURCE NODES</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
