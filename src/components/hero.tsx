import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 hero-gradient">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-primary/20 text-primary px-4 py-1.5 text-sm font-semibold tracking-wide">
              🔥 WELCOME, INDIA 2.0! 🔥
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight leading-[1.1]">
            Vikas ki Neev, <br />
            <span className="text-primary italic">Aapke Hatho Mein</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            मेरा भारत, मेरी आवाज (My India, My Voice). Join the journey of transparency and transformation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-primary/10 flex flex-col items-center gap-2">
              <Star className="h-8 w-8 text-primary" />
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Yojanaye</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-secondary/5 border border-secondary/10 flex flex-col items-center gap-2">
              <Users className="h-8 w-8 text-secondary" />
              <div className="text-3xl font-bold">2.5L+</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Public Votes</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-foreground/5 border border-foreground/10 flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-foreground" />
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Transparency</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 bg-primary hover:bg-primary/90">
              Explore Schemes <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-2">
              View Progress Map
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  )
}
