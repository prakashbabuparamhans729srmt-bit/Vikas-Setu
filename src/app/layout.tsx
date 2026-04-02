
import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';
import { AIChatbot } from '@/components/ai-chatbot';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Vikas Setu | 🇮🇳 The Growth Bridge',
  description: 'A platform for Indian government schemes, public feedback, and national progress tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <FirebaseClientProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
              <AIChatbot />
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </FirebaseClientProvider>
        {/* Tricolor Bottom Accent */}
        <div className="fixed bottom-0 left-0 w-full h-1 flex shadow-[0_-5px_20px_rgba(7,241,214,0.2)] z-[100]">
           <div className="flex-1 bg-primary" />
           <div className="flex-1 bg-white" />
           <div className="flex-1 bg-secondary" />
        </div>
      </body>
    </html>
  );
}
