import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../backend";
import { useAuth } from "../../hooks/use-auth";
import { useSendChatMessage } from "../../hooks/use-versus";
import { formatTimestamp } from "../../types/versus";

interface LiveChatProps {
  matchId: string;
  messages: ChatMessage[];
  opponentName?: string;
}

export function LiveChat({ matchId, messages, opponentName }: LiveChatProps) {
  const { principalText } = useAuth();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useSendChatMessage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || isPending) return;
    sendMessage({ matchId, message: trimmed });
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="versus-chat-panel h-full" data-ocid="live-chat-panel">
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-center gap-2 shrink-0"
        style={{ borderColor: "oklch(0.25 0.05 65 / 0.5)" }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "oklch(0.72 0.18 65)" }}
        />
        <span
          className="text-sm font-display font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.72 0.18 65)" }}
        >
          Live Chat
        </span>
      </div>

      {/* Messages */}
      <div
        className="versus-chat-messages flex-1 overflow-y-auto"
        data-ocid="chat-messages"
      >
        {messages.length === 0 && (
          <p
            className="text-xs text-center py-8"
            style={{ color: "oklch(0.45 0.03 65)" }}
          >
            No messages yet. Say hello!
          </p>
        )}
        {messages.map((msg, i) => {
          const isMe = msg.senderId.toText() === principalText;
          const senderLabel = isMe
            ? "You"
            : (opponentName ?? `${msg.senderId.toText().slice(0, 8)}…`);

          return (
            <div
              key={`${msg.timestamp}-${i}`}
              className="versus-chat-message mb-3"
            >
              <div className="flex items-baseline justify-between mb-1 gap-2">
                <span
                  className={
                    isMe
                      ? "versus-chat-message-player"
                      : "versus-chat-message-opponent"
                  }
                  style={{ fontSize: "0.75rem" }}
                >
                  {senderLabel}
                </span>
                <span
                  className="text-xs shrink-0"
                  style={{ color: "oklch(0.40 0.02 65)" }}
                >
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed break-words"
                style={{ color: "oklch(0.88 0.02 65)" }}
              >
                {msg.message}
              </p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="versus-chat-input shrink-0" data-ocid="chat-input-area">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            maxLength={200}
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-smooth min-w-0"
            style={{
              background: "oklch(0.14 0.02 45)",
              border: "1px solid oklch(0.25 0.05 65 / 0.5)",
              color: "oklch(0.92 0.02 65)",
            }}
            data-ocid="chat-input"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!text.trim() || isPending}
            className="shrink-0 rounded-lg p-2 transition-smooth"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
            }}
            data-ocid="chat-send-btn"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
