
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, ThumbsUp, ThumbsDown, Info, Star, Users, Mic, MicOff } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"

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

const allSchemes = [
  { id: 1, name: "PM Kisan Samman Nidhi", type: "Central", description: "Direct income support of ₹6,000 per year to all landholding farmers' families.", rating: 4.9, users: "125M", progress: 95, tags: ["Agriculture", "Direct Benefit"] },
  { id: 2, name: "Jal Jeevan Mission", type: "Central", description: "Providing safe and adequate drinking water through individual household tap connections by 2024.", rating: 4.8, users: "89M", progress: 78, tags: ["Infrastructure", "Water"] },
  { id: 3, name: "Digital India Mission", type: "Central", description: "Ensuring government services are made available to citizens electronically.", rating: 4.7, users: "250M", progress: 82, tags: ["Technology", "Connectivity"] },
  { id: 4, name: "Ladki Bahin Yojana", type: "Maharashtra", description: "Financial assistance program for women empowerment in Maharashtra.", rating: 4.5, users: "3.8M", progress: 88, tags: ["Women", "State"] },
  { id: 5, name: "Ayushman Bharat", type: "Central", description: "World's largest government-funded healthcare program providing coverage of ₹5 lakh per family.", rating: 4.6, users: "450M", progress: 76, tags: ["Health", "Insurance"] },
  { id: 6, name: "PM Awas Yojana", type: "Central", description: "Housing for All initiative ensuring every family has a pucca house with basic amenities.", rating: 4.4, users: "12M", progress: 91, tags: ["Housing", "Infrastructure"] },
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
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const { t } = useLanguage()

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter(scheme => {
      const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Yojanaye" || 
                             (activeCategory === "Central Sarkar" && scheme.type === "Central") ||
                             (activeCategory === "State Sarkar" && scheme.type !== "Central") ||
                             (scheme.tags.some(tag => activeCategory.includes(tag)));
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => setSearchQuery(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div id="schemes" className="container mx-auto px-4 py-32 space-y-16">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h2 className="text-5xl font-black font-headline tracking-tighter text-foreground uppercase">{t('section_schemes_title')}</h2>
        <div className="flex gap-4 p-3 bg-card/50 rounded-3xl shadow-2xl border border-border focus-within:border-primary/50 transition-all backdrop-blur-md">
          <div className="flex-1 flex items-center gap-3 pl-4">
            <Search className="w-6 h-6 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent shadow-none text-xl h-14 focus-visible:ring-0 placeholder:text-muted-foreground/50" 
              placeholder={t('placeholder_search')}
            />
          </div>
          <Button onClick={handleVoiceSearch} variant="ghost" size="icon" className={cn("h-14 w-14 rounded-2xl", isListening && "text-secondary animate-pulse")}>
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 text-primary interactive-icon" />}
          </Button>
          <Button size="lg" className="h-14 bg-primary text-black font-black hover:bg-primary/80 gap-3 px-8 cyan-glow rounded-2xl">
            <Search className="h-6 w-6" /> {t('search_btn')}
          </Button>
          <Button size="lg" variant="outline" className="h-14 gap-3 hidden sm:flex border-border hover:bg-muted rounded-2xl">
            <Filter className="h-6 w-6" /> {t('filter_btn')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 space-y-8">
          <Card className="bg-card border-border rounded-[2rem] overflow-hidden">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-black flex items-center gap-3 text-muted-foreground tracking-widest uppercase">
                <Filter className="w-4 h-4 text-primary" /> CATEGORIES
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
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xl">{cat.icon}</span>
                      {cat.name}
                    </span>
                    <Badge variant={activeCategory === cat.name ? "secondary" : "outline"} className="rounded-full border-border bg-background/20 text-[10px]">
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card className="bg-background border-primary/20 rounded-[2rem] overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm font-black flex items-center gap-3 text-primary tracking-widest uppercase">
                🚀 TRENDING NODES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {trendingSchemes.map((scheme, i) => (
                <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                  <div className="space-y-1">
                    <p className="text-sm font-black group-hover/item:text-primary transition-colors">{scheme.name}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-primary" /> {scheme.votes}</span>
                      <span>•</span>
                      <span>{scheme.type}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground border border-border">
                    {i+1}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-9 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="group glass-card rounded-[2.5rem] border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/scheme-${scheme.id}/600/400`} 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <Badge className="absolute top-4 right-4 bg-background/80 border border-border text-foreground backdrop-blur-md uppercase text-[10px] font-black tracking-widest">{scheme.type}</Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                </div>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight uppercase">{scheme.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6 flex-1">
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">{scheme.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-2"><Star className="w-3 h-3 text-primary fill-primary" /> {scheme.rating} SCORE</span>
                    <span className="flex items-center gap-2"><Users className="w-3 h-3 text-primary" /> {scheme.users} NODES</span>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex gap-4">
                   <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-black uppercase border border-border hover:border-primary hover:bg-transparent rounded-xl">DETAILS</Button>
                   <Button variant="secondary" size="sm" className="flex-1 text-[10px] font-black uppercase bg-primary text-black hover:bg-foreground hover:text-background transition-colors rounded-xl">APPLY NOW</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredSchemes.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-border">
              <p className="text-2xl font-black text-muted-foreground uppercase tracking-widest">No matching resource nodes found</p>
            </div>
          )}

          <div className="text-center">
             <Button variant="link" className="text-primary font-black text-lg hover:tracking-widest transition-all uppercase">SEE ALL 5,300+ RESOURCE NODES</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
