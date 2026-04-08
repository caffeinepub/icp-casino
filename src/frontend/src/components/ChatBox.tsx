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
      className="w-full futuristic-panel border-b"
      style={{
        borderTop: "2px solid oklch(0.72 0.18 65 / 0.35)",
        borderBottomColor: "oklch(0.72 0.18 65 / 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 relative z-10">
        {/* Data stream section header */}
        <div className="flex items-center gap-2 mb-2.5" data-ocid="chat-header">
          <MessageCircle
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.18 65)" }}
            aria-hidden="true"
          />
          {/* LIVE NETWORK CHAT label in tech-text style */}
          <span
            className="tech-text text-xs font-bold"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            LIVE NETWORK CHAT
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "oklch(0.72 0.20 65)",
                boxShadow: "0 0 6px oklch(0.72 0.20 65 / 0.80)",
              }}
            />
            <span
              className="tech-text text-[10px]"
              style={{ color: "oklch(0.55 0.03 65)" }}
            >
              {isLoading ? "…" : `${messages.length} messages`}
            </span>
          </span>
        </div>

        {/* Message list */}
        <ScrollArea className="h-24 w-full pr-2" data-ocid="chat-messages">
          <div className="flex flex-col gap-0.5">
            {isLoading ? (
              <>
                <Skeleton className="h-3 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </>
            ) : messages.length === 0 ? (
              <div
                className="flex items-center justify-center h-16 text-xs text-center"
                style={{ color: "oklch(0.72 0.18 65 / 0.65)" }}
                data-ocid="chat-empty"
              >
                No messages yet — be the first to say hello! 👋
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-baseline gap-1.5 text-xs leading-relaxed min-w-0 px-1.5 py-0.5 rounded"
                  style={{
                    background:
                      msg.senderName === displayName
                        ? "oklch(0.72 0.18 65 / 0.08)"
                        : "transparent",
                  }}
                >
                  {/* Timestamp in tech-text mono style */}
                  <span
                    className="tech-text text-[10px] shrink-0 tabular-nums"
                    style={{ color: "oklch(0.45 0.02 65)" }}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                  <span
                    className="font-bold shrink-0 text-premium"
                    style={{ color: getUserColor(msg.senderName) }}
                  >
                    {msg.senderName}:
                  </span>
                  <span
                    className="break-words min-w-0"
                    style={{ color: "oklch(0.82 0.02 65)" }}
                  >
                    {msg.message}
                  </span>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input row */}
        <div className="flex gap-2 mt-2.5" data-ocid="chat-input-row">
          <Input
            data-ocid="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something to the table…"
            className="flex-1 h-8 text-xs glass-dark cyber-border transition-smooth"
            style={{
              borderColor: "oklch(0.4 0.15 300 / 0.30)",
              color: "oklch(0.88 0.02 65)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.65 0.28 265 / 0.75)";
              e.currentTarget.style.boxShadow =
                "0 0 0 1px oklch(0.65 0.28 265 / 0.25), 0 0 12px oklch(0.70 0.25 200 / 0.20)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.4 0.15 300 / 0.30)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Chat message input"
            maxLength={200}
            disabled={sendMessage.isPending}
          />
          <Button
            data-ocid="chat-send"
            onClick={handleSend}
            size="sm"
            className="h-8 px-3 font-bold btn-premium plasma-button"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
              boxShadow: "0 2px 10px oklch(0.55 0.22 265 / 0.35)",
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
