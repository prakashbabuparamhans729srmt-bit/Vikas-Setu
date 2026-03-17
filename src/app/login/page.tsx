
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, User, Lock, Chrome, Github, ArrowRight, UserCheck } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neon Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#14181B]/80 backdrop-blur-2xl border-white/5 shadow-2xl rounded-[2.5rem] relative z-10 overflow-hidden">
        {/* Top Tricolor Accent */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-secondary" />
        </div>

        <CardHeader className="pt-12 pb-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 cyan-glow animate-bounce">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black font-headline tracking-tighter text-white uppercase">
              Vikas <span className="text-primary italic">Setu</span>
            </CardTitle>
            <CardDescription className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
              Secure Gateway to Bharat 2.0
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Email Node</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <Input 
                  type="email" 
                  placeholder="name@bharat.gov.in" 
                  className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Access Protocol</Label>
                <Link href="#" className="text-[10px] font-black text-primary uppercase hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <Input 
                  type="password" 
                  className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button className="w-full h-14 bg-primary text-black font-black text-lg rounded-2xl hover:bg-white hover:scale-[1.02] transition-all cyan-glow group">
            AUTHORIZE ACCESS <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/20 font-black tracking-widest">OR CONNECT VIA</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-white/5 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-xs uppercase gap-2 transition-all">
              <Chrome className="w-4 h-4" /> Google
            </Button>
            <Button variant="outline" className="h-12 border-white/5 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-xs uppercase gap-2 transition-all">
              <Github className="w-4 h-4" /> Github
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pb-12 pt-6">
          {/* Guest Mode Icon/Button */}
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full h-12 border border-dashed border-white/10 text-white/40 hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-xl flex items-center justify-center gap-3 transition-all group">
              <UserCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Enter as Guest Observer</span>
            </Button>
          </Link>

          <p className="text-sm text-white/40 text-center font-medium">
            New Citizen? <Link href="#" className="text-primary font-black hover:underline uppercase ml-1">Register Node</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
