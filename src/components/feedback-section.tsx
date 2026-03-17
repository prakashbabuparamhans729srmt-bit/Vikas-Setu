"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ThumbsUp, Send, MessageSquare, Quote, Star, Users, BrainCircuit, Heart } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const feedbackItems = [
  { name: "Rahul Kumar", location: "Bihar", text: "जल जीवन मिशन से मेरे गाँव में नल से जल आ गया, धन्यवाद!", rating: 5, date: "2 hours ago" },
  { name: "Priya Sharma", location: "MP", text: "PM आवास योजना में मेरा घर बन गया, सरकार जनता के साथ है!", rating: 5, date: "5 hours ago" },
  { name: "Suresh Singh", location: "UP", text: "डिजिटल इंडिया से अब गाँव में भी बैंकिंग आसान हो गई है।", rating: 4, date: "1 day ago" },
]

export function FeedbackSection() {
  const { t } = useLanguage()

  return (
    <section id="feedback" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center space-y-6">
          <Badge className="bg-primary text-black px-6 py-2 text-xs font-black uppercase tracking-[0.3em] rounded-full">CITIZEN FEEDBACK LOOP</Badge>
          <h2 className="text-5xl font-black font-headline text-white tracking-tighter uppercase">{t('section_feedback_title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium">Every citizen is a sensor. Your pulse shapes the national trajectory. Input your data below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Poll of the Day */}
          <Card className="lg:col-span-4 border border-primary/20 bg-black/60 backdrop-blur-xl rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="bg-primary p-8 text-black text-center">
              <CardTitle className="text-sm font-black flex items-center justify-center gap-3 uppercase tracking-[0.2em]">
                <BrainCircuit className="w-5 h-5 animate-pulse interactive-icon" /> {t('poll_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10 relative z-10">
              <p className="text-2xl font-black text-white text-center leading-tight tracking-tighter">
                {t('poll_q')}
              </p>
              
              <RadioGroup defaultValue="yes" className="space-y-4">
                {[
                  { id: 'r1', label: 'हाँ, बिल्कुल', val: 'yes', percent: '67%' },
                  { id: 'r2', label: 'नहीं', val: 'no', percent: '22%' },
                  { id: 'r3', label: 'पता नहीं', val: 'idk', percent: '11%' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:border-primary/50 transition-all bg-white/5 group/opt">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={option.val} id={option.id} className="border-primary text-primary" />
                      <Label htmlFor={option.id} className="text-lg font-bold text-white/80 group-hover/opt:text-white transition-colors">{option.label}</Label>
                    </div>
                    <span className="text-primary font-black text-xl">{option.percent}</span>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-center p-10 pt-0">
              <Button className="w-full h-16 bg-white text-black hover:bg-primary transition-all text-lg font-black rounded-2xl uppercase">{t('poll_btn')}</Button>
            </CardFooter>
          </Card>

          {/* Feedback Wall */}
          <div className="lg:col-span-8 space-y-10">
            <Card className="bg-white/5 shadow-2xl border-white/10 rounded-[3rem] backdrop-blur-md overflow-hidden">
              <CardHeader className="border-b border-white/5 p-8">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-black flex items-center gap-3 text-white/60 tracking-widest uppercase">
                    <MessageSquare className="w-5 h-5 text-primary interactive-icon" /> {t('feedback_title')}
                  </CardTitle>
                  <Badge variant="outline" className="border-primary/40 text-primary uppercase font-black tracking-widest text-[10px] animate-pulse">LIVE CONNECT</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5 max-h-[450px] overflow-y-auto custom-scrollbar">
                  {feedbackItems.map((item, i) => (
                    <div key={i} className="p-8 space-y-4 hover:bg-primary/[0.02] transition-colors group">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-primary text-black flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(7,241,214,0.3)]">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white text-lg">{item.name}</p>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.location} • {item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, star) => (
                            <Star key={star} className={`w-4 h-4 interactive-icon ${star < item.rating ? 'text-primary fill-primary' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="relative pl-8">
                        <Quote className="absolute top-0 left-0 w-5 h-5 text-primary/20 interactive-icon" />
                        <p className="text-white/60 italic font-medium text-lg leading-relaxed group-hover:text-white/90 transition-colors">"{item.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-10 bg-white/[0.02] border-t border-white/5 rounded-b-[3rem] flex flex-col gap-6">
                 <div className="w-full flex gap-4">
                    <Textarea 
                      placeholder="Share your experience or idea for Vikas Setu..." 
                      className="resize-none min-h-[80px] flex-1 bg-black/40 border-white/10 focus:border-primary/50 text-white rounded-2xl p-4"
                    />
                    <Button className="h-auto bg-primary hover:bg-white text-black hover:text-black flex flex-col items-center justify-center gap-2 px-8 rounded-2xl transition-all cyan-glow">
                      <Send className="h-6 w-6 interactive-icon" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t('button_send')}</span>
                    </Button>
                 </div>
                 <div className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-widest text-white/30">
                    <span className="flex items-center gap-2 text-primary">
                      <Users className="w-4 h-4 interactive-icon" /> 2,456 CITIZENS ONLINE
                    </span>
                    <Button variant="link" className="text-[10px] h-auto p-0 font-black text-white/60 hover:text-primary transition-all uppercase">VIEW GLOBAL FEED</Button>
                 </div>
              </CardFooter>
            </Card>

            <div className="bg-primary p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_0_50px_rgba(7,241,214,0.2)] group hover:scale-[1.01] transition-all duration-500">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-4xl font-black font-headline tracking-tighter uppercase text-black italic">{t('propose_title')}</h3>
                <p className="text-black/60 font-black uppercase tracking-widest text-sm">Your code is the architect of tomorrow's Bharat.</p>
              </div>
              <Button size="lg" className="bg-black text-primary hover:bg-white hover:text-black text-lg font-black px-12 h-16 rounded-2xl shadow-2xl transition-all uppercase tracking-[0.2em]">
                📤 {t('submit_idea')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
