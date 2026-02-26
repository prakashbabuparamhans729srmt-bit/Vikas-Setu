import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6 text-center md:text-left">
            <Link href="/" className="text-3xl font-black font-headline tracking-tighter">
              <span className="text-primary">VIKAS</span>
              <span className="text-foreground ml-1">SETU</span>
              <span className="ml-1">🇮🇳</span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-medium">
              Vikas Setu is dedicated to bridging the gap between the government and the citizens of India. Empowering voices for a transformed Bharat.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">X</div>
               <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">In</div>
               <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">Fb</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Explore</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground font-medium">
              <Link href="#" className="hover:text-primary transition-colors">Central Schemes</Link>
              <Link href="#" className="hover:text-primary transition-colors">State Initiatives</Link>
              <Link href="#" className="hover:text-primary transition-colors">Impact Dashboard</Link>
              <Link href="#" className="hover:text-primary transition-colors">Public Feedback</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Support</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground font-medium">
              <Link href="#" className="hover:text-primary transition-colors">Help Center</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact Us</Link>
            </nav>
          </div>
        </div>

        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
             <span>📞 1800-111-222</span>
             <span>•</span>
             <span>info@vikassetu.gov.in</span>
          </div>
          <div className="text-sm font-black italic text-foreground text-center">
            🇮🇳 सरकार की योजना, जनता का फैसला 🇮🇳
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            © {new Date().getFullYear()} Vikas Setu. All Rights Reserved.
          </p>
        </div>
      </div>
      
      {/* Tricolor Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 flex">
         <div className="flex-1 bg-primary" />
         <div className="flex-1 bg-white" />
         <div className="flex-1 bg-secondary" />
      </div>
    </footer>
  )
}
