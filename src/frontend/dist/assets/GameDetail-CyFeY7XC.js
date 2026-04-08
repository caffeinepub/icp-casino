import { c as createLucideIcon, a as useActor, b as useQueryClient, d as useWallet, e as useIcpWallet, r as reactExports, i as useQuery, f as useMutation, j as jsxRuntimeExports, B as Button, S as Skeleton, Z as Zap, C as Coins, g as formatICP, I as Input, W as Wallet, G as GameCategory, h as createActor } from "./index-BM9RvQCW.js";
import { g as getGameImage, i as isPicsumUrl, T as TrendingUp } from "./gameImages-C7de_eG0.js";
import { A as ArrowLeft } from "./arrow-left-D4qqGckc.js";
import { U as Users } from "./users-C6OhxvZG.js";
import { S as Sparkles } from "./sparkles-59NQMK-A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const E8S_PER_ICP = 100000000n;
const PRESET_BETS = [
  { label: "1 ICP", value: 1n * E8S_PER_ICP },
  { label: "5 ICP", value: 5n * E8S_PER_ICP },
  { label: "10 ICP", value: 10n * E8S_PER_ICP },
  { label: "25 ICP", value: 25n * E8S_PER_ICP },
  { label: "100 ICP", value: 100n * E8S_PER_ICP }
];
const MIN_BET_E8S = 1000000n;
const CATEGORY_BADGE = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime"
};
const CATEGORY_LABEL = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table Games",
  [GameCategory.CardGames]: "Card Games"
};
function icpToE8s(icp) {
  const n = Number.parseFloat(icp);
  if (Number.isNaN(n) || n <= 0) return null;
  return BigInt(Math.round(n * 1e8));
}
function e8sToIcpStr(e8s) {
  return (Number(e8s) / 1e8).toString();
}
function GameHeaderSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[21/9] w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 rounded" })
    ] })
  ] });
}
function StatBadge({
  icon,
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-2 px-3 py-2 rounded-lg border ${highlight ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-muted-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide opacity-70", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm font-bold font-mono ${highlight ? "text-primary" : "text-foreground"}`,
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function GameCanvas({ outcome }) {
  if (outcome.status === "idle") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl animate-bounce", children: "🎰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Select a bet amount and press Launch Game" })
    ] });
  }
  if (outcome.status === "spinning") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["🍋", "🔔", "⭐", "💎", "🎰"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14 bg-card border border-border rounded-lg flex items-center justify-center text-2xl animate-pulse",
          children: emoji
        },
        emoji
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold animate-pulse", children: "Spinning the reels…" })
    ] });
  }
  const isWin = outcome.status === "won";
  const tx = outcome.tx;
  const amountStr = `${formatICP(tx.netAmount < 0n ? -tx.netAmount : tx.netAmount)} ICP`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-6xl ${isWin ? "animate-bounce" : ""}`, children: isWin ? "🎉" : "😔" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: `font-display text-2xl font-bold mb-1 ${isWin ? "text-win" : "text-loss"}`,
          children: isWin ? "You Won!" : "Better luck next time!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isWin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-win font-semibold", children: [
          "+",
          amountStr
        ] }),
        " added to your wallet"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-loss font-semibold", children: [
          "-",
          amountStr
        ] }),
        " ",
        "deducted from your wallet"
      ] }) })
    ] }),
    isWin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 text-primary text-xs font-semibold uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
      " Jackpot winner"
    ] })
  ] });
}
function WalletGate({
  isConnecting,
  onConnect,
  connectError
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-xl",
      style: {
        background: "linear-gradient(160deg, rgba(26,7,64,0.96) 0%, rgba(15,6,32,0.97) 100%)",
        backdropFilter: "blur(4px)",
        border: "2px solid rgba(212,175,55,0.25)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center w-14 h-14 rounded-full",
            style: {
              background: "rgba(212,175,55,0.1)",
              border: "2px solid rgba(212,175,55,0.4)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-7 h-7", style: { color: "#D4AF37" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-bold text-lg mb-1",
              style: { color: "#D4AF37" },
              children: "Connect Your Plug Wallet to Play"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#C4B5FD" }, children: "Real ICP bets only — connect to place wagers" })
        ] }),
        connectError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-center px-4 max-w-xs",
            style: { color: "#9333EA" },
            children: connectError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onConnect,
            disabled: isConnecting,
            "data-ocid": "wallet-gate-connect-btn",
            className: "px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
            style: {
              background: isConnecting ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg, oklch(0.58 0.22 265) 0%, oklch(0.48 0.22 265) 100%)",
              color: "oklch(0.97 0 0)",
              boxShadow: isConnecting ? "none" : "0 4px 20px rgba(99,102,241,0.4)"
            },
            children: isConnecting ? "Connecting…" : "Connect Wallet"
          }
        )
      ]
    }
  );
}
function GameDetail({ gameId, onBack }) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance: rawBalance, isLoading: walletLoading } = useWallet();
  const { isConnected, isConnecting, connectError, connect } = useIcpWallet();
  const [selectedBet, setSelectedBet] = reactExports.useState(PRESET_BETS[0].value);
  const [customInput, setCustomInput] = reactExports.useState("");
  const [customError, setCustomError] = reactExports.useState("");
  const [outcome, setOutcome] = reactExports.useState({ status: "idle" });
  const [localBalance, setLocalBalance] = reactExports.useState(null);
  const balance = localBalance ?? rawBalance;
  const { data: game, isLoading: gameLoading } = useQuery({
    queryKey: ["game", gameId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGame(gameId);
    },
    enabled: !!actor && !isFetching
  });
  const betMutation = useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeBet(req);
    },
    onMutate: () => {
      setOutcome({ status: "spinning" });
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        const { transaction: tx, newBalance } = result.ok;
        const isWin = tx.netAmount >= 0n;
        setLocalBalance(newBalance);
        setOutcome({ status: isWin ? "won" : "lost", tx, newBalance });
        queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      } else {
        setOutcome({ status: "idle" });
      }
    },
    onError: () => {
      setOutcome({ status: "idle" });
    }
  });
  const activeBet = customInput ? icpToE8s(customInput) ?? selectedBet : selectedBet;
  function handlePresetBet(value) {
    setSelectedBet(value);
    setCustomInput("");
    setCustomError("");
  }
  function handleCustomChange(val) {
    setCustomInput(val);
    setCustomError("");
    const e8s = icpToE8s(val);
    if (val && !e8s) {
      setCustomError("Enter a valid ICP amount");
    } else if (e8s && e8s < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
    } else if (e8s && e8s > balance) {
      setCustomError("Exceeds your wallet balance");
    }
  }
  function handleLaunch() {
    if (!isConnected) return;
    const betAmount = activeBet;
    if (betAmount < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
      return;
    }
    if (betAmount > balance) {
      setCustomError("Exceeds your wallet balance");
      return;
    }
    betMutation.mutate({ gameId, betAmount });
  }
  const isLaunching = betMutation.isPending || outcome.status === "spinning";
  const betError = customError || (activeBet > balance && balance > 0n ? "Exceeds your wallet balance" : "");
  if (gameLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-8 max-w-5xl",
        "data-ocid": "game-detail-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-2 mb-6 text-muted-foreground hover:text-foreground",
              onClick: onBack,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to Lobby"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GameHeaderSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid md:grid-cols-5 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-3 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 space-y-3", children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, k)) })
          ] })
        ]
      }
    );
  }
  if (!game) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 max-w-5xl text-center",
        "data-ocid": "game-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-4", children: "Game not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onBack, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Lobby"
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-5xl",
      "data-ocid": "game-detail-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-2 mb-6 text-muted-foreground hover:text-foreground transition-smooth",
            onClick: onBack,
            "data-ocid": "back-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to Lobby"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-card border border-border mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[21/9] md:aspect-[3/1] overflow-hidden", children: [
            (() => {
              const svgImage = getGameImage(Number(game.id));
              const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
              const src = useSvg ? svgImage : game.imageUrl;
              return src ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src,
                  alt: game.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-muted via-secondary to-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-16 h-16 text-primary/40" }) });
            })(),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: CATEGORY_BADGE[game.category], children: CATEGORY_LABEL[game.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-4xl font-bold text-foreground mt-2", children: game.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              label: "RTP",
              value: `${(game.rtp * 100).toFixed(1)}%`,
              highlight: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" }),
              label: "House Edge",
              value: `${(game.houseEdge * 100).toFixed(1)}%`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              label: "Players",
              value: Number(game.playerCount).toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "md:col-span-3 bg-card border border-border rounded-xl overflow-hidden relative",
              "data-ocid": "game-canvas",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-2.5 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-2 h-2 rounded-full animate-pulse",
                      style: { background: isConnected ? "#D4AF37" : "#6B21A8" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: isConnected ? "Live · Real ICP" : "Wallet Required" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 md:h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameCanvas, { outcome }) }),
                !isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WalletGate,
                  {
                    isConnecting,
                    onConnect: () => connect("plug"),
                    connectError
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "md:col-span-2 bg-card border border-border rounded-xl p-5 space-y-5",
              "data-ocid": "bet-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg px-4 py-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Wallet Balance" })
                  ] }),
                  walletLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono font-semibold text-foreground text-sm",
                      "data-ocid": "wallet-balance",
                      children: [
                        formatICP(balance),
                        " ICP"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5", children: "Select Bet Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: PRESET_BETS.map((preset) => {
                    const isActive = !customInput && selectedBet === preset.value;
                    const isDisabled = !isConnected || preset.value > balance && balance > 0n;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handlePresetBet(preset.value),
                        disabled: isDisabled,
                        "data-ocid": `bet-preset-${preset.label.replace(" ", "-").toLowerCase()}`,
                        className: `py-2 rounded-lg text-xs font-semibold border transition-smooth ${isActive ? "bg-primary text-primary-foreground border-primary shadow-md" : isDisabled ? "bg-muted/20 border-border text-muted-foreground/40 cursor-not-allowed" : "bg-muted/40 border-border text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"}`,
                        children: preset.label
                      },
                      preset.label
                    );
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "custom-bet",
                      className: "text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2",
                      children: "Custom Amount (ICP)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "custom-bet",
                      type: "number",
                      min: "0.01",
                      step: "0.01",
                      placeholder: `e.g. ${e8sToIcpStr(selectedBet)}`,
                      value: customInput,
                      onChange: (e) => handleCustomChange(e.target.value),
                      className: "bg-input border-border font-mono text-sm",
                      disabled: !isConnected,
                      "data-ocid": "custom-bet-input"
                    }
                  ),
                  betError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5 font-medium", children: betError })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm border-t border-border pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Placing bet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-primary text-base", children: [
                    formatICP(activeBet),
                    " ICP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md transition-smooth",
                    onClick: handleLaunch,
                    disabled: !isConnected || isLaunching || !!betError || activeBet < MIN_BET_E8S || activeBet > balance,
                    "data-ocid": "launch-game-btn",
                    children: !isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
                      " Connect Wallet to Play"
                    ] }) : isLaunching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 animate-spin" }),
                      " Spinning…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                      " Launch Game"
                    ] })
                  }
                ),
                (outcome.status === "won" || outcome.status === "lost") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg border p-4 text-center ${outcome.status === "won" ? "bg-win-muted border-win" : "bg-loss-muted border-loss"}`,
                    "data-ocid": "outcome-result",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `font-display font-bold text-lg ${outcome.status === "won" ? "text-win" : "text-loss"}`,
                          children: outcome.status === "won" ? "🎉 You Won!" : "😔 You Lost"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                        "Net:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `font-mono font-semibold ${outcome.status === "won" ? "text-win" : "text-loss"}`,
                            children: [
                              outcome.tx.netAmount >= 0n ? "+" : "",
                              formatICP(outcome.tx.netAmount),
                              " ICP"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "Balance:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-mono font-semibold",
                            style: { color: "#D4AF37" },
                            children: [
                              formatICP(outcome.newBalance),
                              " ICP"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "mt-2 text-xs text-muted-foreground hover:text-foreground",
                          onClick: () => setOutcome({ status: "idle" }),
                          "data-ocid": "play-again-btn",
                          children: "Play again"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-xs font-medium pt-1",
                    style: { color: "rgba(212,175,55,0.5)" },
                    "data-ocid": "house-edge-note",
                    children: "House edge: ~8%"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  GameDetail as default
};
