import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, X, Minimize2, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const API_ENDPOINT = "https://ai.sumopod.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_SUMOPOD_API_KEY;
const MODEL = "gpt-5";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.3;
const HISTORY_WINDOW = 10;
const STORAGE_KEY = "andre-chat-history";

const SYSTEM_PROMPT = `
You are the AI Assistant for Andre Saputra's portfolio website.
Your role is to help visitors understand Andre's skills, projects, and background.
Be professional, friendly, and concise.

Knowledge Base:
Name: Andre Saputra
Role: Admin Operation, Informatics Teacher, Full Stack Developer
Location: Pekanbaru (PT Telkom Infrastruktur Indonesia context)
Skills: Network (92%), IoT (88%), AI & Automation (86%), Web Development (84%), Backend (80%).
Tech Stack: React, Node.js, PHP (CodeIgniter), Arduino, ESP32, Rasberry Pi, Python, n8n.

Projects:
1. Reka AI: AI platform for digital engineering services & real-time coding assistant.
2. Fiscal AI Finance: AI-powered finance management application.
3. AET AI: AI solution for AET Student Association at Politeknik Caltex Riau.
4. SiTiket: Trouble ticket management system for Telkom Infrastructure.
5. SNMB: Landing page for MAN IC Siak new student national selection.
6. Perpus MAN IC Siak: Comprehensive digital library system.
7. EduForum: Social educational platform for MAN IC Siak community.
8. FireSense: IoT fire detection system using ESP32, Firebase, and Fuzzy Logic.
9. PDF Tools: Online PDF management suite (merge, split, compress).

Free Tools provided by Andre: PDF Tools.
Contact: andresaputra07012019@gmail.com, GitHub (andre-sptr), LinkedIn (andre-saputra-434561381), Instagram (andree.sptrr), WhatsApp (0823-8702-5429).

Guidelines:
- Answer questions based on this info.
- If unsure, suggest contacting Andre directly via email.
- Keep answers under 3-4 sentences unless detailed explanation is asked.
- Use "I" to refer to yourself as the AI Assistant, and "Andre" for the portfolio owner.
- Format your responses using Markdown for better readability.
`;

const WELCOME_MESSAGE = "Halo! 👋 Saya asisten virtual Andre. Saya bisa ceritakan tentang project, skill, atau cara kontak Andre. Ada yang ingin kamu tahu?";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SUGGESTIONS = [
  "Bagaimana cara kontak Andre?",
  "Apa saja projects Andre?",
  "Skill apa yang Andre kuasai?",
  "Ceritakan tentang Andre",
];

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-primary"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestTimestamps = useRef<number[]>([]);

  // Show welcome message on first open if no history
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Message = { role: "assistant", content: WELCOME_MESSAGE };
      setMessages([welcome]);
      saveHistory([welcome]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, streamingContent]);

  const checkRateLimit = () => {
    const now = Date.now();
    requestTimestamps.current = requestTimestamps.current.filter((t) => t > now - 60000);
    if (requestTimestamps.current.length >= 10) return false;
    requestTimestamps.current.push(now);
    return true;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    if (!API_KEY) {
      toast.error("API Key missing!");
      return;
    }
    if (!checkRateLimit()) {
      toast.error("Terlalu banyak permintaan. Mohon tunggu sebentar.");
      return;
    }

    const newMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    // Send only the last HISTORY_WINDOW messages to avoid token overflow
    const historyForAPI = updatedMessages.slice(-HISTORY_WINDOW);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...historyForAPI],
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      if (!response.body) throw new Error("No response body");

      setIsLoading(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content || "";
            accumulated += token;
            setStreamingContent(accumulated);
          } catch {
            // malformed chunk — skip
          }
        }
      }

      const finalMessages: Message[] = [...updatedMessages, { role: "assistant", content: accumulated || "Maaf, saya tidak dapat memproses permintaan Anda." }];
      setMessages(finalMessages);
      saveHistory(finalMessages);
      setStreamingContent("");
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
      const finalMessages: Message[] = [...updatedMessages, { role: "assistant", content: errorMsg }];
      setMessages(finalMessages);
      saveHistory(finalMessages);
      setStreamingContent("");
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setStreamingContent("");
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Percakapan telah dibersihkan.");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const showEmptyState = messages.length === 0 && !isLoading;

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg glow-hover p-0 relative"
              onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            >
              <Bot className="w-7 h-7 text-primary-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col glass-card rounded-2xl shadow-[var(--shadow-elevated)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Andre's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent" onClick={handleClearChat} title="Bersihkan Chat">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent" onClick={() => setIsMinimized(true)} title="Minimize">
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => setIsOpen(false)} title="Tutup">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {showEmptyState && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1.5">Halo! 👋</h4>
                    <p className="text-muted-foreground text-sm max-w-[85%] mx-auto">
                      Saya asisten virtual Andre. Ada yang bisa saya bantu?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-w-[90%] mx-auto">
                    {SUGGESTIONS.map((s, i) => (
                      <button key={i} onClick={() => handleSendMessage(s)} className="text-xs text-left p-3 rounded-xl bg-muted/60 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary"}`}>
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted/60 border border-border rounded-tl-sm"}`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Streaming assistant message */}
              {streamingContent && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-muted/60 border border-border rounded-2xl rounded-tl-sm p-3 max-w-[80%] text-sm leading-relaxed">
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {streamingContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && !streamingContent && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-muted/60 border border-border rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                    <TypingDots />
                    <span className="text-xs text-muted-foreground">Mengetik...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50 backdrop-blur-md">
              <div className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Tulis pesan..." className="bg-muted/50 border-border focus:border-primary/50" disabled={isLoading || !!streamingContent} />
                <Button onClick={() => handleSendMessage(input)} disabled={isLoading || !!streamingContent || !input.trim()} size="icon" className="bg-primary hover:bg-primary/90 shrink-0 rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-muted-foreground/50">Andre's AI Assistant</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
