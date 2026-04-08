import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: number;
  user: string;
  text: string;
  type: "win" | "bet" | "deposit" | "chat";
  timestamp: string;
}

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    user: "BigWinner88",
    text: "🎰 Just hit the jackpot on Mega Slots — 2,400 ICP!",
    type: "win",
    timestamp: "2:41 PM",
  },
  {
    id: 2,
    user: "LuckyAce",
    text: "Placed 50 ICP on Blackjack. Let's go!",
    type: "bet",
    timestamp: "2:42 PM",
  },
  {
    id: 3,
    user: "CryptoKing",
    text: "Roulette is rigged I swear… just kidding 😂 up 300 ICP",
    type: "chat",
    timestamp: "2:43 PM",
  },
  {
    id: 4,
    user: "NightOwl",
    text: "🃏 Just doubled down on Baccarat. Feeling the rush!",
    type: "bet",
    timestamp: "2:44 PM",
  },
  {
    id: 5,
    user: "QueenOfSpades",
    text: "Deposited 100 ICP. Time to grind the poker tables 🎯",
    type: "deposit",
    timestamp: "2:45 PM",
  },
  {
    id: 6,
    user: "VegasMike",
    text: "Three 7s in a row on slots. This game is on fire 🔥",
    type: "win",
    timestamp: "2:46 PM",
  },
];

const USER_COLORS = [
  "text-purple-400",
  "text-pink-400",
  "text-cyan-400",
  "text-amber-400",
  "text-lime-400",
  "text-rose-400",
];

function getUserColor(user: string): string {
  let hash = 0;
  for (let i = 0; i < user.length; i++)
    hash = user.charCodeAt(i) + ((hash << 5) - hash);
  return USER_COLORS[Math.abs(hash) % USER_COLORS.length];
}

function MessageBadge({ type }: { type: ChatMessage["type"] }) {
  if (type === "win")
    return (
      <span className="text-win text-[10px] font-bold uppercase tracking-wider mr-1">
        WIN
      </span>
    );
  if (type === "bet")
    return (
      <span className="text-primary text-[10px] font-bold uppercase tracking-wider mr-1">
        BET
      </span>
    );
  if (type === "deposit")
    return (
      <span className="text-deposit text-[10px] font-bold uppercase tracking-wider mr-1">
        DEP
      </span>
    );
  return null;
}

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(SEED_MESSAGES.length + 1);

  const msgCount = messages.length;
  const prevMsgCount = useRef(msgCount);
  useEffect(() => {
    if (msgCount !== prevMsgCount.current) {
      prevMsgCount.current = msgCount;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, user: "You", text, type: "chat", timestamp },
    ]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div
      data-ocid="chatbox"
      className="w-full border-b border-border bg-card"
      style={{ background: "oklch(0.15 0 0 / 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Live Casino Chat
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-win-muted border border-win animate-pulse"
              style={{ background: "oklch(var(--win))" }}
            />
            <span className="text-[10px] text-muted-foreground">
              {messages.length} online
            </span>
          </span>
        </div>

        {/* Message list */}
        <ScrollArea className="h-24 w-full pr-2" data-ocid="chat-messages">
          <div className="flex flex-col gap-0.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-baseline gap-1.5 text-xs leading-relaxed min-w-0"
              >
                <span className="text-muted-foreground shrink-0 tabular-nums">
                  {msg.timestamp}
                </span>
                <MessageBadge type={msg.type} />
                <span
                  className={`font-semibold shrink-0 ${getUserColor(msg.user)}`}
                >
                  {msg.user}:
                </span>
                <span className="text-foreground/80 break-words min-w-0">
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2 mt-2" data-ocid="chat-input-row">
          <Input
            data-ocid="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something to the table…"
            className="flex-1 h-8 text-xs bg-input border-border placeholder:text-muted-foreground focus-visible:ring-primary"
            aria-label="Chat message input"
            maxLength={200}
          />
          <Button
            data-ocid="chat-send"
            onClick={handleSend}
            size="sm"
            className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
