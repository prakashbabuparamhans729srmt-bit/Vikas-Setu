
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
import { ShieldCheck, User as UserIcon, Lock, Chrome, Github, ArrowRight, UserCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useUser, useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview विकास सेतु मुख्य टर्मिनल (Vikas Setu Core Terminal)
 * 'A to Z' प्रवाह का प्रारंभिक बिंदु: Identity Verification.
 */

export default function Home() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

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
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#07f1d6]"></div>
      </div>
    )
  }

  if (!user && !isGuest) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 relative overflow-hidden font-body">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <Card className="w-full max-w-lg bg-[#14181B]/90 backdrop-blur-3xl border-white/5 shadow-2xl rounded-[3rem] relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 flex shadow-[0_5px_15px_rgba(7,241,214,0.3)]">
            <div className="flex-1 bg-secondary" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-primary" />
          </div>

          <CardHeader className="pt-16 pb-10 text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 cyan-glow animate-bounce">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-5xl font-black font-headline tracking-tighter text-white uppercase italic">
                Vikas <span className="text-primary">Setu</span>
              </CardTitle>
              <CardDescription className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
                Secure Gateway to Bharat 2.0
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 ml-1">Identity Node</Label>
                <div className="relative group">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-all" />
                  <Input 
                    type="email" 
                    placeholder="citizen@bharat.gov.in" 
                    className="pl-14 h-16 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all text-lg font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Access Protocol</Label>
                  <Link href="#" className="text-[10px] font-black text-primary uppercase hover:underline tracking-widest">Restore</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-all" />
                  <Input 
                    type="password" 
                    className="pl-14 h-16 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-2xl transition-all text-lg font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleAuthorize} 
              disabled={isSigningIn} 
              className="w-full h-16 bg-primary text-black font-black text-xl rounded-[1.5rem] hover:bg-white hover:scale-[1.02] transition-all cyan-glow group uppercase tracking-widest"
            >
              {isSigningIn ? "AUTHORIZING..." : "AUTHORIZE ACCESS"} <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
                <span className="bg-[#14181B] px-6 text-white/20">OR CONNECT VIA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGoogleSignIn} variant="outline" className="h-14 border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 rounded-2xl text-white font-black text-xs uppercase gap-3 transition-all tracking-widest">
                <Chrome className="w-5 h-5 text-primary" /> Google
              </Button>
              <Button variant="outline" className="h-14 border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 rounded-2xl text-white font-black text-xs uppercase gap-3 transition-all tracking-widest">
                <Github className="w-5 h-5" /> Github
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-8 pb-16 pt-8">
            <Button onClick={handleGuestEntry} variant="ghost" className="w-full h-14 border border-dashed border-white/10 text-white/30 hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-2xl flex items-center justify-center gap-4 transition-all group">
              <UserCheck className="w-6 h-6 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Enter as Guest Observer</span>
            </Button>
            <p className="text-sm text-white/30 text-center font-bold">
              New Citizen? <Link href="#" className="text-primary font-black hover:underline uppercase ml-2 tracking-widest">Register Node</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen font-body">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 -mt-16 relative z-20">
           <IndiaMap />
        </div>
        <SchemeBrowser />
        <ImpactDashboard />
        <FeedbackSection />
        
        <section className="py-32 bg-primary relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="container mx-auto px-4 relative z-10 text-center space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-black text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                <Zap className="w-4 h-4 animate-pulse" /> NATION BUILDING PROTOCOL
              </div>
              <h2 className="text-5xl md:text-8xl font-black font-headline text-black tracking-tighter uppercase italic leading-none">
                 Be the Catalyst <br /> for Change.
              </h2>
              <p className="text-xl md:text-2xl text-black/70 font-bold max-w-3xl mx-auto leading-relaxed">
                 Join millions of citizens helping build a stronger, more transparent India. Every vote counts, every idea matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                 <Link href="/my-applications">
                    <button className="h-20 px-12 bg-primary text-black font-black rounded-2xl text-xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest cyan-glow border-2 border-black/10">
                       My Growth Vault
                    </button>
                 </Link>
                 <Link href="/settings">
                    <button className="h-20 px-12 border-2 border-black/20 text-black font-black rounded-2xl text-xl hover:bg-black hover:text-primary transition-all uppercase tracking-widest">
                       Config Settings
                    </button>
                 </Link>
              </div>
           </div>
           <div className="absolute top-1/4 left-10 transform -rotate-12 opacity-10 text-[12rem] select-none group-hover:rotate-0 transition-transform duration-1000">🇮🇳</div>
           <div className="absolute bottom-1/4 right-10 transform rotate-12 opacity-10 text-[12rem] select-none group-hover:rotate-0 transition-transform duration-1000">🗳️</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
