import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SchemeBrowser } from "@/components/scheme-browser"
import { FeedbackSection } from "@/components/feedback-section"
import { IndiaMap } from "@/components/india-map"
import { ImpactDashboard } from "@/components/impact-dashboard"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div className="container mx-auto px-4 -mt-10 relative z-20">
           <IndiaMap />
        </div>

        <SchemeBrowser />
        
        <FeedbackSection />
        
        <ImpactDashboard />

        {/* Call to action section */}
        <section className="py-24 bg-primary relative overflow-hidden">
           <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase italic">
                 Be the Catalyst for Change.
              </h2>
              <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
                 Join millions of citizens helping build a stronger, more transparent India. Every vote counts, every idea matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button className="h-14 px-10 bg-white text-primary font-black rounded-xl text-lg hover:scale-105 transition-transform shadow-2xl">
                    Register Now
                 </button>
                 <button className="h-14 px-10 border-2 border-white text-white font-black rounded-xl text-lg hover:bg-white/10 transition-colors">
                    View FAQ
                 </button>
              </div>
           </div>
           
           {/* Decorative bg icons */}
           <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 opacity-10 text-[10rem] select-none">🇮🇳</div>
           <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 opacity-10 text-[10rem] select-none">🗳️</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
