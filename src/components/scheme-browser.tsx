"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, ThumbsUp, ThumbsDown, Info, ExternalLink, Star } from "lucide-react"

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
  { name: "PM Kisan Samman Nidhi", votes: "12k", type: "Central", color: "bg-primary" },
  { name: "Jal Jeevan Mission", votes: "8.5k", type: "Central", color: "bg-secondary" },
  { name: "UP: Swamitva Yojana", votes: "5.2k", type: "Uttar Pradesh", color: "bg-foreground" },
  { name: "Digital India Mission", votes: "4.1k", type: "Central", color: "bg-primary" },
  { name: "Maharashtra: Ladki Bahin", votes: "3.8k", type: "Maharashtra", color: "bg-secondary" },
]

export function SchemeBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Yojanaye")

  return (
    <div id="schemes" className="container mx-auto px-4 py-20 space-y-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">🔎 Explore Government Schemes</h2>
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-xl border focus-within:ring-2 ring-primary/20 transition-all">
          <Input 
            className="border-none shadow-none text-lg h-12 focus-visible:ring-0" 
            placeholder="Search Yojana by Name, State, Ministry, or Keyword..." 
          />
          <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 gap-2">
            <Search className="h-5 w-5" /> Search
          </Button>
          <Button size="lg" variant="outline" className="h-12 gap-2 hidden sm:flex">
            <Filter className="h-5 w-5" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                📌 CATEGORIES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat.name 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'hover:bg-muted'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    <Badge variant={activeCategory === cat.name ? "secondary" : "outline"} className="rounded-full">
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card className="bg-foreground text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🚀 TRENDING YOJANAYE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingSchemes.map((scheme, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{scheme.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-white/60">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-2.5 h-2.5" /> {scheme.votes}</span>
                      <span>•</span>
                      <span>{scheme.type}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-white/80 border-white/20 text-[10px]">#{i+1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Featured Content */}
        <div className="lg:col-span-9 space-y-8">
          <Card className="border-2 border-primary/20 overflow-hidden bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <img 
                  src="https://picsum.photos/seed/tap/800/600" 
                  alt="Jal Jeevan Mission" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:hidden">
                   <Badge className="w-fit mb-2 bg-secondary">Featured of the Day</Badge>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="hidden md:block">
                  <Badge className="bg-secondary mb-2">🌟 FEATURED YOJANA OF THE DAY</Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black font-headline tracking-tighter text-foreground uppercase">Jal Jeevan Mission</h3>
                  <p className="text-xl text-primary font-bold">Har Ghar Nal Se Jal</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">🎯 Target</p>
                    <p className="text-lg font-bold">Year 2024</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">✅ Progress</p>
                    <p className="text-lg font-bold">78% Complete</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  The Jal Jeevan Mission, launched by PM Narendra Modi, aims to provide safe and adequate drinking water through individual household tap connections to all rural households in India.
                </p>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90 gap-2 font-bold h-12">
                    <ThumbsUp className="h-5 w-5" /> Vote Now
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 font-bold h-12">
                    <Info className="h-5 w-5" /> Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="group hover:shadow-xl transition-all border-transparent hover:border-primary/20 cursor-pointer overflow-hidden">
                <div className="h-40 bg-muted relative">
                  <img src={`https://picsum.photos/seed/scheme-${i}/400/200`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <Badge className="absolute top-2 right-2 bg-white/80 text-foreground backdrop-blur-sm">National</Badge>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">PM Garib Kalyan Yojana</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">Providing free food grains to the poorest citizens through the Public Distribution System.</p>
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.8 Rating</span>
                    <span>1.2M Beneficiaries</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                   <Button variant="ghost" size="sm" className="flex-1 text-xs">Details</Button>
                   <Button variant="secondary" size="sm" className="flex-1 text-xs">Apply</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
             <Button variant="link" className="text-primary font-bold text-lg">See All 5,300+ Schemes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
