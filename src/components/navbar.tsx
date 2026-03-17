
"use client"

import Link from "next/link"
import { Search, User, Menu, X, Bell, Globe, Check, Settings } from "lucide-react"
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
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
               <span className="text-xl font-bold">V</span>
            </div>
            <span className="text-2xl font-black font-headline tracking-tighter flex items-center">
              <span className="text-primary group-hover:tracking-normal transition-all duration-500 uppercase">{t('brand_vikas')}</span>
              <span className="text-foreground ml-1 uppercase">{t('brand_setu')}</span>
              <span className="ml-2 animate-pulse">🇮🇳</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={`#${item.id}`} 
              className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="w-5 h-5 interactive-icon" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-background/90 border-border backdrop-blur-xl rounded-2xl p-2">
                <ScrollArea className="h-80 pr-4">
                  <div className="p-2 space-y-1">
                    {LANGUAGES.map((lang) => (
                      <DropdownMenuItem 
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all",
                          language === lang.code ? "bg-primary text-black" : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
              <Settings className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer interactive-icon" />
            </Link>
            <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer interactive-icon" />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <Link href="/login">
            <Button variant="outline" className="hidden md:flex gap-2 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-xl">
              <User className="h-4 w-4 interactive-icon" /> {t('login')}
            </Button>
          </Link>
          
          <Button className="bg-primary text-black font-black hover:bg-primary/90 hover:scale-105 transition-all cyan-glow px-6 h-10 rounded-xl uppercase tracking-widest text-xs">
            {t('join')}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 bg-background/95 border-b border-border backdrop-blur-2xl transition-all duration-500 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-[600px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="container mx-auto px-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className="text-xl font-bold hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
          <Link href="/settings" className="text-xl font-bold hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
            Settings
          </Link>
          <div className="h-px bg-border w-full" />
          
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">SELECT LANGUAGE</p>
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
                  }}
                  className="rounded-lg h-10 font-bold text-xs"
                 >
                   {lang.native}
                 </Button>
               ))}
            </div>
          </ScrollArea>

          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-center gap-2 border-border text-foreground font-bold h-12 rounded-xl">
              <User className="h-4 w-4 interactive-icon" /> {t('login')}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
