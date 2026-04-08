import { a as useActor, b as useQueryClient, d as useWallet, e as useIcpWallet, r as reactExports, f as useMutation, j as jsxRuntimeExports, C as Coins, S as Skeleton, g as formatICP, W as Wallet, h as createActor } from "./index-CHITFDq0.js";
import { A as ArrowLeft } from "./arrow-left-C37eBoze.js";
import { S as Sparkles } from "./sparkles-1o0hysJq.js";
const E8S_PER_ICP = 100000000n;
const BET_OPTIONS = [
  { label: "1 ICP", value: 1n * E8S_PER_ICP, win: "2.63 ICP" },
  { label: "3 ICP", value: 3n * E8S_PER_ICP, win: "7.89 ICP" },
  { label: "5 ICP", value: 5n * E8S_PER_ICP, win: "13.15 ICP" }
];
const SYMBOLS = ["7", "BAR", "🔔", "🍒", "🍋"];
const WIN_SYMBOL = "7";
function Reel({
  symbol,
  spinning,
  delay,
  isWin
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-24 h-28 rounded-xl overflow-hidden border-2 flex items-center justify-center",
      style: {
        borderColor: isWin ? "#D4AF37" : spinning ? "#7B2FBE" : "#4B0082",
        background: "linear-gradient(180deg, #1a0d3a 0%, #0f0620 100%)",
        boxShadow: isWin ? "0 0 24px 6px rgba(212,175,55,0.55), inset 0 0 12px rgba(212,175,55,0.15)" : spinning ? "0 0 12px 2px rgba(123,47,190,0.5)" : "inset 0 0 8px rgba(0,0,0,0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 h-6 pointer-events-none z-10",
            style: {
              background: "linear-gradient(180deg, rgba(26,13,58,0.9) 0%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 bottom-0 h-6 pointer-events-none z-10",
            style: {
              background: "linear-gradient(0deg, rgba(26,13,58,0.9) 0%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `relative z-20 font-display font-black select-none transition-all duration-300 ${spinning ? "reel-spinning" : ""}`,
            style: {
              fontSize: symbol === "BAR" ? "1.4rem" : "2.4rem",
              color: isWin ? "#D4AF37" : spinning ? "#A78BFA" : "#C4B5FD",
              textShadow: isWin ? "0 0 12px rgba(212,175,55,0.9), 0 0 24px rgba(212,175,55,0.55)" : "0 0 8px rgba(167,139,250,0.4)",
              animationDelay: `${delay}ms`
            },
            children: spinning ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : symbol
          }
        )
      ]
    }
  );
}
function WalletGateOverlay({
  isConnecting,
  onConnect,
  connectError
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-3xl",
      style: {
        background: "linear-gradient(160deg, rgba(26,7,64,0.97) 0%, rgba(15,6,32,0.98) 100%)",
        backdropFilter: "blur(6px)",
        border: "2px solid rgba(212,175,55,0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center w-16 h-16 rounded-full",
            style: {
              background: "rgba(212,175,55,0.1)",
              border: "2px solid rgba(212,175,55,0.5)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-8 h-8", style: { color: "#D4AF37" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-black text-xl mb-1",
              style: {
                color: "#D4AF37",
                textShadow: "0 0 16px rgba(212,175,55,0.6)"
              },
              children: "Connect Your Plug Wallet to Play"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#C4B5FD" }, children: "Real ICP bets only — no demo play" })
        ] }),
        connectError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-center px-6 max-w-xs",
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
            className: "px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
            style: {
              background: isConnecting ? "rgba(212,175,55,0.4)" : "linear-gradient(135deg, #D4AF37 0%, #a07830 100%)",
              color: "#1a0740",
              boxShadow: isConnecting ? "none" : "0 4px 20px rgba(212,175,55,0.5)"
            },
            children: isConnecting ? "Connecting…" : "Connect Wallet"
          }
        )
      ]
    }
  );
}
function LuckySevens({ onBack }) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance: rawBalance, isLoading: walletLoading } = useWallet();
  const { isConnected, isConnecting, connectError, connect } = useIcpWallet();
  const [selectedBet, setSelectedBet] = reactExports.useState(BET_OPTIONS[0].value);
  const [outcome, setOutcome] = reactExports.useState({ status: "idle" });
  const [reels, setReels] = reactExports.useState([
    "7",
    "BAR",
    "🍋"
  ]);
  const [spinningReels, setSpinningReels] = reactExports.useState([false, false, false]);
  const [error, setError] = reactExports.useState("");
  const [localBalance, setLocalBalance] = reactExports.useState(null);
  const stopTimers = reactExports.useRef([]);
  const balance = localBalance ?? rawBalance;
  reactExports.useEffect(() => {
    return () => {
      for (const t of stopTimers.current) clearTimeout(t);
    };
  }, []);
  const betMutation = useMutation({
    mutationFn: async (betAmount) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeLuckySevensBet(betAmount);
    },
    onMutate: () => {
      setError("");
      setOutcome({ status: "spinning" });
      setSpinningReels([true, true, true]);
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        const { transaction: tx, newBalance } = result.ok;
        const isWin = tx.netAmount >= 0n;
        const finalSymbols = isWin ? [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL] : [SYMBOLS[1], SYMBOLS[2], SYMBOLS[4]];
        for (const t of stopTimers.current) clearTimeout(t);
        stopTimers.current = [];
        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, true, true]);
            setReels((prev) => [finalSymbols[0], prev[1], prev[2]]);
          }, 600)
        );
        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, false, true]);
            setReels((prev) => [prev[0], finalSymbols[1], prev[2]]);
          }, 1100)
        );
        stopTimers.current.push(
          setTimeout(() => {
            setSpinningReels([false, false, false]);
            setReels(finalSymbols);
            setLocalBalance(newBalance);
            setOutcome({ status: isWin ? "won" : "lost", tx, newBalance });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
          }, 1700)
        );
      } else {
        setSpinningReels([false, false, false]);
        setOutcome({ status: "idle" });
        setError(result.err ?? "Bet failed. Please try again.");
      }
    },
    onError: (err) => {
      setSpinningReels([false, false, false]);
      setOutcome({ status: "idle" });
      setError(err.message ?? "An error occurred. Please try again.");
    }
  });
  function handleSpin() {
    if (!isConnected) return;
    if (selectedBet > balance) {
      setError("Insufficient balance for this bet.");
      return;
    }
    betMutation.mutate(selectedBet);
  }
  function handlePlayAgain() {
    setOutcome({ status: "idle" });
    setReels(["7", "BAR", "🍋"]);
    setError("");
  }
  const isSpinning = outcome.status === "spinning" || betMutation.isPending;
  const isWinState = outcome.status === "won";
  const isLostState = outcome.status === "lost";
  const activeBetOption = BET_OPTIONS.find((o) => o.value === selectedBet);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col items-center pb-16",
      style: {
        background: "linear-gradient(160deg, #1a0740 0%, #2d1b69 50%, #0f0620 100%)"
      },
      "data-ocid": "lucky-sevens-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-2xl px-4 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
            style: { color: "#A78BFA" },
            onMouseEnter: (e) => {
              e.currentTarget.style.color = "#D4AF37";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.color = "#A78BFA";
            },
            "data-ocid": "back-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Lobby"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 mb-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-black tracking-tight",
              style: {
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                color: "#D4AF37",
                textShadow: "0 0 20px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.35)"
              },
              children: "🎰 Lucky Sevens"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-medium", style: { color: "#A78BFA" }, children: "Match three 7s to win big · 2.63x payout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border",
            style: {
              background: "rgba(212,175,55,0.08)",
              borderColor: "rgba(212,175,55,0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4", style: { color: "#D4AF37" } }),
              walletLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono font-semibold text-sm",
                  style: { color: "#D4AF37" },
                  "data-ocid": "wallet-balance",
                  children: [
                    formatICP(balance),
                    " ICP"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-3xl p-8 w-full max-w-lg",
            style: {
              background: "linear-gradient(180deg, rgba(74,45,138,0.6) 0%, rgba(26,7,64,0.9) 100%)",
              border: "2px solid rgba(212,175,55,0.3)",
              boxShadow: "0 0 40px rgba(123,47,190,0.25), inset 0 1px 0 rgba(212,175,55,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-1 rounded-t-3xl",
                  style: {
                    background: "linear-gradient(90deg, transparent, #D4AF37, transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 mb-8", children: ["left", "center", "right"].map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Reel,
                {
                  symbol: reels[i],
                  spinning: spinningReels[i],
                  delay: i * 80,
                  isWin: isWinState
                },
                pos
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center justify-center mb-6", children: [
                isWinState && outcome.status === "won" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center animate-bounce", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-display font-black text-2xl",
                      style: {
                        color: "#D4AF37",
                        textShadow: "0 0 16px rgba(212,175,55,0.9), 0 0 32px rgba(212,175,55,0.5)"
                      },
                      "data-ocid": "win-message",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "inline w-5 h-5 mr-1" }),
                        "YOU WIN! +",
                        formatICP(outcome.tx.netAmount),
                        " ICP",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "inline w-5 h-5 ml-1" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", style: { color: "#A78BFA" }, children: [
                    "2.63x payout · Balance: ",
                    formatICP(outcome.newBalance),
                    " ICP"
                  ] })
                ] }),
                isLostState && outcome.status === "lost" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-medium text-base",
                      style: { color: "#A78BFA" },
                      "data-ocid": "loss-message",
                      children: [
                        "Better luck next time! −",
                        formatICP(
                          outcome.tx.netAmount < 0n ? -outcome.tx.netAmount : outcome.tx.betAmount
                        ),
                        " ",
                        "ICP"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "rgba(212,175,55,0.5)" },
                      children: [
                        "Balance: ",
                        formatICP(outcome.newBalance),
                        " ICP"
                      ]
                    }
                  )
                ] }),
                isSpinning && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-base animate-pulse",
                    style: { color: "#A78BFA" },
                    children: "Spinning the reels…"
                  }
                ),
                error && !isSpinning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", style: { color: "#9333EA" }, children: error })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold uppercase tracking-widest text-center mb-3",
                    style: { color: "#A78BFA" },
                    children: "Select Bet Amount"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: BET_OPTIONS.map((opt) => {
                  const isActive = selectedBet === opt.value;
                  const isDisabled = !isConnected || opt.value > balance && balance > 0n;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedBet(opt.value);
                        setError("");
                      },
                      disabled: isDisabled || isSpinning,
                      "data-ocid": `bet-option-${opt.label.replace(" ", "-").toLowerCase()}`,
                      className: "py-3 rounded-xl text-sm font-bold transition-all duration-200",
                      style: {
                        background: isActive ? "#D4AF37" : "rgba(74, 45, 138, 0.4)",
                        color: isActive ? "#1a0740" : isDisabled ? "#6B21A8" : "#C4B5FD",
                        border: isActive ? "2px solid #D4AF37" : "2px solid rgba(123,47,190,0.5)",
                        boxShadow: isActive ? "0 0 14px rgba(212,175,55,0.45)" : "none",
                        cursor: isDisabled || isSpinning ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.5 : 1
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: opt.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "block text-xs mt-0.5",
                            style: {
                              color: isActive ? "rgba(26,7,64,0.7)" : "rgba(196,181,253,0.6)",
                              fontSize: "0.65rem"
                            },
                            children: [
                              "Win: ",
                              opt.win
                            ]
                          }
                        )
                      ]
                    },
                    opt.label
                  );
                }) })
              ] }),
              outcome.status === "idle" || isSpinning ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSpin,
                  disabled: isSpinning || !isConnected || selectedBet > balance,
                  "data-ocid": "spin-btn",
                  className: "w-full py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-200",
                  style: {
                    background: isSpinning ? "rgba(212,175,55,0.4)" : "linear-gradient(135deg, #D4AF37 0%, #a07830 50%, #D4AF37 100%)",
                    color: "#1a0740",
                    boxShadow: isSpinning ? "none" : "0 4px 20px rgba(212,175,55,0.45), 0 0 40px rgba(212,175,55,0.2)",
                    cursor: isSpinning || !isConnected || selectedBet > balance ? "not-allowed" : "pointer",
                    opacity: isSpinning || !isConnected || selectedBet > balance ? 0.7 : 1,
                    border: "none"
                  },
                  children: isSpinning ? "Spinning…" : "🎰 SPIN"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePlayAgain,
                  "data-ocid": "play-again-btn",
                  className: "w-full py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-200",
                  style: {
                    background: "transparent",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    boxShadow: "0 0 14px rgba(212,175,55,0.3)",
                    cursor: "pointer"
                  },
                  children: "Play Again"
                }
              ),
              !isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                WalletGateOverlay,
                {
                  isConnecting,
                  onConnect: () => connect("plug"),
                  connectError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl",
                  style: {
                    background: "linear-gradient(90deg, transparent, rgba(123,47,190,0.8), transparent)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-6 text-xs text-center space-y-1 px-4",
            style: { color: "#7B2FBE" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1 ICP → 2.63 ICP win  ·  3 ICP → 7.89 ICP win  ·  5 ICP → 13.15 ICP win" }),
              activeBetOption && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "rgba(212,175,55,0.45)" }, children: [
                "Current bet: ",
                activeBetOption.label,
                " · Jackpot:",
                " ",
                activeBetOption.win
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "mt-3 text-xs text-center",
            style: { color: "rgba(212,175,55,0.4)" },
            "data-ocid": "house-edge-note",
            children: "House edge: ~8% · RTP 92%"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes reelSpin {
          0%   { transform: translateY(0px) scaleY(1); opacity: 1; }
          25%  { transform: translateY(-8px) scaleY(0.85); opacity: 0.6; }
          50%  { transform: translateY(0px) scaleY(1.1); opacity: 0.8; }
          75%  { transform: translateY(6px) scaleY(0.9); opacity: 0.7; }
          100% { transform: translateY(0px) scaleY(1); opacity: 1; }
        }
        .reel-spinning {
          animation: reelSpin 0.22s linear infinite;
        }
      ` })
      ]
    }
  );
}
export {
  LuckySevens as default
};
