
"use client"

import Link from "next/link"
import { User, Bell, Globe, Check, Settings, Sparkles, LogOut, FileText } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { useAuth, useUser } from "@/firebase"
import { signOut } from "firebase/auth"

export function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const auth = useAuth()
  const { user } = useUser()
  const { toast } = useToast()

  const navItems = [
    { name: t('nav_home'), id: 'home', href: '/' },
    { name: t('nav_yojanaye'), id: 'schemes', href: '/#schemes' },
    { name: t('nav_progress'), id: 'impact', href: '/#impact' },
    { name: t('nav_rai'), id: 'feedback', href: '/#feedback' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Disconnected", description: "Identity node offline." });
      window.location.href = "/";
    } catch (error: any) {
      toast({ title: "Error", description: "Failed to disconnect node.", variant: "destructive" });
    }
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
              href={item.href} 
              className="text-white/40 hover:text-primary transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          {user && (
            <Link href="/my-applications" className="text-primary hover:text-white transition-all flex items-center gap-2">
              <FileText className="w-4 h-4" /> MY APPLICATIONS
            </Link>
          )}
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl">
                <User className="h-4 w-4 interactive-icon" /> {user?.displayName?.split(' ')[0] || "CITIZEN"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#14181B] border-white/10 backdrop-blur-xl rounded-2xl p-2">
              {user ? (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer rounded-xl font-black uppercase text-[10px] tracking-widest py-3 px-4 text-white">
                    <Link href="/my-applications" className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" /> My Applications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={handleSignOut} className="text-secondary hover:bg-secondary/10 cursor-pointer rounded-xl font-black uppercase text-[10px] tracking-widest py-3 px-4">
                    <LogOut className="w-4 h-4 mr-2" /> DISCONNECT NODE
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild className="cursor-pointer rounded-xl font-black uppercase text-[10px] tracking-widest py-3 px-4 text-white">
                  <Link href="/" className="flex items-center">
                    <User className="w-4 h-4 mr-2" /> AUTHORIZE NODE
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
