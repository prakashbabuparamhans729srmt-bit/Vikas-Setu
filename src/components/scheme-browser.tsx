
'use client';

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, Mic, MicOff, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser } from "@/firebase"
import { collection, serverTimestamp, doc } from "firebase/firestore"
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

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
  { id: 1, name: "PM Kisan Samman Nidhi", type: "Central", description: "Direct income support of ₹6,000 per year to all landholding farmers' families.", details: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme with 100% funding from Government of India.", tags: ["Agriculture", "Direct Benefit"] },
  { id: 2, name: "Jal Jeevan Mission", type: "Central", description: "Providing safe and adequate drinking water through individual household tap connections by 2024.", details: "Jal Jeevan Mission, is envisioned to provide safe and adequate drinking water through individual household tap connections.", tags: ["Infrastructure", "Water"] },
  { id: 3, name: "Digital India Mission", type: "Central", description: "Ensuring government services are made available to citizens electronically.", details: "Digital India is a campaign launched by the Government of India in order to ensure that services are made available electronically.", tags: ["Technology", "Connectivity"] },
  { id: 4, name: "Ladki Bahin Yojana", type: "Maharashtra", description: "Financial assistance program for women empowerment in Maharashtra.", details: "The Majhi Ladki Bahin Yojana is a flagship scheme of the Maharashtra Government aimed at providing monthly financial assistance to women.", tags: ["Women", "State"] },
  { id: 5, name: "Ayushman Bharat", type: "Central", description: "World's largest healthcare program providing coverage of ₹5 lakh per family.", details: "Ayushman Bharat - PM-JAY, is a flagship scheme to provide cashless secondary and tertiary care treatment.", tags: ["Health", "Insurance"] },
  { id: 6, name: "PM Awas Yojana", type: "Central", description: "Housing for All initiative ensuring every family has a pucca house with basic amenities.", details: "Pradhan Mantri Awas Yojana (PMAY) is an initiative by the Government of India in which affordable housing will be provided to the poor.", tags: ["Housing", "Infrastructure"] },
]

export function SchemeBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Yojanaye")
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isApplying, setIsApplying] = useState<number | null>(null)
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()

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
    if (!('webkitSpeechRecognition' in window)) {
      toast({ variant: "destructive", title: "Protocol Refused", description: "Voice recognition engine not supported in this browser." });
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setSearchQuery(text);
      toast({ title: "Input Captured", description: `Audio Node: "${text}"` });
    };
    recognition.start();
  };

  const handleApply = (id: number, name: string) => {
    if (!user) {
      toast({ title: "Auth Required", description: "Identity synchronization needed for application.", variant: "destructive" });
      return;
    }
    if (!db) return;
    
    setIsApplying(id);
    const appRef = collection(db, "userProfiles", user.uid, "applications");
    
    addDocumentNonBlocking(appRef, {
      schemeId: String(id),
      schemeName: name,
      status: "Submitted",
      timestamp: serverTimestamp()
    }).then(() => {
        setTimeout(() => {
            setIsApplying(null);
            toast({
              title: "Intent Synchronized",
              description: `Application for ${name} has been logged in the national vault.`,
            });
          }, 800);
    }).catch(() => {
        setIsApplying(null);
    });
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
        </aside>

        <div className="lg:col-span-9 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="group glass-card rounded-[2.5rem] border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/scheme-${scheme.id}/600/400`} 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                    alt={scheme.name}
                  />
                  <Badge className="absolute top-4 right-4 bg-background/80 border border-border text-foreground backdrop-blur-md uppercase text-[10px] font-black tracking-widest">{scheme.type}</Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                </div>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight uppercase">{scheme.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6 flex-1">
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">{scheme.description}</p>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex gap-4">
                   <Dialog>
                     <DialogTrigger asChild>
                       <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-black uppercase border border-border hover:border-primary hover:bg-transparent rounded-xl">DETAILS</Button>
                     </DialogTrigger>
                     <DialogContent className="bg-background/95 backdrop-blur-3xl border-primary/20 rounded-[2.5rem] max-w-2xl overflow-hidden">
                       <DialogHeader className="pt-6">
                         <div className="flex items-center gap-2 mb-2">
                           <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[8px] tracking-widest font-black">{scheme.type} NODE</Badge>
                         </div>
                         <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-primary">{scheme.name}</DialogTitle>
                         <DialogDescription className="text-foreground/80 font-medium leading-relaxed mt-4">
                           {scheme.details}
                         </DialogDescription>
                       </DialogHeader>
                       <DialogFooter className="mt-8">
                         <Button 
                            disabled={isApplying === scheme.id}
                            onClick={() => handleApply(scheme.id, scheme.name)} 
                            className="w-full h-14 bg-primary text-black font-black text-lg rounded-2xl hover:scale-[1.02] transition-all cyan-glow uppercase"
                          >
                           {isApplying === scheme.id ? "SYNCING..." : "INITIALIZE APPLICATION"} <ArrowUpRight className="ml-2 w-5 h-5" />
                         </Button>
                       </DialogFooter>
                     </DialogContent>
                   </Dialog>
                   <Button 
                    disabled={isApplying === scheme.id}
                    onClick={() => handleApply(scheme.id, scheme.name)}
                    variant="secondary" 
                    size="sm" 
                    className="flex-1 text-[10px] font-black uppercase bg-primary text-black hover:bg-foreground hover:text-background transition-colors rounded-xl"
                   >
                     {isApplying === scheme.id ? "SYNCING..." : "APPLY NOW"}
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
