import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useLobbyChatMessages,
  usePlayerDisplayName,
  useSendLobbyChatMessage,
} from "../hooks/use-wallet";

// Vegas-themed user colors — gold & purple jewel tones
const USER_COLORS = [
  "oklch(0.80 0.18 65)", // gold
  "oklch(0.72 0.15 300)", // royal purple
  "oklch(0.78 0.13 280)", // light purple
  "oklch(0.65 0.18 300)", // deep violet
  "oklch(0.82 0.16 65)", // light gold
  "oklch(0.68 0.20 310)", // vivid violet
];

function getUserColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return USER_COLORS[Math.abs(hash) % USER_COLORS.length];
}

function formatTime(timestampNs: bigint): string {
  // IC timestamps are in nanoseconds
  const ms = Number(timestampNs / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatBox() {
  const { data: messages = [], isLoading } = useLobbyChatMessages();
  const sendMessage = useSendLobbyChatMessage();
  const displayName = usePlayerDisplayName();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messages.length !== prevCountRef.current) {
      prevCountRef.current = messages.length;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  function handleSend() {
    const text = input.trim();
    if (!text || sendMessage.isPending) return;
    sendMessage.mutate({ message: text, senderName: displayName });
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div
      data-ocid="chatbox"
      className="w-full border-b"
      style={{
        background: "oklch(0.09 0.01 45)",
        borderColor: "oklch(0.72 0.18 65 / 0.25)",
        borderTop: "1px solid oklch(0.72 0.18 65 / 0.20)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.18 65)" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.80 0.18 65)" }}
          >
            Live Casino Chat
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.72 0.20 65)" }}
            />
            <span className="text-[10px] text-muted-foreground">
              {isLoading ? "…" : `${messages.length} messages`}
            </span>
          </span>
        </div>

        {/* Message list */}
        <ScrollArea className="h-24 w-full pr-2" data-ocid="chat-messages">
          <div className="flex flex-col gap-0.5">
            {isLoading ? (
              // Loading skeleton
              <>
                <Skeleton className="h-3 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </>
            ) : messages.length === 0 ? (
              // Empty state
              <div
                className="flex items-center justify-center h-16 text-xs text-center"
                style={{ color: "oklch(0.72 0.18 65 / 0.70)" }}
                data-ocid="chat-empty"
              >
                No messages yet — be the first to say hello! 👋
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-baseline gap-1.5 text-xs leading-relaxed min-w-0"
                >
                  <span className="text-muted-foreground shrink-0 tabular-nums">
                    {formatTime(msg.timestamp)}
                  </span>
                  <span
                    className="font-semibold shrink-0"
                    style={{ color: getUserColor(msg.senderName) }}
                  >
                    {msg.senderName}:
                  </span>
                  <span className="text-foreground/80 break-words min-w-0">
                    {msg.message}
                  </span>
                </div>
              ))
            )}
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
            className="flex-1 h-8 text-xs placeholder:text-muted-foreground"
            style={{
              background: "oklch(0.13 0.01 45)",
              borderColor: "oklch(0.25 0.05 65 / 0.50)",
            }}
            aria-label="Chat message input"
            maxLength={200}
            disabled={sendMessage.isPending}
          />
          <Button
            data-ocid="chat-send"
            onClick={handleSend}
            size="sm"
            className="h-8 px-3 font-semibold transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
              color: "oklch(0.07 0 0)",
              border: "none",
            }}
            disabled={sendMessage.isPending || !input.trim()}
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
