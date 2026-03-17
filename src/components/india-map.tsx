
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Map, Layers, Target, Compass, Sparkles, Zap, ShieldCheck } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const stateData = [
  { name: "Maharashtra", completion: 98, status: "High" },
  { name: "Uttar Pradesh", completion: 92, status: "High" },
  { name: "Jammu & Kashmir", completion: 85, status: "Medium-High" },
  { name: "Tamil Nadu", completion: 78, status: "Medium-High" },
  { name: "Gujarat", completion: 74, status: "Medium" },
  { name: "Bihar", completion: 23, status: "Critical" },
]

export function IndiaMap() {
  const handleStateClick = (name: string) => {
    toast({
      title: `${name} Node Analysis`,
      description: "Fetching real-time implementation metrics...",
    })
  }

  const handleActivateFullView = () => {
    toast({
      title: "Holographic Stream Initialized",
      description: "Visualizing high-resolution implementation layers.",
    })
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardHeader className="text-center space-y-4">
        <Badge variant="outline" className="mx-auto w-fit bg-primary/5 text-primary border-primary/20 px-4 py-1">
          REAL-TIME ANALYTICS
        </Badge>
        <CardTitle className="text-4xl font-black font-headline flex items-center justify-center gap-4 text-white">
          <Map className="w-10 h-10 text-primary animate-pulse" /> BHARAT DASHBOARD
        </CardTitle>
        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Vikas ki Gati state-wise tracker</p>
      </CardHeader>
      <CardContent className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Virtual Map Area */}
          <div className="relative aspect-square bg-[#0c0c0c] rounded-[3rem] border border-white/5 shadow-[inset_0_0_50px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="text-center p-12 relative z-10">
              <div className="text-9xl mb-8 group-hover:scale-110 transition-transform duration-700 select-none">🇮🇳</div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">HOLOGRAPHIC MAP ENGINE</h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">Clicking any state triggers deep-layer resource allocation analytics.</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={handleActivateFullView} className="mt-8 bg-primary text-black font-black cyan-glow hover:scale-105 transition-all px-8">
                    ACTIVATE FULL VIEW
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 backdrop-blur-3xl border-primary/20 max-w-5xl h-[80vh] flex flex-col items-center justify-center rounded-[3rem]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(7,241,214,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(7,241,214,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                  <DialogHeader className="z-10 text-center">
                    <DialogTitle className="text-5xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
                      <Sparkles className="w-10 h-10 text-primary animate-spin-slow" /> BHARAT ANALYTICS PRO
                    </DialogTitle>
                    <DialogDescription className="text-primary font-black uppercase tracking-[0.4em] text-xs">Layer 0: Full National Connectivity</DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 flex items-center justify-center relative w-full overflow-hidden">
                    <div className="text-[20rem] opacity-10 select-none animate-pulse">🇮🇳</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                      <div className="grid grid-cols-3 gap-12 text-center">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-primary tracking-widest">Active Projects</p>
                          <p className="text-4xl font-black text-white">45,892</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Live Nodes</p>
                          <p className="text-4xl font-black text-white">1.2M</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-white tracking-widest">Growth Rate</p>
                          <p className="text-4xl font-black text-white">12.4%</p>
                        </div>
                      </div>
                      <Button className="bg-primary text-black font-black uppercase rounded-2xl h-14 px-12 cyan-glow group">
                        <Zap className="mr-2 w-5 h-5 group-hover:animate-bounce" /> INITIALIZE DISTRICT SYNC
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Mock map pulses */}
            <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary rounded-full animate-ping shadow-[0_0_20px_#07f1d6]" />
            <div className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-secondary rounded-full animate-ping" />
            
            <Compass className="absolute top-8 right-8 w-12 h-12 text-white/10 animate-spin-slow" />
          </div>

          <div className="space-y-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-lg font-black text-white flex items-center gap-2">
                 <Layers className="w-5 h-5 text-primary" /> STATE PROGRESSION
               </h4>
               <Badge className="bg-primary/10 text-primary border-primary/20">LIVE 24/7</Badge>
            </div>

            {stateData.map((state) => (
              <div key={state.name} className="space-y-3 group cursor-pointer" onClick={() => handleStateClick(state.name)}>
                <div className="flex justify-between items-center font-bold">
                  <span className="flex items-center gap-3 text-white/80 group-hover:text-primary transition-colors">
                    <span className={`w-3 h-3 rounded-full ${state.completion > 80 ? 'bg-primary shadow-[0_0_10px_#07f1d6]' : state.completion > 50 ? 'bg-white/40' : 'bg-secondary'}`} />
                    {state.name}
                  </span>
                  <span className="text-sm font-black text-white">{state.completion}%</span>
                </div>
                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div 
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out rounded-full ${
                      state.completion > 80 ? 'bg-primary cyan-glow' : 
                      state.completion > 50 ? 'bg-white/40' : 'bg-secondary'
                    }`}
                    style={{ width: `${state.completion}%` }}
                  />
                </div>
              </div>
            ))}
            
            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#07f1d6]" /> EXCELLENT
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                <span className="w-3 h-3 rounded-full bg-white/20" /> STABLE
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                <span className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_#f71f26]" /> CRITICAL
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
                <Target className="w-3 h-3 text-primary" /> ACTIVE NODES
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
