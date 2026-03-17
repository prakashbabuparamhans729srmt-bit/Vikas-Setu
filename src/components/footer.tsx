"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Twitter, Linkedin, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black pt-32 pb-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-10 text-center md:text-left">
            <Link href="/" className="text-4xl font-black font-headline tracking-tighter group inline-flex items-center gap-3">
              <span className="text-primary group-hover:scale-105 transition-transform uppercase">{t('brand_vikas')}</span>
              <span className="text-white uppercase">{t('brand_setu')}</span>
              <span className="animate-pulse">🇮🇳</span>
            </Link>
            <p className="text-white/40 max-w-sm font-medium leading-relaxed text-lg">
              Vikas Setu is the national demographic bridge between the government and citizens. Building a hyper-transparent future for Bharat.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
               {[Twitter, Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
                 <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/10 hover:border-primary/50 border border-white/5 transition-all duration-500 group">
                    <Icon className="w-6 h-6 interactive-icon" />
                 </Link>
               ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-white uppercase tracking-[0.3em] text-xs">NAVIGATION</h4>
            <nav className="flex flex-col gap-4 text-sm text-white/40 font-bold uppercase tracking-widest">
              {['Central Schemes', 'State Initiatives', 'Impact Dashboard', 'Public Feedback'].map((link) => (
                <Link key={link} href="#" className="hover:text-primary hover:translate-x-2 transition-all duration-300 w-fit">{link}</Link>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-white uppercase tracking-[0.3em] text-xs">RESOURCE CENTER</h4>
            <nav className="flex flex-col gap-4 text-sm text-white/40 font-bold uppercase tracking-widest">
              {['Help Engine', 'Privacy Protocol', 'Service Terms', 'Node Contact'].map((link) => (
                <Link key={link} href="#" className="hover:text-primary hover:translate-x-2 transition-all duration-300 w-fit">{link}</Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="mb-12 bg-white/5" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/30">
             <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"><Phone className="w-3 h-3 interactive-icon" /> 1800-111-222</span>
             <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"><Mail className="w-3 h-3 interactive-icon" /> INFO@VIKASSETU.GOV.IN</span>
             <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"><MapPin className="w-3 h-3 interactive-icon" /> NEW DELHI, BHARAT</span>
          </div>
          <div className="text-sm font-black italic text-primary text-center tracking-widest hover:scale-110 transition-transform duration-500 cursor-default uppercase">
            🇮🇳 {t('footer_tagline')} 🇮🇳
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} VIKAS SETU CORE. VERSION 2.6.0
          </p>
        </div>
      </div>
    </footer>
  )
}
