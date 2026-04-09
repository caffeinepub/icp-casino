import { c as createLucideIcon, u as useAuth, A as useMyProfile, D as getDisplayName, E as getAvatarUrl, r as reactExports, j as jsxRuntimeExports, B as Button, J as Send, K as isEmojiAvatar, M as MatchStatus, V as VersusGameType, S as Skeleton, W as Wallet } from "./index-BRk0k6_G.js";
import { e as useSendChatMessage, f as formatTimestamp, g as useAcceptWager, w as wagerToICP$1, h as useMatch, i as useMatchChat, u as useOnlinePlayers, j as useLeaveMatch, k as useMakeChessMove, d as useHeartbeat, O as OnlinePlayersList, W as WagerSelector, l as useMakeDiceRoll, m as useMakeRPSChoice } from "./use-versus-3H4rHxf9.js";
import { T as Trophy } from "./trophy-DPOe2adu.js";
import { A as ArrowLeft } from "./arrow-left-B0uFBi7s.js";
import "./users-Cn8TUOlt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function MsgAvatar({
  name,
  avatarUrl
}) {
  const initial = name.slice(0, 1).toUpperCase();
  const hue = name.charCodeAt(0) * 137 % 360;
  const color = `oklch(0.65 0.22 ${hue})`;
  const isEmoji = isEmojiAvatar(avatarUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "profile-avatar-thumbnail shrink-0",
      style: {
        width: 24,
        height: 24,
        fontSize: 10,
        border: `1px solid ${color}40`
      },
      "aria-hidden": "true",
      children: avatarUrl && isEmoji ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 15, lineHeight: 1 }, children: avatarUrl }) : avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: initial })
    }
  );
}
function LiveChat({
  matchId,
  messages,
  opponentName,
  opponentAvatarUrl
}) {
  const { principalText } = useAuth();
  const { data: myProfile } = useMyProfile();
  const myDisplayName = getDisplayName(myProfile, principalText);
  const myAvatarUrl = getAvatarUrl(myProfile);
  const [text, setText] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const { mutate: sendMessage, isPending } = useSendChatMessage();
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || isPending) return;
    sendMessage({ matchId, message: trimmed });
    setText("");
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "versus-chat-panel h-full", "data-ocid": "live-chat-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 border-b flex items-center gap-2 shrink-0",
        style: { borderColor: "oklch(0.25 0.05 65 / 0.5)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-2 h-2 rounded-full animate-pulse",
              style: {
                background: "oklch(0.70 0.25 200)",
                boxShadow: "0 0 6px oklch(0.70 0.25 200 / 0.9)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "tech-text text-xs font-bold",
              style: { color: "oklch(0.70 0.25 200)" },
              children: "LIVE CHAT"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "versus-chat-messages flex-1 overflow-y-auto",
        "data-ocid": "chat-messages",
        children: [
          messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-center py-8 tech-text",
              style: { color: "oklch(0.38 0.04 280)" },
              children: "No messages yet. Say hello!"
            }
          ),
          messages.map((msg, i) => {
            const isMe = msg.senderId.toText() === principalText;
            const senderName = isMe ? myDisplayName : opponentName ?? `${msg.senderId.toText().slice(0, 8)}…`;
            const senderAvatar = isMe ? myAvatarUrl : opponentAvatarUrl ?? null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "versus-chat-message mb-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MsgAvatar, { name: senderName, avatarUrl: senderAvatar }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-bold truncate profile-username-display ${isMe ? "versus-chat-message-player" : "versus-chat-message-opponent"}`,
                          style: { fontSize: "0.7rem" },
                          children: senderName
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] shrink-0 tech-text",
                          style: { color: "oklch(0.35 0.03 280)" },
                          children: formatTimestamp(msg.timestamp)
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed break-words pl-8",
                      style: { color: "oklch(0.88 0.02 65)" },
                      children: msg.message
                    }
                  )
                ]
              },
              `${msg.timestamp}-${i}`
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "versus-chat-input shrink-0", "data-ocid": "chat-input-area", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MsgAvatar, { name: myDisplayName, avatarUrl: myAvatarUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: `${myDisplayName}…`,
          maxLength: 200,
          className: "flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-smooth min-w-0",
          style: {
            background: "oklch(0.14 0.02 45)",
            border: "1px solid oklch(0.25 0.05 65 / 0.5)",
            color: "oklch(0.92 0.02 65)"
          },
          "data-ocid": "chat-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: handleSend,
          disabled: !text.trim() || isPending,
          className: "shrink-0 rounded-lg p-2 transition-smooth btn-premium plasma-button",
          style: {
            background: "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
            color: "oklch(0.97 0 0)",
            border: "none"
          },
          "data-ocid": "chat-send-btn",
          "aria-label": "Send message",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] }) })
  ] });
}
function WagerLabel({ wager }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "font-mono font-bold",
      style: { color: "oklch(0.82 0.14 65)" },
      children: [
        wagerToICP$1(wager),
        " ICP"
      ]
    }
  );
}
function MatchStatusCard({ match, onLeave }) {
  var _a, _b, _c;
  const { principalText } = useAuth();
  const { mutate: acceptWager, isPending: isAccepting } = useAcceptWager();
  const myId = principalText;
  const myPlayer = match.player1.id.toText() === myId ? match.player1 : ((_a = match.player2) == null ? void 0 : _a.id.toText()) === myId ? match.player2 : null;
  const isWinner = ((_b = match.winnerId) == null ? void 0 : _b.toText()) === myId;
  const isLoser = match.status === MatchStatus.Completed && match.winnerId !== void 0 && match.winnerId.toText() !== myId;
  if (match.status === MatchStatus.Completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "match-result", children: [
      isWinner ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "versus-winner-card text-center",
          "data-ocid": "winner-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Trophy,
              {
                className: "w-10 h-10 mx-auto mb-3",
                style: { color: "oklch(0.72 0.18 65)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-3xl font-bold",
                style: { color: "oklch(0.82 0.14 65)" },
                children: "Winner!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm mt-2",
                style: { color: "oklch(0.65 0.04 280)" },
                children: [
                  "You won ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(WagerLabel, { wager: match.wager }),
                  " × 2"
                ]
              }
            )
          ]
        }
      ) : isLoser ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "versus-loser-card text-center", "data-ocid": "loser-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleX,
          {
            className: "w-10 h-10 mx-auto mb-3",
            style: { color: "oklch(0.55 0.12 300)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display text-3xl font-bold",
            style: { color: "oklch(0.55 0.12 300)" },
            children: "Defeated"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm mt-2",
            style: { color: "oklch(0.45 0.05 300)" },
            children: "Better luck next time"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-lg p-6 border text-center",
          style: {
            background: "oklch(0.13 0.03 290)",
            borderColor: "oklch(0.25 0.05 65 / 0.4)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: "Match Ended" })
        }
      ),
      onLeave && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onLeave,
          variant: "outline",
          className: "w-full transition-smooth",
          style: {
            borderColor: "oklch(0.72 0.18 65 / 0.5)",
            color: "oklch(0.82 0.14 65)"
          },
          "data-ocid": "leave-match-btn",
          children: "Back to Lobby"
        }
      )
    ] });
  }
  if (match.status === MatchStatus.WaitingForOpponent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "waiting-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg p-6 border text-center space-y-4",
          style: {
            background: "oklch(0.10 0.03 290)",
            borderColor: "oklch(0.25 0.05 65 / 0.35)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "versus-spinner mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-lg font-semibold",
                style: { color: "oklch(0.72 0 0)" },
                children: "Searching for Opponent…"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "oklch(0.50 0.03 280)" }, children: [
              "Wager: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(WagerLabel, { wager: match.wager })
            ] })
          ]
        }
      ),
      onLeave && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onLeave,
          variant: "outline",
          className: "w-full transition-smooth",
          style: {
            borderColor: "oklch(0.25 0.05 65 / 0.5)",
            color: "oklch(0.60 0.03 65)"
          },
          "data-ocid": "cancel-match-btn",
          children: "Cancel"
        }
      )
    ] });
  }
  if (match.status === MatchStatus.WagerPending) {
    const hasAccepted = (myPlayer == null ? void 0 : myPlayer.wagerAccepted) ?? false;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "wager-pending-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg p-5 border space-y-3",
          style: {
            background: "oklch(0.10 0.03 290)",
            borderColor: "oklch(0.72 0.18 65 / 0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Clock,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.72 0.18 65)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm font-display font-semibold uppercase tracking-wide",
                  style: { color: "oklch(0.72 0.18 65)" },
                  children: "Wager Agreement"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "oklch(0.62 0.04 280)" }, children: [
              "Both players must agree to wager ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(WagerLabel, { wager: match.wager }),
              " ",
              "each. Winner takes",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono font-bold",
                  style: { color: "oklch(0.82 0.14 65)" },
                  children: [
                    wagerToICP$1(match.wager) * 2,
                    " ICP"
                  ]
                }
              ),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 text-xs",
                style: { color: "oklch(0.58 0.04 280)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheckBig,
                      {
                        className: "w-3.5 h-3.5",
                        style: {
                          color: match.player1.wagerAccepted ? "oklch(0.72 0.18 65)" : "oklch(0.30 0.02 65)"
                        }
                      }
                    ),
                    "Player 1"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheckBig,
                      {
                        className: "w-3.5 h-3.5",
                        style: {
                          color: ((_c = match.player2) == null ? void 0 : _c.wagerAccepted) ? "oklch(0.72 0.18 65)" : "oklch(0.30 0.02 65)"
                        }
                      }
                    ),
                    "Player 2"
                  ] })
                ]
              }
            )
          ]
        }
      ),
      !hasAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => acceptWager(match.id),
          disabled: isAccepting,
          className: "w-full font-semibold transition-smooth",
          style: {
            background: "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
            color: "oklch(0.97 0 0)",
            border: "none"
          },
          "data-ocid": "accept-wager-btn",
          children: isAccepting ? "Accepting…" : `Accept — ${wagerToICP$1(match.wager)} ICP`
        }
      ),
      hasAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-center",
          style: { color: "oklch(0.58 0.04 280)" },
          children: "Waiting for opponent to accept…"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg px-5 py-4 border flex items-center gap-3",
      style: {
        background: "oklch(0.10 0.03 290)",
        borderColor: "oklch(0.72 0.18 65 / 0.35)"
      },
      "data-ocid": "active-match-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-2.5 h-2.5 rounded-full animate-pulse shrink-0",
            style: { background: "oklch(0.72 0.18 65)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold",
              style: { color: "oklch(0.82 0.14 65)" },
              children: "Match Active"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "oklch(0.50 0.03 280)" }, children: [
            "Pot: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(WagerLabel, { wager: match.wager }),
            " × 2"
          ] })
        ] })
      ]
    }
  );
}
function resolveOnlinePlayerName(player) {
  if (player.username) return player.username;
  return `Player_${player.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}`;
}
function resolveOnlinePlayerAvatar(player) {
  return player.avatarUrl ?? null;
}
function wagerToICP(wager) {
  if (wager === "Ten") return 10;
  if (wager === "Thirty") return 30;
  return 100;
}
function PlugWalletBanner({ compact = false }) {
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold",
        style: {
          background: "oklch(0.45 0.15 300 / 0.20)",
          border: "1px solid oklch(0.45 0.15 300 / 0.45)",
          color: "oklch(0.78 0.15 300)"
        },
        "data-ocid": "plug-wallet-badge",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3 h-3" }),
          "Playing with Plug Wallet"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card flex items-center gap-3 px-4 py-3 rounded-xl border",
      style: {
        borderColor: "oklch(0.72 0.18 65 / 0.50)",
        boxShadow: "0 0 20px oklch(0.72 0.18 65 / 0.12)"
      },
      "data-ocid": "plug-wallet-notice",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Wallet,
          {
            className: "w-5 h-5 shrink-0",
            style: { color: "oklch(0.82 0.14 65)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm font-semibold",
            style: { color: "oklch(0.82 0.14 65)" },
            children: [
              "Please use",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.15 300)" }, children: "Plug Wallet" }),
              " to connect and play Versus Mode.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.04 280)" }, children: "Plug Wallet is required for real ICP betting." })
            ]
          }
        )
      ]
    }
  );
}
function WagerPanel({
  wagerICP,
  pending,
  matchId,
  myId,
  player1Id,
  pendingWager
}) {
  const { mutate: acceptWager, isPending: isAccepting } = useAcceptWager();
  const potICP = wagerICP * 2;
  const isPlayer2 = myId !== null && myId !== player1Id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-2xl border-2 p-6 flex flex-col gap-5${!pending ? " versus-wager-panel-active" : ""}`,
      style: {
        background: "linear-gradient(135deg, oklch(0.12 0.04 300 / 0.50), oklch(0.10 0.02 65 / 0.40))",
        borderColor: "oklch(0.72 0.18 65 / 0.65)",
        boxShadow: "0 0 32px oklch(0.72 0.18 65 / 0.20), 0 0 10px oklch(0.72 0.18 65 / 0.12), var(--shadow-xl)"
      },
      "data-ocid": "wager-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-bold uppercase tracking-widest",
              style: { color: "oklch(0.58 0.03 280)" },
              children: pending ? "Proposed Wager" : "Active Wager"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlugWalletBanner, { compact: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-4xl font-bold leading-none icp-value",
                style: {
                  color: "oklch(0.87 0.14 65)",
                  textShadow: "0 0 20px oklch(0.72 0.18 65 / 0.50), 0 2px 4px oklch(0 0 0 / 0.60)"
                },
                children: wagerICP
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold mt-1.5",
                style: { color: "oklch(0.58 0.03 280)" },
                children: "ICP each"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-2xl font-black",
              style: {
                color: "oklch(0.45 0.15 300 / 0.80)",
                textShadow: "0 0 12px oklch(0.45 0.15 300 / 0.40)"
              },
              children: "×2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-4xl font-bold leading-none icp-value",
                style: {
                  color: "oklch(0.85 0.14 65)",
                  textShadow: "0 0 24px oklch(0.72 0.18 65 / 0.55), 0 2px 4px oklch(0 0 0 / 0.60)"
                },
                children: potICP
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold mt-1.5",
                style: { color: "oklch(0.72 0.15 300)" },
                children: "Total Pot"
              }
            )
          ] })
        ] }),
        pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-3 border-t pt-4",
            style: { borderColor: "oklch(0.72 0.18 65 / 0.20)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-semibold",
                  style: { color: "oklch(0.78 0.14 65)" },
                  children: "Wager proposed by opponent — confirm amount to start:"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WagerSelector, { selected: pendingWager, onChange: () => {
              }, disabled: true }),
              isPlayer2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => acceptWager(matchId),
                  disabled: isAccepting,
                  className: "w-full font-bold btn-premium",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                    color: "oklch(0.97 0 0)",
                    border: "none",
                    boxShadow: "0 4px 20px oklch(0.55 0.22 265 / 0.40)"
                  },
                  "data-ocid": "accept-wager-btn",
                  children: isAccepting ? "Confirming…" : `Accept ${wagerICP} ICP Wager`
                }
              ),
              !isPlayer2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-center",
                  style: { color: "oklch(0.54 0.03 280)" },
                  children: "Waiting for opponent to accept this wager…"
                }
              )
            ]
          }
        ),
        !pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs font-bold",
            style: { color: "oklch(0.78 0.14 65)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2.5 h-2.5 rounded-full inline-block animate-pulse",
                  style: {
                    background: "oklch(0.78 0.14 65)",
                    boxShadow: "0 0 8px oklch(0.72 0.18 65 / 0.90), 0 0 16px oklch(0.72 0.18 65 / 0.45)"
                  }
                }
              ),
              "Wager locked — winner takes ",
              potICP,
              " ICP"
            ]
          }
        )
      ]
    }
  );
}
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
const PIECE_SYMBOLS = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
};
function parseBoard(fen) {
  const board = {};
  const rows = fen.split("/");
  rows.forEach((row, ri) => {
    const rank = 8 - ri;
    let file = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        file += Number.parseInt(ch, 10);
      } else {
        board[`${FILES[file]}${rank}`] = ch;
        file++;
      }
    }
  });
  return board;
}
function ChessBoard({
  fen,
  myTurn,
  onMove
}) {
  const [selected, setSelected] = reactExports.useState(null);
  const board = parseBoard(fen.split(" ")[0]);
  function handleSquare(sq) {
    if (!myTurn) return;
    if (selected) {
      if (selected === sq) {
        setSelected(null);
      } else {
        onMove(selected, sq);
        setSelected(null);
      }
    } else if (board[sq]) {
      setSelected(sq);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card w-full max-w-lg mx-auto select-none rounded-2xl p-4",
      style: {
        borderColor: "oklch(0.72 0.18 65 / 0.30)",
        boxShadow: "var(--shadow-xl), 0 0 40px oklch(0.72 0.18 65 / 0.10)"
      },
      "data-ocid": "chess-board",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex pl-6 mb-1", children: FILES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 text-center text-xs",
            style: { color: "oklch(0.54 0.03 280)" },
            children: f
          },
          f
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-around pr-2", children: RANKS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-12 flex items-center text-xs",
              style: { color: "oklch(0.54 0.03 280)" },
              children: r
            },
            r
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-8 flex-1 rounded-lg overflow-hidden border",
              style: {
                borderColor: "oklch(0.72 0.18 65 / 0.25)",
                boxShadow: "0 0 0 1px oklch(0.72 0.18 65 / 0.10)"
              },
              children: RANKS.flatMap(
                (rank) => FILES.map((file) => {
                  const sq = `${file}${rank}`;
                  const isLight = (FILES.indexOf(file) + rank) % 2 === 1;
                  const piece = board[sq];
                  const isSelected = selected === sq;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleSquare(sq),
                      className: "h-12 flex items-center justify-center text-2xl transition-smooth focus-visible:ring-2 focus-visible:ring-primary",
                      style: {
                        background: isSelected ? "oklch(0.72 0.18 65 / 0.50)" : isLight ? "oklch(0.24 0.04 300 / 0.70)" : "oklch(0.12 0.02 300 / 0.60)",
                        cursor: myTurn ? "pointer" : "default",
                        boxShadow: isSelected ? "inset 0 0 12px oklch(0.72 0.18 65 / 0.30)" : void 0
                      },
                      "aria-label": `${sq}${piece ? ` ${PIECE_SYMBOLS[piece] ?? piece}` : ""}`,
                      children: piece ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: piece === piece.toUpperCase() ? "oklch(0.85 0.14 65)" : "oklch(0.50 0.18 300)",
                            textShadow: piece === piece.toUpperCase() ? "0 1px 6px oklch(0 0 0 / 0.70), 0 0 10px oklch(0.72 0.18 65 / 0.30)" : "0 1px 6px oklch(0 0 0 / 0.70)",
                            lineHeight: 1
                          },
                          children: PIECE_SYMBOLS[piece] ?? piece
                        }
                      ) : null
                    },
                    sq
                  );
                })
              )
            }
          )
        ] }),
        !myTurn && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-sm mt-3",
            style: { color: "oklch(0.58 0.03 280)" },
            children: "Waiting for opponent's move…"
          }
        )
      ]
    }
  );
}
function DiceGame({
  state,
  matchId,
  canRoll
}) {
  const { mutate: roll, isPending } = useMakeDiceRoll();
  const diceState = state.__kind__ === "DiceRoll" ? state.DiceRoll : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-8 py-8",
      "data-ocid": "dice-game",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-10", children: [
          { roll: diceState == null ? void 0 : diceState.player1Roll, label: "Player 1", isGold: true },
          { roll: diceState == null ? void 0 : diceState.player2Roll, label: "Player 2", isGold: false }
        ].map(({ roll: roll2, label, isGold }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-mono font-black border-2 card-shimmer",
              style: {
                background: isGold ? "linear-gradient(135deg, oklch(0.14 0.04 290 / 0.80), oklch(0.10 0.03 290))" : "linear-gradient(135deg, oklch(0.14 0.04 300 / 0.60), oklch(0.10 0.02 300 / 0.50))",
                borderColor: isGold ? "oklch(0.72 0.18 65 / 0.55)" : "oklch(0.45 0.15 300 / 0.55)",
                color: isGold ? "oklch(0.85 0.14 65)" : "oklch(0.78 0.15 300)",
                boxShadow: isGold ? "0 0 20px oklch(0.72 0.18 65 / 0.20), var(--shadow-md)" : "0 0 20px oklch(0.45 0.15 300 / 0.20), var(--shadow-md)",
                textShadow: isGold ? "0 0 12px oklch(0.72 0.18 65 / 0.50)" : void 0
              },
              children: roll2 != null ? String(roll2) : "?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-semibold mt-2",
              style: { color: "oklch(0.58 0.03 280)" },
              children: label
            }
          )
        ] }, label)) }),
        canRoll && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => roll(matchId),
            disabled: isPending,
            className: "font-bold btn-premium px-10 py-3 text-base",
            style: {
              background: "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
              boxShadow: "0 4px 20px oklch(0.55 0.22 265 / 0.40)"
            },
            "data-ocid": "roll-dice-btn",
            children: isPending ? "Rolling…" : "🎲 Roll Dice"
          }
        )
      ]
    }
  );
}
const RPS_CHOICES = [
  { value: "Rock", emoji: "✊" },
  { value: "Paper", emoji: "✋" },
  { value: "Scissors", emoji: "✌️" }
];
function RPSGame({
  state,
  matchId,
  canPlay
}) {
  const { mutate: choose, isPending } = useMakeRPSChoice();
  const [myChoice, setMyChoice] = reactExports.useState(null);
  const rpsState = state.__kind__ === "RPS" ? state.RPS : null;
  function handleChoice(choice) {
    if (!canPlay || isPending) return;
    setMyChoice(choice);
    choose({ matchId, choice });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-8 py-8",
      "data-ocid": "rps-game",
      children: [
        (rpsState == null ? void 0 : rpsState.player1Choice) || (rpsState == null ? void 0 : rpsState.player2Choice) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-8 text-5xl", children: [
          { choice: rpsState.player1Choice, label: "Player 1" },
          { choice: rpsState.player2Choice, label: "Player 2" }
        ].map(({ choice, label }) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: ((_a = RPS_CHOICES.find((c) => c.value === choice)) == null ? void 0 : _a.emoji) ?? "🤔" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-2 font-semibold",
                style: { color: "oklch(0.58 0.03 280)" },
                children: choice ?? "Choosing…"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[10px] mt-0.5",
                style: { color: "oklch(0.45 0.03 280)" },
                children: label
              }
            )
          ] }, label);
        }) }) : null,
        canPlay && !myChoice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: RPS_CHOICES.map(({ value, emoji }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleChoice(value),
            disabled: isPending,
            className: "w-24 h-24 rounded-2xl text-4xl flex items-center justify-center border-2 transition-smooth hover:scale-110 card-shimmer",
            style: {
              background: "linear-gradient(135deg, oklch(0.14 0.04 290 / 0.70), oklch(0.10 0.03 290))",
              borderColor: "oklch(0.72 0.18 65 / 0.45)",
              boxShadow: "0 4px 16px oklch(0 0 0 / 0.50)"
            },
            "data-ocid": `rps-choice-${value.toLowerCase()}`,
            "aria-label": value,
            children: emoji
          },
          value
        )) }),
        myChoice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm text-premium",
            style: { color: "oklch(0.58 0.03 280)" },
            children: [
              "You chose ",
              myChoice,
              ". Waiting for opponent…"
            ]
          }
        )
      ]
    }
  );
}
function OpponentCard({
  name,
  avatarUrl
}) {
  const initial = name.slice(0, 1).toUpperCase();
  const hue = name.charCodeAt(0) * 137 % 360;
  const color = `oklch(0.65 0.22 ${hue})`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs",
      style: { borderColor: "oklch(0.72 0.18 65 / 0.25)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "profile-avatar-thumbnail shrink-0",
            style: {
              width: 28,
              height: 28,
              fontSize: 11,
              border: `1px solid ${color}60`,
              boxShadow: `0 0 6px ${color}40`
            },
            "aria-hidden": "true",
            children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: initial })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-bold text-gold-glow",
            style: { color: "oklch(0.82 0.14 65)" },
            children: "You"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-black text-sm",
            style: { color: "oklch(0.45 0.15 300 / 0.80)" },
            children: "⚔"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "profile-username-display",
            style: { color: "oklch(0.72 0.15 300)" },
            children: name
          }
        )
      ]
    }
  );
}
function VersusMatch({ matchId, onBack }) {
  const { principalText, isAuthenticated } = useAuth();
  const { data: myProfile } = useMyProfile();
  const myDisplayName = getDisplayName(myProfile, principalText);
  const myAvatarUrl = getAvatarUrl(myProfile);
  const { data: match, isLoading } = useMatch(matchId);
  const { data: chatMessages = [] } = useMatchChat(matchId);
  const { data: onlinePlayers = [] } = useOnlinePlayers();
  const { mutate: leaveMatch } = useLeaveMatch();
  const { mutate: makeMove } = useMakeChessMove();
  useHeartbeat();
  function handleLeave() {
    leaveMatch(matchId);
    onBack();
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-96 gap-6 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlugWalletBanner, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onBack, variant: "outline", "data-ocid": "back-btn", children: "Back to Lobby" })
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[calc(100vh-4rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "versus-spinner" }) }) });
  }
  if (!match) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-96 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "oklch(0.58 0.03 280)" }, children: "Match not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onBack, variant: "outline", "data-ocid": "back-btn", children: "Back to Lobby" })
    ] });
  }
  const myId = principalText;
  const isMyTurn = match.gameState.__kind__ === "Chess" ? match.gameState.Chess.currentTurn.toText() === myId : true;
  const opponentPlayer = match.player1.id.toText() === myId ? match.player2 : match.player1;
  const opponentOnlineEntry = opponentPlayer ? onlinePlayers.find(
    (p) => p.id.toText() === opponentPlayer.id.toText()
  ) : void 0;
  const opponentName = opponentOnlineEntry ? resolveOnlinePlayerName(opponentOnlineEntry) : opponentPlayer ? `Player_${opponentPlayer.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}` : "Opponent";
  const opponentAvatarUrl = opponentOnlineEntry ? resolveOnlinePlayerAvatar(opponentOnlineEntry) : null;
  const wagerICP = wagerToICP(match.wager);
  const isWagerPending = match.status === MatchStatus.WagerPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-[calc(100vh-4rem)] overflow-hidden",
      style: {
        background: "radial-gradient(ellipse at 50% 20%, oklch(0.13 0.03 300 / 0.45) 0%, oklch(0.07 0 0) 65%)"
      },
      "data-ocid": "versus-match",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-dark flex items-center justify-between px-4 py-3 border-b shrink-0",
              style: { borderColor: "oklch(0.72 0.18 65 / 0.18)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: onBack,
                    className: "flex items-center gap-2 text-sm transition-smooth btn-premium px-3 py-1.5 rounded-lg",
                    style: {
                      color: "oklch(0.66 0.04 280)",
                      border: "1px solid oklch(0.25 0.05 65 / 0.40)"
                    },
                    "data-ocid": "back-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                      "Lobby"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-display font-bold heading-cinematic",
                    style: { color: "oklch(0.82 0.03 65)" },
                    children: match.gameType === VersusGameType.Chess ? "Chess" : match.gameType === VersusGameType.DiceRoll ? "Dice Roll" : "Rock Paper Scissors"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(OpponentCard, { name: opponentName, avatarUrl: opponentAvatarUrl })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-4 py-2 border-b",
              style: {
                borderColor: "oklch(0.65 0.25 265 / 0.15)",
                background: "oklch(0.12 0.02 290 / 0.4)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "profile-avatar-thumbnail shrink-0",
                    style: {
                      width: 20,
                      height: 20,
                      fontSize: 9,
                      border: "1px solid oklch(0.65 0.25 265 / 0.4)"
                    },
                    "aria-hidden": "true",
                    children: myAvatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: myAvatarUrl, alt: myDisplayName }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.25 265)" }, children: myDisplayName.slice(0, 1).toUpperCase() })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "profile-username-display text-xs",
                    style: { color: "oklch(0.75 0.15 265)", fontSize: "0.68rem" },
                    children: [
                      "Playing as ",
                      myDisplayName
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WagerPanel,
              {
                wagerICP,
                pending: isWagerPending,
                matchId,
                myId,
                player1Id: match.player1.id.toText(),
                pendingWager: match.wager
              }
            ),
            match.status !== MatchStatus.Active ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-sm mx-auto mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchStatusCard, { match, onLeave: handleLeave }) }) : match.gameType === VersusGameType.Chess && match.gameState.__kind__ === "Chess" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChessBoard,
              {
                fen: match.gameState.Chess.board,
                myTurn: isMyTurn,
                onMove: (from, to) => makeMove({ matchId, from, to })
              }
            ) : match.gameType === VersusGameType.DiceRoll ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              DiceGame,
              {
                state: match.gameState,
                matchId,
                canRoll: isMyTurn
              }
            ) : match.gameType === VersusGameType.RockPaperScissors ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              RPSGame,
              {
                state: match.gameState,
                matchId,
                canPlay: isMyTurn
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full max-w-lg rounded-xl" }) }),
            match.status === MatchStatus.Completed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-sm mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchStatusCard, { match, onLeave: handleLeave }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-80 glass-dark flex flex-col border-l",
            style: { borderColor: "oklch(0.72 0.18 65 / 0.18)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                LiveChat,
                {
                  matchId,
                  messages: chatMessages,
                  opponentName,
                  opponentAvatarUrl
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border-t shrink-0 max-h-64 overflow-y-auto",
                  style: { borderColor: "oklch(0.72 0.18 65 / 0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    OnlinePlayersList,
                    {
                      players: onlinePlayers.slice(0, 5),
                      isLoading: false
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  VersusMatch as default
};
