
'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import { useLanguage } from "@/context/language-context";
import { Moon, Sun, Laptop, Bell, Shield, Eye, Globe, User, Palette } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-20 max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black font-headline tracking-tighter uppercase">Settings</h1>
            <p className="text-muted-foreground font-medium">Configure your terminal and connection protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <aside className="md:col-span-4 space-y-2">
              {[
                { icon: Palette, label: "Appearance" },
                { icon: Bell, label: "Notifications" },
                { icon: Shield, label: "Privacy & Security" },
                { icon: Globe, label: "Localization" },
                { icon: User, label: "Profile Nodes" }
              ].map((item, i) => (
                <Button key={i} variant="ghost" className="w-full justify-start gap-4 h-14 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/10 hover:text-primary transition-all">
                  <item.icon className="w-5 h-5" /> {item.label}
                </Button>
              ))}
            </aside>

            <div className="md:col-span-8 space-y-8">
              {/* Theme Selection */}
              <Card className="rounded-[2.5rem] border-border bg-card/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                    <Palette className="w-6 h-6 text-primary" /> Visual Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <RadioGroup value={theme} onValueChange={(v) => setTheme(v as any)} className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', icon: Sun, label: 'Light' },
                      { id: 'dark', icon: Moon, label: 'Dark' },
                      { id: 'system', icon: Laptop, label: 'System' }
                    ].map((mode) => (
                      <div key={mode.id}>
                        <RadioGroupItem value={mode.id} id={mode.id} className="peer sr-only" />
                        <Label
                          htmlFor={mode.id}
                          className="flex flex-col items-center justify-between rounded-2xl border-2 border-border bg-background p-6 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <mode.icon className="mb-3 h-8 w-8 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{mode.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/50 border border-border">
                    <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-widest">High Contrast</p>
                      <p className="text-xs text-muted-foreground">Enhance readability for visual accessibility nodes.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Access */}
              <Card className="rounded-[2.5rem] border-border bg-card/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                    <Eye className="w-6 h-6 text-primary" /> Interface Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold uppercase tracking-widest">Animations</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold uppercase tracking-widest">Real-time Feed</Label>
                    <Switch defaultChecked />
                  </div>
                  <Button className="w-full h-14 bg-primary text-black font-black rounded-2xl hover:scale-[1.02] transition-all cyan-glow uppercase tracking-widest">
                    Save Protocol Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
