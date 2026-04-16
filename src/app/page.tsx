
'use client';

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SchemeBrowser } from "@/components/scheme-browser";
import { FeedbackSection } from "@/components/feedback-section";
import { IndiaMap } from "@/components/india-map";
import { ImpactDashboard } from "@/components/impact-dashboard";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, User as UserIcon, Lock, Chrome, Github, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";
import { useUser, useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  // Identity Node Synchronization Protocol
  const syncProfile = (u: User) => {
    if (!db) return;
    const userRef = doc(db, "userProfiles", u.uid);
    setDocumentNonBlocking(userRef, {
      id: u.uid,
      displayName: u.displayName || "Citizen Node",
      stateId: "IN-DL",
      city: "New Delhi",
      createdAt: serverTimestamp(),
    }, { merge: true });
  }

  const handleAuthorize = async () => {
    if (!email || !password) {
      toast({ title: "Input Required", description: "Identity credentials are missing.", variant: "destructive" });
      return;
    }
    setIsSigningIn(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      syncProfile(result.user);
      toast({ title: "Authorized", description: "Citizen Node successfully synced with Vikas Setu Core." });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          syncProfile(result.user);
          toast({ title: "Node Registered", description: "New Citizen Node created and synchronized." });
        } catch (regError: any) {
          toast({ title: "Auth Protocol Failed", description: regError.message, variant: "destructive" });
        }
      } else {
        toast({ title: "Protocol Refused", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsSigningIn(false);
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      syncProfile(result.user);
      toast({ title: "Authorized", description: "Google Auth successfully synced." });
    } catch (error: any) {
      toast({ title: "Handshake Failed", description: error.message, variant: "destructive" });
    }
  }

  const handleGuestEntry = () => {
    setIsGuest(true);
    toast({ title: "Guest Mode", description: "Limited observational protocol enabled. Application features restricted." });
  }

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user && !isGuest) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Neon Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <Card className="w-full max-w-md bg-[#14181B]/80 backdrop-blur-2xl border-white/5 shadow-2xl rounded-[2.5rem] relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 flex">
            <div className="flex-1 bg-secondary" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-primary" />
          </div>

          <CardHeader className="pt-12 pb-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 cyan-glow animate-bounce">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-black font-headline tracking-tighter text-white uppercase">
                Vikas <span className="text-primary italic">Setu</span>
              </CardTitle>
              <CardDescription className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                Secure Gateway to Bharat 2.0
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-10">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Email Node</Label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="name@bharat.gov.in" 
                    className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Access Protocol</Label>
                  <Link href="#" className="text-[10px] font-black text-primary uppercase hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleAuthorize} disabled={isSigningIn} className="w-full h-14 bg-primary text-black font-black text-lg rounded-2xl hover:bg-white hover:scale-[1.02] transition-all cyan-glow group">
              {isSigningIn ? "AUTHORIZING..." : "AUTHORIZE ACCESS"} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/20 font-black tracking-widest">OR CONNECT VIA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGoogleSignIn} variant="outline" className="h-12 border-white/5 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-xs uppercase gap-2 transition-all">
                <Chrome className="w-4 h-4" /> Google
              </Button>
              <Button variant="outline" className="h-12 border-white/5 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-xs uppercase gap-2 transition-all">
                <Github className="w-4 h-4" /> Github
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pb-12 pt-6">
            <Button onClick={handleGuestEntry} variant="ghost" className="w-full h-12 border border-dashed border-white/10 text-white/40 hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-xl flex items-center justify-center gap-3 transition-all group">
              <UserCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Enter as Guest Observer</span>
            </Button>
            <p className="text-sm text-white/40 text-center font-medium">
              New Citizen? <Link href="#" className="text-primary font-black hover:underline uppercase ml-1">Register Node</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

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
        
        <section className="py-24 bg-primary relative overflow-hidden">
           <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-black font-headline text-black tracking-tighter uppercase italic text-shadow-glow">
                 Be the Catalyst for Change.
              </h2>
              <p className="text-xl text-black/80 font-medium max-w-2xl mx-auto">
                 Join millions of citizens helping build a stronger, more transparent India. Every vote counts, every idea matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link href="/my-applications">
                    <button className="h-14 px-10 bg-black text-primary font-black rounded-xl text-lg hover:scale-105 transition-transform shadow-2xl uppercase">
                       My Vault
                    </button>
                 </Link>
                 <Link href="/settings">
                    <button className="h-14 px-10 border-2 border-black text-black font-black rounded-xl text-lg hover:bg-black/10 transition-colors uppercase">
                       Settings
                    </button>
                 </Link>
              </div>
           </div>
           <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 opacity-10 text-[10rem] select-none">🇮🇳</div>
           <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 opacity-10 text-[10rem] select-none">🗳️</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
