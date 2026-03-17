"use client"

import Link from "next/link"
import { User, Menu, X, Bell, Globe, Check, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { LANGUAGES } from "@/lib/translations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  const navItems = [
    { name: t('nav_home'), id: 'home' },
    { name: t('nav_yojanaye'), id: 'schemes' },
    { name: t('nav_progress'), id: 'impact' },
    { name: t('nav_rai'), id: 'feedback' },
    { name: t('nav_impact'), id: 'impact' },
  ]

  const handleJoinGrowth = () => {
    toast({
      title: "Protocol Initialized",
      description: "Redirecting to the National Growth Registry...",
    })
  }

  const notifications = [
    { id: 1, title: "New Scheme Alert", desc: "PM-Surya Ghar Muft Bijli Yojana is live.", time: "2m ago" },
    { id: 2, title: "Feedback Acknowledged", desc: "Your suggestion for Rural Digital Hubs was seen.", time: "1h ago" },
    { id: 3, title: "System Update", desc: "Vikas Setu Core upgraded to version 2.6.0.", time: "5h ago" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#070707]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all duration-500">
               <span className="text-xl font-black">V</span>
            </div>
            <span className="text-2xl font-black font-headline tracking-tighter flex items-center">
              <span className="text-primary group-hover:tracking-normal transition-all duration-500 uppercase">{t('brand_vikas')}</span>
              <span className="text-white ml-1 uppercase">{t('brand_setu')}</span>
              <span className="ml-2 animate-pulse">🇮🇳</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={`#${item.id}`} 
              className="text-white/40 hover:text-primary transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-primary transition-colors">
                  <Globe className="w-5 h-5 interactive-icon" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-[#14181B] border-white/10 backdrop-blur-xl rounded-2xl p-2">
                <ScrollArea className="h-80 pr-4">
                  <div className="p-2 space-y-1">
                    {LANGUAGES.map((lang) => (
                      <DropdownMenuItem 
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          toast({ title: "Language Switched", description: `Interface Protocol: ${lang.native}` });
                        }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all",
                          language === lang.code ? "bg-primary text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-bold">{lang.native}</span>
                          <span className="text-[10px] opacity-70 uppercase tracking-widest">{lang.label}</span>
                        </div>
                        {language === lang.code && <Check className="w-4 h-4" />}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/settings">
              <Settings className="w-5 h-5 text-white/40 hover:text-primary transition-colors cursor-pointer interactive-icon" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white/40 hover:text-primary transition-colors">
                  <Bell className="w-5 h-5 interactive-icon" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-ping" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-[#14181B] border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
                <DropdownMenuLabel className="font-black uppercase tracking-widest text-[10px] flex items-center justify-between text-white/60">
                  NOTIFICATIONS <Sparkles className="w-3 h-3 text-primary" />
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2 bg-white/5" />
                <div className="space-y-4 py-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-sm group-hover:text-primary transition-colors text-white/80">{n.title}</p>
                        <span className="text-[8px] font-black text-white/20 uppercase">{n.time}</span>
                      </div>
                      <p className="text-xs text-white/40 line-clamp-2">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2 text-[10px] font-black uppercase tracking-widest hover:text-primary text-white/20">VIEW ALL LOGS</Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <Link href="/login">
            <Button variant="outline" className="hidden md:flex gap-2 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl">
              <User className="h-4 w-4 interactive-icon" /> {t('login')}
            </Button>
          </Link>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-black font-black hover:bg-white hover:scale-105 transition-all cyan-glow px-6 h-10 rounded-xl uppercase tracking-widest text-[10px]">
                {t('join')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#070707] border-white/10 rounded-[2.5rem] shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-white">Bharat Growth Network</DialogTitle>
                <DialogDescription className="text-white/40 font-medium">
                  Initialize your node to access direct benefits and participate in national development protocols.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-1">Aadhar Virtual ID</label>
                  <input className="w-full h-12 bg-[#14181B] border-white/5 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary" placeholder="XXXX-XXXX-XXXX" />
                </div>
                <Button onClick={handleJoinGrowth} className="w-full h-14 bg-primary text-black font-black text-lg rounded-xl hover:scale-[1.02] transition-all cyan-glow">
                  AUTHORIZE IDENTITY
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 bg-[#070707]/95 border-b border-white/5 backdrop-blur-2xl transition-all duration-500 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-[600px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="container mx-auto px-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className="text-xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
          <Link href="/settings" className="text-xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
            Settings
          </Link>
          <div className="h-px bg-white/5 w-full" />
          
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">SELECT LANGUAGE</p>
          <ScrollArea className="h-48">
            <div className="grid grid-cols-2 gap-3 pr-4">
               {LANGUAGES.map((lang) => (
                 <Button 
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsMenuOpen(false)
                    toast({ title: "Protocol Update", description: `Language set to ${lang.native}` });
                  }}
                  className={cn("rounded-lg h-10 font-bold text-[10px] border-white/10", language === lang.code ? "bg-primary text-black" : "text-white/60")}
                 >
                   {lang.native}
                 </Button>
               ))}
            </div>
          </ScrollArea>

          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-center gap-2 border-white/10 text-white font-black h-12 rounded-xl">
              <User className="h-4 w-4 interactive-icon" /> {t('login')}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
