'use client';

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';
import { AIChatbot } from '@/components/ai-chatbot';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Vikas Setu | 🇮🇳 The Growth Bridge</title>
        <meta name="description" content="A platform for Indian government schemes, public feedback, and national progress tracking." />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#07F1D6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vikas Setu" />
        <meta name="application-name" content="Vikas Setu" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="https://picsum.photos/seed/vikas-setu-app-icon/180/180" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-black">
        <FirebaseClientProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
              <AIChatbot />
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </FirebaseClientProvider>
        {/* Tricolor Bottom Accent - National Integrity Layer */}
        <div className="fixed bottom-0 left-0 w-full h-1 flex shadow-[0_-5px_20px_rgba(7,241,214,0.2)] z-[100]">
           <div className="flex-1 bg-secondary" />
           <div className="flex-1 bg-white" />
           <div className="flex-1 bg-primary" />
        </div>
      </body>
    </html>
  );
}
