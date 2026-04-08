import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../backend";
import { useAuth } from "../../hooks/use-auth";
import {
  getAvatarUrl,
  getDisplayName,
  useMyProfile,
} from "../../hooks/use-profile";
import { useSendChatMessage } from "../../hooks/use-versus";
import { formatTimestamp } from "../../types/versus";

interface LiveChatProps {
  matchId: string;
  messages: ChatMessage[];
  /** Username of the opponent (already resolved) */
  opponentName?: string;
  opponentAvatarUrl?: string | null;
}

/** Tiny circular avatar for chat messages */
function MsgAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  const initial = name.slice(0, 1).toUpperCase();
  const hue = (name.charCodeAt(0) * 137) % 360;
  const color = `oklch(0.65 0.22 ${hue})`;
  return (
    <span
      className="profile-avatar-thumbnail shrink-0"
      style={{
        width: 24,
        height: 24,
        fontSize: 10,
        border: `1px solid ${color}40`,
      }}
      aria-hidden="true"
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} />
      ) : (
        <span style={{ color }}>{initial}</span>
      )}
    </span>
  );
}

export function LiveChat({
  matchId,
  messages,
  opponentName,
  opponentAvatarUrl,
}: LiveChatProps) {
  const { principalText } = useAuth();
  const { data: myProfile } = useMyProfile();
  const myDisplayName = getDisplayName(myProfile, principalText);
  const myAvatarUrl = getAvatarUrl(myProfile);
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
          style={{
            background: "oklch(0.70 0.25 200)",
            boxShadow: "0 0 6px oklch(0.70 0.25 200 / 0.9)",
          }}
        />
        <span
          className="tech-text text-xs font-bold"
          style={{ color: "oklch(0.70 0.25 200)" }}
        >
          LIVE CHAT
        </span>
      </div>

      {/* Messages */}
      <div
        className="versus-chat-messages flex-1 overflow-y-auto"
        data-ocid="chat-messages"
      >
        {messages.length === 0 && (
          <p
            className="text-xs text-center py-8 tech-text"
            style={{ color: "oklch(0.38 0.04 280)" }}
          >
            No messages yet. Say hello!
          </p>
        )}
        {messages.map((msg, i) => {
          const isMe = msg.senderId.toText() === principalText;
          const senderName = isMe
            ? myDisplayName
            : (opponentName ?? `${msg.senderId.toText().slice(0, 8)}…`);
          const senderAvatar = isMe ? myAvatarUrl : (opponentAvatarUrl ?? null);

          return (
            <div
              key={`${msg.timestamp}-${i}`}
              className="versus-chat-message mb-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <MsgAvatar name={senderName} avatarUrl={senderAvatar} />
                <div className="flex items-baseline gap-2 min-w-0 flex-1">
                  <span
                    className={`text-xs font-bold truncate profile-username-display ${isMe ? "versus-chat-message-player" : "versus-chat-message-opponent"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {senderName}
                  </span>
                  <span
                    className="text-[10px] shrink-0 tech-text"
                    style={{ color: "oklch(0.35 0.03 280)" }}
                  >
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed break-words pl-8"
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
          <MsgAvatar name={myDisplayName} avatarUrl={myAvatarUrl} />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${myDisplayName}…`}
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
            className="shrink-0 rounded-lg p-2 transition-smooth btn-premium plasma-button"
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
