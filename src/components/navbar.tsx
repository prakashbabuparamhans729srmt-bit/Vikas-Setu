"use client"

import Link from "next/link"
import { Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-headline tracking-tighter flex items-center">
              <span className="text-primary">VIKAS</span>
              <span className="text-foreground ml-1">SETU</span>
              <span className="ml-1">🇮🇳</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#schemes" className="hover:text-primary transition-colors">Yojanaye</Link>
          <Link href="#progress" className="hover:text-primary transition-colors">Progress</Link>
          <Link href="#feedback" className="hover:text-primary transition-colors">Janata ki Rai</Link>
          <Link href="#impact" className="hover:text-primary transition-colors">Impact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden md:flex gap-2">
            <User className="h-4 w-4" /> Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Join Growth</Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden p-4 border-t bg-background space-y-4 flex flex-col">
          <Link href="/" className="font-medium">Home</Link>
          <Link href="#schemes" className="font-medium">Yojanaye</Link>
          <Link href="#progress" className="font-medium">Progress</Link>
          <Link href="#feedback" className="font-medium">Janata ki Rai</Link>
          <Link href="#impact" className="font-medium">Impact</Link>
          <Button variant="outline" className="w-full justify-start gap-2">
            <User className="h-4 w-4" /> Login
          </Button>
        </div>
      )}
    </nav>
  )
}
