
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, X, Send, Mic, MicOff, MessageSquare, Sparkles, User, Shield } from 'lucide-react';
import { aiSchemeAssistant } from '@/ai/flows/ai-scheme-assistant';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Jai Hind! I am Vikas Setu AI. How can I help you find government schemes today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || query;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await aiSchemeAssistant({ query: messageText });
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <Card className="w-[380px] h-[550px] shadow-2xl border-primary/20 flex flex-col bg-background/95 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <CardHeader className="bg-primary p-6 text-black flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tighter">VIKAS SETU AI</CardTitle>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Digital Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-black hover:bg-black/10 rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </CardHeader>

          <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-black rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none border border-border/50"
                )}>
                  {msg.content}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Processing Data...</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-6 bg-muted/30 border-t border-border/50">
            <div className="w-full space-y-4">
              <div className="flex items-center gap-2">
                <Input 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about schemes..."
                  className="flex-1 h-12 bg-background border-border/50 rounded-xl"
                />
                <Button onClick={startListening} variant={isListening ? "destructive" : "outline"} size="icon" className="h-12 w-12 rounded-xl">
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-primary" />}
                </Button>
                <Button onClick={() => handleSend()} size="icon" className="h-12 w-12 rounded-xl bg-primary text-black">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1"><Shield className="w-2 h-2 text-primary" /> Verified Data</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-2 h-2 text-primary" /> Multi-lingual</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 cyan-glow group",
          isOpen ? "bg-secondary text-white" : "bg-primary text-black hover:scale-110"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform" />}
      </Button>
    </div>
  );
}
