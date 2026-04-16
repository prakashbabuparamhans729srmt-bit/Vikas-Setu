
'use client';

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, Mic, MicOff, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, serverTimestamp, doc, query, orderBy } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

/**
 * @fileOverview योजना खोज और डिस्कवरी इंजन (Discovery Engine - B-Y)
 * नागरिक संसाधनों की खोज और 'A to Z' प्रवाह का डिस्कवरी हिस्सा।
 */

const staticCategories = [
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

const fallbackSchemes = [
  { id: "1", name: "PM Kisan Samman Nidhi", type: "Central", description: "Direct income support of ₹6,000 per year to all landholding farmers' families.", details: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme with 100% funding from Government of India.", tags: ["Agriculture", "Direct Benefit"] },
  { id: "2", name: "Jal Jeevan Mission", type: "Central", description: "Providing safe and adequate drinking water through individual household tap connections by 2024.", details: "Jal Jeevan Mission, is envisioned to provide safe and adequate drinking water through individual household tap connections.", tags: ["Infrastructure", "Water"] },
  { id: "3", name: "Digital India Mission", type: "Central", description: "Ensuring government services are made available to citizens electronically.", details: "Digital India is a campaign launched by the Government of India in order to ensure that services are made available electronically.", tags: ["Technology", "Connectivity"] },
  { id: "4", name: "Ladki Bahin Yojana", type: "Maharashtra", description: "Financial assistance program for women empowerment in Maharashtra.", details: "The Majhi Ladki Bahin Yojana is a flagship scheme of the Maharashtra Government aimed at providing monthly financial assistance to women.", tags: ["Women", "State"] },
  { id: "5", name: "Ayushman Bharat", type: "Central", description: "World's largest healthcare program providing coverage of ₹5 lakh per family.", details: "Ayushman Bharat - PM-JAY, is a flagship scheme to provide cashless secondary and tertiary care treatment.", tags: ["Health", "Insurance"] },
  { id: "6", name: "PM Awas Yojana", type: "Central", description: "Housing for All initiative ensuring every family has a pucca house with basic amenities.", details: "Pradhan Mantri Awas Yojana (PMAY) is an initiative by the Government of India in which affordable housing will be provided to the poor.", tags: ["Housing", "Infrastructure"] },
]

export function SchemeBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Yojanaye")
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isApplying, setIsApplying] = useState<string | null>(null)
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()

  const schemesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "schemes"), orderBy("publishedAt", "desc"));
  }, [db]);
  const { data: dbSchemes, isLoading: schemesLoading } = useCollection(schemesQuery);

  const categoriesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "categories"), orderBy("name", "asc"));
  }, [db]);
  const { data: dbCategories } = useCollection(categoriesQuery);

  const categories = useMemo(() => {
    if (dbCategories && dbCategories.length > 0) {
      return [
        { name: "All Yojanaye", count: (dbSchemes?.length || 0), icon: "✅" },
        ...dbCategories.map(c => ({ name: c.name, count: 0, icon: c.iconName || "📦" }))
      ];
    }
    return staticCategories;
  }, [dbCategories, dbSchemes]);

  const displaySchemes = useMemo(() => {
    const base = (dbSchemes && dbSchemes.length > 0) ? dbSchemes : fallbackSchemes;
    return base.filter(scheme => {
      const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Yojanaye" || 
                             (activeCategory === "Central Sarkar" && scheme.type === "Central") ||
                             (activeCategory === "State Sarkar" && scheme.type !== "Central") ||
                             (scheme.tags?.some((tag: string) => activeCategory.includes(tag))) ||
                             (scheme.categoryIds?.some((id: string) => categories.find(c => c.name === activeCategory)));
      return matchesSearch && matchesCategory;
    });
  }, [dbSchemes, searchQuery, activeCategory, categories]);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({ variant: "destructive", title: "Protocol Refused", description: "Voice recognition engine not supported." });
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

  const handleApply = (id: string, name: string) => {
    if (!user) {
      toast({ title: "Auth Required", description: "Identity synchronization needed for application.", variant: "destructive" });
      return;
    }
    if (!db) return;
    
    setIsApplying(id);
    const appId = `app-${id}-${Date.now()}`; 
    const appRef = doc(db, "userProfiles", user.uid, "applications", appId);
    
    setDocumentNonBlocking(appRef, {
      id: appId,
      schemeId: id,
      schemeName: name,
      userId: user.uid,
      status: "Submitted",
      timestamp: serverTimestamp()
    }, { merge: true });

    setTimeout(() => {
      setIsApplying(null);
      toast({
        title: "Intent Synchronized",
        description: `${name} application logged in the national vault.`,
      });
    }, 1200);
  };

  return (
    <div id="schemes" className="container mx-auto px-4 py-32 space-y-16">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] animate-pulse">
           IDENTITY SYNC ACTIVE
        </Badge>
        <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-foreground uppercase italic">
          {t('section_schemes_title')}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 p-3 bg-card/40 rounded-[2.5rem] shadow-2xl border border-white/5 focus-within:border-primary/50 transition-all backdrop-blur-3xl">
          <div className="flex-1 flex items-center gap-3 pl-4">
            <Search className="w-6 h-6 text-primary/40" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent shadow-none text-xl h-14 focus-visible:ring-0 placeholder:text-muted-foreground/30 text-white font-medium" 
              placeholder={t('placeholder_search')}
            />
          </div>
          <div className="flex gap-2 p-1">
            <button 
              onClick={handleVoiceSearch} 
              className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center transition-all border border-white/5", 
                isListening ? "bg-secondary text-white animate-pulse" : "bg-white/5 text-primary hover:bg-primary hover:text-black"
              )}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <Button size="lg" className="h-14 bg-primary text-black font-black hover:bg-white gap-3 px-8 cyan-glow rounded-2xl uppercase tracking-widest">
              <Sparkles className="h-5 w-5" /> {t('search_btn')}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 space-y-8">
          <Card className="bg-[#14181B]/60 border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-2xl">
            <CardHeader className="border-b border-white/5 p-8">
              <CardTitle className="text-[10px] font-black flex items-center gap-3 text-white/40 tracking-[0.3em] uppercase">
                <Filter className="w-4 h-4 text-primary" /> CATEGORY REGISTRY
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl text-xs font-black transition-all duration-500 uppercase tracking-widest ${
                      activeCategory === cat.name 
                      ? 'bg-primary text-black shadow-[0_0_30px_rgba(7,241,214,0.3)] scale-[1.02]' 
                      : 'hover:bg-white/5 text-white/40 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xl group-hover:scale-125 transition-transform">{cat.icon}</span>
                      {cat.name}
                    </span>
                    <Badge variant={activeCategory === cat.name ? "secondary" : "outline"} className="rounded-xl border-white/10 bg-black/20 text-[8px] px-3">
                      {cat.count > 0 ? cat.count : 'LIVE'}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-9">
          {schemesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="h-[450px] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/5" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {displaySchemes.map((scheme) => (
                <Card key={scheme.id} className="group glass-card rounded-[2.5rem] border-white/5 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-700 cursor-pointer overflow-hidden flex flex-col relative">
                  <div className="h-52 bg-black relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/scheme-${scheme.id}/600/400`} 
                      className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                      alt={scheme.name}
                      data-ai-hint="india architecture"
                    />
                    <Badge className="absolute top-6 right-6 bg-black/80 border border-white/10 text-white backdrop-blur-md uppercase text-[8px] font-black tracking-widest px-4 py-1.5 rounded-full">
                      {scheme.type || 'National'} NODE
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] to-transparent opacity-80" />
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight uppercase tracking-tighter">
                      {scheme.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0 space-y-6 flex-1">
                    <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-3 italic">
                      {scheme.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {(scheme.tags || scheme.categoryIds || []).slice(0, 2).map((tag: string) => (
                         <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">#{tag}</span>
                       ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-8 pt-0 flex gap-4">
                     <Dialog>
                       <DialogTrigger asChild>
                         <Button variant="ghost" className="flex-1 h-12 text-[10px] font-black uppercase border border-white/10 hover:border-primary hover:bg-primary/5 rounded-2xl transition-all tracking-widest">
                           PROTOCOLS
                         </Button>
                       </DialogTrigger>
                       <DialogContent className="bg-[#14181B]/95 backdrop-blur-3xl border-primary/20 rounded-[3rem] max-w-2xl overflow-hidden shadow-2xl">
                         <div className="absolute top-0 left-0 w-full h-1 flex">
                            <div className="flex-1 bg-primary" />
                            <div className="flex-1 bg-white" />
                            <div className="flex-1 bg-secondary" />
                         </div>
                         <DialogHeader className="pt-10 px-8">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                             </div>
                             <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[10px] tracking-[0.2em] font-black rounded-full px-6">
                               {scheme.type || 'National'} CORE
                             </Badge>
                           </div>
                           <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-white italic">
                              {scheme.name}
                           </DialogTitle>
                           <DialogDescription className="text-white/60 font-medium leading-relaxed mt-6 text-lg">
                             {scheme.details || scheme.description}
                           </DialogDescription>
                         </DialogHeader>
                         <div className="px-8 py-6 grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2">
                               <p className="text-[8px] font-black text-primary uppercase tracking-widest">Target Sector</p>
                               <p className="text-white font-black uppercase tracking-tighter">{scheme.tags?.[0] || 'National'}</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2">
                               <p className="text-[8px] font-black text-secondary uppercase tracking-widest">Registry Hub</p>
                               <p className="text-white font-black uppercase tracking-tighter">{scheme.type || 'Central'} Government</p>
                            </div>
                         </div>
                         <DialogFooter className="p-8 bg-black/40 border-t border-white/5">
                           <Button 
                              disabled={isApplying === String(scheme.id)}
                              onClick={() => handleApply(String(scheme.id), scheme.name)} 
                              className="w-full h-16 bg-primary text-black font-black text-xl rounded-2xl hover:bg-white hover:scale-[1.02] transition-all cyan-glow uppercase tracking-widest"
                            >
                             {isApplying === String(scheme.id) ? "INITIALIZING SYNC..." : "INITIALIZE APPLICATION"} <ArrowUpRight className="ml-2 w-6 h-6" />
                           </Button>
                         </DialogFooter>
                       </DialogContent>
                     </Dialog>
                     <Button 
                      disabled={isApplying === String(scheme.id)}
                      onClick={() => handleApply(String(scheme.id), scheme.name)}
                      className="flex-1 h-12 text-[10px] font-black uppercase bg-primary text-black hover:bg-white transition-all rounded-2xl tracking-widest cyan-glow"
                     >
                       {isApplying === String(scheme.id) ? "SYNCING..." : "APPLY NOW"}
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
