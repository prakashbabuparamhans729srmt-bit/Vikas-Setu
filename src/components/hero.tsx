
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, CheckCircle, ShieldCheck, Zap, TrendingUp } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-32 hero-gradient">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-6 py-2 text-xs font-black tracking-[0.2em] uppercase rounded-full animate-bounce">
              {t('hero_badge')}
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.95] text-white">
            {t('hero_title_1')} <br />
            <span className="text-primary italic inline-block transform -skew-x-6 hover:skew-x-0 transition-transform duration-700 cursor-default">
              {t('hero_title_2')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            मेरा भारत, मेरी आवाज (My India, My Voice). <br />
            Building the world's most transparent growth bridge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            {[
              { icon: Zap, value: "5000+", label: t('stat_yojanaye'), color: "text-primary" },
              { icon: Users, value: "2.5L+", label: t('stat_votes'), color: "text-secondary" },
              { icon: ShieldCheck, value: "100%", label: t('stat_transparency'), color: "text-white" }
            ].map((stat, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-8 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 group">
                <stat.icon className={`h-10 w-10 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-500 interactive-icon`} />
                <div className="text-4xl font-black tracking-tighter group-hover:text-primary transition-colors text-white">{stat.value}</div>
                <div className="text-xs text-white/40 font-black uppercase tracking-widest mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#schemes" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 w-full px-10 text-lg font-black gap-3 bg-primary text-black hover:bg-primary/80 cyan-glow hover:scale-105 transition-all rounded-2xl">
                EXPLORE SCHEMES <ArrowRight className="h-6 w-6 interactive-icon" />
              </Button>
            </Link>
            <Link href="#impact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-16 w-full px-10 text-lg font-black border-2 border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all rounded-2xl bg-background text-white">
                <TrendingUp className="w-6 h-6 mr-2 interactive-icon" /> PROGRESS MAP
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract Neon Glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
    </section>
  )
}
