"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, TrendingUp, BarChart3, Clock } from "lucide-react"

const topRatedSchemes = [
  { name: "PM Kisan", state: "National", rating: 4.9, votes: "125k", progress: 95 },
  { name: "Rythu Bharosa", state: "Telangana", rating: 4.8, votes: "89k", progress: 92 },
  { name: "Ladki Bahin", state: "Maharashtra", rating: 4.5, votes: "210k", progress: 88 },
  { name: "Ayushman Bharat", state: "National", rating: 4.4, votes: "450k", progress: 76 },
]

export function ImpactDashboard() {
  return (
    <section id="impact" className="py-20">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold font-headline">📈 BHARAT KI VIKAS GATI</h2>
          <p className="text-muted-foreground">Live progress tracker and public impact analysis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-xl border-none bg-gradient-to-br from-white to-muted/50">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-primary" /> Overall Development Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-black text-foreground">68% <span className="text-lg font-bold text-muted-foreground uppercase tracking-widest">Overall</span></span>
                  <Badge className="bg-secondary text-white">Target 2030: 100%</Badge>
                </div>
                <Progress value={68} className="h-6" indicatorClassName="bg-primary" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2020-21</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2021-22</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2022-23</span>
                    <span className="text-primary">82%</span>
                  </div>
                  <Progress value={82} className="h-2" indicatorClassName="bg-primary" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2023-24</span>
                    <span className="text-secondary">68% (Live)</span>
                  </div>
                  <Progress value={68} className="h-2" indicatorClassName="bg-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-none bg-foreground text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-primary" /> Growth Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Top Growing Sector</p>
                <p className="text-2xl font-bold">Infrastructure (NHAI)</p>
                <p className="text-sm text-white/60">+15.4% Completion Rate YoY</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">Public Trust Score</p>
                <p className="text-2xl font-bold">8.4/10</p>
                <p className="text-sm text-white/60">Based on 250,000 Verified Votes</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-primary/30 flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-xs font-bold uppercase tracking-widest">Digital Index</p>
                   <p className="text-xl font-bold">High Growth</p>
                 </div>
                 <div className="text-right">
                    <span className="text-2xl font-black text-primary">↑ 22%</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-none">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              ⭐ TOP RATED YOJANAYE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="font-bold text-foreground">YOJANA NAME</TableHead>
                  <TableHead className="font-bold text-foreground">STATE</TableHead>
                  <TableHead className="font-bold text-foreground">PUBLIC RATING</TableHead>
                  <TableHead className="font-bold text-foreground">ENGAGEMENT</TableHead>
                  <TableHead className="font-bold text-foreground text-right">PUBLIC VOTE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRatedSchemes.map((scheme) => (
                  <TableRow key={scheme.name} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-bold text-lg">{scheme.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-muted-foreground/30">{scheme.state}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-yellow-600">★</span> {scheme.rating}
                        <div className="hidden sm:flex h-1.5 w-16 bg-muted rounded-full overflow-hidden ml-2">
                          <div className="h-full bg-yellow-500" style={{ width: `${scheme.rating * 20}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium">{scheme.votes} interactions</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary hover:bg-secondary/10">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
