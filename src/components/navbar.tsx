"use client"

import Link from "next/link"
import { Search, User, Menu, X, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
               <span className="text-xl font-bold">V</span>
            </div>
            <span className="text-2xl font-black font-headline tracking-tighter flex items-center">
              <span className="text-primary group-hover:tracking-normal transition-all duration-500">VIKAS</span>
              <span className="text-white ml-1">SETU</span>
              <span className="ml-2 animate-pulse">🇮🇳</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
          {['Home', 'Yojanaye', 'Progress', 'Janata ki Rai', 'Impact'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-white/60 hover:text-primary transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <Globe className="w-5 h-5 text-white/40 hover:text-primary transition-colors cursor-pointer" />
            <Bell className="w-5 h-5 text-white/40 hover:text-primary transition-colors cursor-pointer" />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <Button variant="outline" className="hidden md:flex gap-2 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white">
            <User className="h-4 w-4" /> Login
          </Button>
          
          <Button className="bg-primary text-black font-black hover:bg-primary/90 hover:scale-105 transition-all cyan-glow px-6">
            JOIN GROWTH
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 bg-background/95 border-b border-white/5 backdrop-blur-2xl transition-all duration-500 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-[400px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="container mx-auto px-6 flex flex-col gap-6">
          {['Home', 'Yojanaye', 'Progress', 'Janata ki Rai', 'Impact'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold hover:text-primary transition-colors">
              {item}
            </Link>
          ))}
          <div className="h-px bg-white/5 w-full" />
          <Button variant="outline" className="w-full justify-center gap-2 border-white/10 text-white">
            <User className="h-4 w-4" /> Account Login
          </Button>
        </div>
      </div>
    </nav>
  )
}