"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ThumbsUp, Send, MessageSquare, Quote, Star } from "lucide-react"

const feedbackItems = [
  { name: "Rahul Kumar", location: "Bihar", text: "जल जीवन मिशन से मेरे गाँव में नल से जल आ गया, धन्यवाद!", rating: 5, date: "2 hours ago" },
  { name: "Priya Sharma", location: "MP", text: "PM आवास योजना में मेरा घर बन गया, सरकार जनता के साथ है!", rating: 5, date: "5 hours ago" },
  { name: "Suresh Singh", location: "UP", text: "डिजिटल इंडिया से अब गाँव में भी बैंकिंग आसान हो गई है।", rating: 4, date: "1 day ago" },
]

export function FeedbackSection() {
  return (
    <section id="feedback" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest">सबसे ताकतवर आवाज</Badge>
          <h2 className="text-4xl font-bold font-headline">🗳️ JANATA KI RAI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Your feedback shapes the future of India. Participate in polls and share your experiences with government schemes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Poll of the Day */}
          <Card className="lg:col-span-4 border-2 border-primary shadow-xl h-full">
            <CardHeader className="bg-primary text-white text-center rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                ❓ POLL OF THE DAY
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <p className="text-xl font-bold text-center leading-relaxed">
                क्या आपको लगता है कि "एक राष्ट्र, एक चुनाव" से विकास की गति तेज होगी?
              </p>
              
              <RadioGroup defaultValue="yes" className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-primary transition-all bg-white shadow-sm">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="r1" />
                    <Label htmlFor="r1" className="text-lg font-bold">हाँ, बिल्कुल</Label>
                  </div>
                  <span className="text-primary font-black">67%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-primary transition-all bg-white shadow-sm">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="r2" />
                    <Label htmlFor="r2" className="text-lg font-bold">नहीं</Label>
                  </div>
                  <span className="text-muted-foreground font-bold">22%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-primary transition-all bg-white shadow-sm">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="idk" id="r3" />
                    <Label htmlFor="r3" className="text-lg font-bold">पता नहीं</Label>
                  </div>
                  <span className="text-muted-foreground font-bold">11%</span>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold">Vote to See Results</Button>
            </CardFooter>
          </Card>

          {/* Feedback Wall */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-white shadow-xl border-none">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    💬 PUBLIC FEEDBACK WALL
                  </CardTitle>
                  <Badge variant="outline" className="border-secondary text-secondary">Live Updates</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y max-h-[400px] overflow-y-auto">
                  {feedbackItems.map((item, i) => (
                    <div key={i} className="p-6 space-y-3 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.location} • {item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, star) => (
                            <Star key={star} className={`w-3 h-3 ${star < item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="relative pl-6">
                        <Quote className="absolute top-0 left-0 w-4 h-4 text-muted-foreground/30" />
                        <p className="text-muted-foreground italic font-medium">"{item.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-muted/20 border-t rounded-b-xl flex flex-col gap-4">
                 <div className="w-full flex gap-4">
                    <Textarea 
                      placeholder="Share your experience or idea for Vikas Setu..." 
                      className="resize-none min-h-[60px] flex-1 bg-white"
                    />
                    <Button className="h-full bg-secondary hover:bg-secondary/90 flex flex-col items-center justify-center gap-1 px-6">
                      <Send className="h-5 w-5" />
                      <span className="text-[10px] font-bold uppercase">Submit</span>
                    </Button>
                 </div>
                 <div className="flex items-center justify-between w-full text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-2 text-primary">
                      <MessageSquare className="w-4 h-4" /> 2,456 comments today
                    </span>
                    <Button variant="link" className="text-xs h-auto p-0 font-bold">View More Feedback</Button>
                 </div>
              </CardFooter>
            </Card>

            <div className="bg-foreground text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-black font-headline tracking-tighter uppercase italic">Have an Innovation?</h3>
                <p className="text-white/70 font-medium">Your ideas can build the infrastructure of tomorrow.</p>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-bold px-10 h-14 shadow-xl shadow-primary/20 uppercase tracking-widest">
                📤 Submit Your Idea
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
