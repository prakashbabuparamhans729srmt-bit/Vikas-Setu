
'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Search, ArrowRight, ShieldCheck } from "lucide-react"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

/**
 * @fileOverview नेशनल रजिस्ट्री ट्रैकिंग (National Registry Tracking)
 * यह 'A to Z' फ्लो का Tracking बिंदु है।
 */

export default function MyApplicationsPage() {
  const { user, isUserLoading } = useUser()
  const db = useFirestore()

  const applicationsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "userProfiles", user.uid, "applications"),
      orderBy("timestamp", "desc")
    );
  }, [db, user]);

  const { data: applications, isLoading: dataLoading } = useCollection(applicationsQuery);

  if (isUserLoading) return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!user) {
    redirect("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070707]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 max-w-5xl space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 uppercase font-black text-[10px] tracking-widest">
            LIVE REGISTRY
          </Badge>
          <h1 className="text-5xl font-black font-headline tracking-tighter text-white uppercase italic">
            Your Growth <span className="text-primary">Vault</span>
          </h1>
          <p className="text-white/40 font-medium">Tracking your synchronized applications with the national infrastructure.</p>
        </div>

        <div className="grid gap-6">
          {dataLoading ? (
            <div className="py-20 text-center animate-pulse text-primary font-black uppercase tracking-[0.3em]">
              SYNCHRONIZING WITH BHARAT CORE...
            </div>
          ) : applications && applications.length > 0 ? (
            applications.map((app: any) => (
              <Card key={app.id} className="bg-[#14181B]/60 border-white/5 rounded-[2rem] overflow-hidden group hover:border-primary/30 transition-all">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{app.schemeName}</h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3" /> Submitted: {app.timestamp?.toDate()?.toLocaleDateString() || "Processing..."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px]",
                      app.status === "Submitted" ? "bg-white/10 text-white" : "bg-primary text-black"
                    )}>
                      {app.status}
                    </Badge>
                    <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Transaction: {app.id.slice(0, 12)}...</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-32 text-center bg-white/[0.02] border border-dashed border-white/5 rounded-[3rem] space-y-6">
              <Search className="w-16 h-16 text-white/10 mx-auto" />
              <div className="space-y-4">
                <p className="text-2xl font-black text-white/40 uppercase tracking-tighter">No Applications Registered</p>
                <p className="text-xs text-white/20 font-medium uppercase tracking-widest">Your node has not yet initialized any resource requests.</p>
                <Link href="/#schemes">
                  <Button className="bg-primary text-black font-black uppercase tracking-widest h-12 px-8 rounded-xl mt-4">
                    EXPLORE SCHEMES <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20 rounded-[2.5rem] border-dashed">
            <CardContent className="p-10 flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-lg font-black uppercase tracking-tighter text-white">Verified Security Protocol</h4>
                    <p className="text-sm text-white/40 leading-relaxed font-medium">All applications are encrypted with Bharat-Sync technology and linked directly to your digital identity node. Data integrity is guaranteed by national consensus protocols.</p>
                </div>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
