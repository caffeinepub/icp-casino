import { u as useActor, a as useQueryClient, b as useWallet, c as useIcpWallet, r as reactExports, d as useMutation, j as jsxRuntimeExports, C as Coins, S as Skeleton, f as formatICP, W as Wallet, e as createActor } from "./index-C9sdOjo0.js";
import { A as ArrowLeft } from "./arrow-left-Dut_R6wb.js";
import { S as Sparkles } from "./sparkles-C4dqwHzU.js";
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
      className: `relative flex-shrink-0 cyber-border ${isWin ? "neon-glow" : ""}`,
      style: {
        width: 96,
        height: 120,
        borderRadius: 12,
        overflow: "hidden",
        /* Multi-layer metallic border effect */
        border: isWin ? "2px solid #D4AF37" : "2px solid rgba(180, 130, 40, 0.5)",
        outline: isWin ? "1px solid rgba(255, 220, 100, 0.3)" : "1px solid rgba(100, 60, 140, 0.3)",
        /* 3D depth illusion with box-shadow — plasma-ring on spinning */
        boxShadow: isWin ? "0 0 32px 8px rgba(212,175,55,0.65), 0 0 60px rgba(212,175,55,0.3), inset 0 2px 4px rgba(255,220,100,0.2), inset 0 -2px 4px rgba(80,20,100,0.4)" : spinning ? "0 0 0 0 oklch(0.55 0.25 265 / 0.6), 0 0 20px 6px oklch(0.70 0.25 200 / 0.5), inset 0 2px 4px rgba(180,130,255,0.1)" : "inset 0 2px 8px rgba(0,0,0,0.7), inset 0 -2px 4px rgba(80,20,100,0.35), 0 2px 6px rgba(0,0,0,0.5)",
        /* Deep glass window feel */
        background: "radial-gradient(ellipse at 50% 30%, rgba(45,25,80,0.9) 0%, rgba(15,6,32,0.98) 65%, rgba(26,13,58,1) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 z-20 pointer-events-none",
            style: {
              height: 28,
              background: "linear-gradient(180deg, rgba(10,4,24,0.92) 0%, rgba(10,4,24,0.50) 60%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 bottom-0 z-20 pointer-events-none",
            style: {
              height: 28,
              background: "linear-gradient(0deg, rgba(10,4,24,0.92) 0%, rgba(10,4,24,0.50) 60%, transparent 100%)"
            }
          }
        ),
        isWin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-10 pointer-events-none shimmer-overlay rounded-xl",
            style: { opacity: 0.5 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 z-10 pointer-events-none",
            style: {
              top: "50%",
              height: 2,
              marginTop: -1,
              background: "linear-gradient(90deg, transparent, oklch(0.70 0.25 200 / 0.6), rgba(212,175,55,0.35), oklch(0.70 0.25 200 / 0.6), transparent)",
              boxShadow: "0 0 6px 1px oklch(0.70 0.25 200 / 0.4), 0 0 12px 2px oklch(0.65 0.25 265 / 0.25)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-30 h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display font-black select-none transition-all duration-300 ${spinning ? "reel-spinning" : ""} ${isWin ? "scale-110" : ""}`,
            style: {
              fontSize: symbol === "BAR" ? "1.7rem" : "3.2rem",
              lineHeight: 1,
              color: isWin ? "#D4AF37" : spinning ? "#A78BFA" : symbol === "7" ? "#D4AF37" : "#C4B5FD",
              textShadow: isWin ? "0 0 14px rgba(212,175,55,1), 0 0 28px rgba(212,175,55,0.7), 0 0 48px rgba(212,175,55,0.45), 0 2px 4px rgba(0,0,0,0.8)" : symbol === "7" ? "0 0 10px rgba(212,175,55,0.7), 0 0 20px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.8)" : "0 0 8px rgba(167,139,250,0.5), 0 2px 4px rgba(0,0,0,0.8)",
              filter: isWin ? "drop-shadow(0 0 6px rgba(212,175,55,0.9))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
              animationDelay: `${delay}ms`,
              transform: spinning ? void 0 : isWin ? "scale(1.08)" : "scale(1)"
            },
            children: spinning ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : symbol
          }
        ) })
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
      className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-3xl futuristic-panel",
      style: {
        background: "linear-gradient(160deg, rgba(20,6,55,0.97) 0%, rgba(10,3,28,0.98) 100%)",
        backdropFilter: "blur(8px)",
        border: "2px solid rgba(212,175,55,0.35)",
        boxShadow: "inset 0 1px 0 rgba(212,175,55,0.2)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center w-16 h-16 rounded-full relative z-10",
            style: {
              background: "rgba(212,175,55,0.1)",
              border: "2px solid rgba(212,175,55,0.6)",
              boxShadow: "0 0 20px rgba(212,175,55,0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-8 h-8", style: { color: "#D4AF37" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-8 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "heading-cinematic text-xl mb-1 text-gold-glow",
              style: { color: "#D4AF37" },
              children: "Connect Your Plug Wallet to Play"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#C4B5FD" }, children: "Real ICP bets only — no demo play" })
        ] }),
        connectError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-center px-6 max-w-xs relative z-10",
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
            className: "btn-premium plasma-button px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed relative z-10",
            style: {
              background: isConnecting ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg, oklch(0.62 0.22 265) 0%, oklch(0.52 0.22 265) 50%, oklch(0.44 0.22 265) 100%)",
              color: "oklch(0.97 0 0)",
              boxShadow: isConnecting ? "none" : "0 4px 24px rgba(99,102,241,0.55), 0 2px 0 rgba(70,58,180,0.8), inset 0 1px 0 rgba(180,185,255,0.3)"
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
        /* Deep radial vignette — dark purple center fading to near-black edges */
        background: "radial-gradient(ellipse at 50% 35%, rgba(38,14,85,1) 0%, rgba(22,8,52,0.95) 40%, rgba(8,3,20,1) 100%)"
      },
      "data-ocid": "lucky-sevens-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-2xl px-4 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "heading-cinematic flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 mb-2 text-center px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "tech-text text-xs mb-3",
              style: { color: "oklch(0.70 0.25 200 / 0.6)" },
              children: "// SLOT PROTOCOL 7"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "heading-cinematic text-gold-glow glitch-text tech-text",
              style: {
                fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
                background: "linear-gradient(135deg, #e8d070 0%, #D4AF37 45%, #f0d878 60%, #c09428 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              },
              children: "🎰 Lucky Sevens"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 text-sm font-semibold tracking-widest uppercase tech-text",
              style: { color: "#A78BFA", letterSpacing: "0.18em" },
              children: "Match three 7s to win big · 2.63× payout"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 px-6 py-2.5 rounded-full mb-8 cyber-border tech-text",
            style: {
              background: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(123,47,190,0.10) 100%)",
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow: "0 0 16px rgba(212,175,55,0.2), 0 0 8px oklch(0.70 0.25 200 / 0.15), inset 0 1px 0 rgba(255,220,100,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4", style: { color: "#D4AF37" } }),
              walletLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono font-semibold text-sm text-gold-glow wallet-balance",
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
            className: "relative rounded-3xl w-full max-w-lg futuristic-panel cyber-grid-bg",
            style: {
              /* Beveled metallic outer casing */
              background: "linear-gradient(160deg, rgba(55,28,100,0.85) 0%, rgba(20,8,48,0.95) 50%, rgba(10,3,25,1) 100%)",
              borderTop: "2px solid rgba(212,175,55,0.7)",
              borderLeft: "2px solid rgba(212,175,55,0.45)",
              borderRight: "1px solid rgba(100,60,30,0.5)",
              borderBottom: "1px solid rgba(80,40,10,0.6)",
              boxShadow: [
                /* Outer purple ambient glow */
                "0 0 60px 8px rgba(123,47,190,0.25)",
                /* Neon indigo outer glow */
                "0 0 40px 4px oklch(0.65 0.25 265 / 0.18)",
                /* Outer gold rim glow */
                "0 0 30px 2px rgba(212,175,55,0.18)",
                /* Hard depth shadow */
                "0 20px 60px rgba(0,0,0,0.8)",
                "0 8px 24px rgba(0,0,0,0.6)",
                /* Inner top-edge gold highlight (beveled feel) */
                "inset 0 2px 0 rgba(255,220,100,0.25)",
                "inset 0 -2px 0 rgba(60,20,80,0.6)"
              ].join(", "),
              padding: "2rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cinematic-top-light", style: { zIndex: 2 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-5 py-1 rounded-full text-xs font-black uppercase tracking-widest tech-text cyber-border",
                  style: {
                    background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(123,47,190,0.15))",
                    border: "1px solid rgba(212,175,55,0.35)",
                    color: "#D4AF37",
                    letterSpacing: "0.22em"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⬦" }),
                    " CLASSIC SLOTS ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⬦" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center justify-center gap-4 mb-3 p-4 rounded-2xl scanline-overlay relative z-10",
                  style: {
                    background: "linear-gradient(180deg, rgba(8,3,20,0.95) 0%, rgba(15,6,35,0.9) 100%)",
                    border: "1px solid rgba(100,60,160,0.4)",
                    boxShadow: "inset 0 4px 16px rgba(0,0,0,0.8), inset 0 -2px 8px rgba(60,20,100,0.3), 0 0 16px oklch(0.65 0.25 265 / 0.1)"
                  },
                  children: ["left", "center", "right"].map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Reel,
                    {
                      symbol: reels[i],
                      spinning: spinningReels[i],
                      delay: i * 80,
                      isWin: isWinState
                    },
                    pos
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center mb-6 relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 1,
                      flex: 1,
                      background: "linear-gradient(90deg, transparent, oklch(0.70 0.25 200 / 0.5))",
                      boxShadow: "0 0 4px oklch(0.70 0.25 200 / 0.3)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold uppercase tracking-widest tech-text",
                    style: { color: "rgba(212,175,55,0.5)" },
                    children: "PAYLINE"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 1,
                      flex: 1,
                      background: "linear-gradient(90deg, oklch(0.70 0.25 200 / 0.5), transparent)",
                      boxShadow: "0 0 4px oklch(0.70 0.25 200 / 0.3)"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-16 flex items-center justify-center mb-6 relative z-10", children: [
                isWinState && outcome.status === "won" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center relative overflow-hidden px-6 py-3 rounded-xl w-full",
                    style: {
                      background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))",
                      border: "1px solid rgba(212,175,55,0.4)",
                      boxShadow: "0 0 24px rgba(212,175,55,0.3), 0 0 12px oklch(0.65 0.25 265 / 0.2)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 shimmer-overlay rounded-xl pointer-events-none",
                          style: { opacity: 0.6 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "heading-cinematic text-gold-glow font-black text-2xl relative z-10 glitch-text",
                          style: { color: "#D4AF37" },
                          "data-ocid": "win-message",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "inline w-5 h-5 mr-1.5" }),
                            "YOU WIN! +",
                            formatICP(outcome.tx.netAmount),
                            " ICP",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "inline w-5 h-5 ml-1.5" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-xs mt-1 font-semibold relative z-10 tech-text",
                          style: { color: "#A78BFA" },
                          children: [
                            "2.63× payout · Balance:",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                              formatICP(outcome.newBalance),
                              " ICP"
                            ] })
                          ]
                        }
                      )
                    ]
                  }
                ),
                isLostState && outcome.status === "lost" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center px-6 py-3 rounded-xl w-full",
                    style: {
                      background: "rgba(60,20,100,0.2)",
                      border: "1px solid rgba(123,47,190,0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "font-semibold text-base",
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
                          className: "text-xs mt-1 font-mono",
                          style: { color: "rgba(212,175,55,0.5)" },
                          children: [
                            "Balance: ",
                            formatICP(outcome.newBalance),
                            " ICP"
                          ]
                        }
                      )
                    ]
                  }
                ),
                isSpinning && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-base animate-pulse tracking-widest uppercase tech-text neon-glow-cyan",
                    style: { color: "#A78BFA", letterSpacing: "0.12em" },
                    children: "✦ Spinning the reels… ✦"
                  }
                ),
                error && !isSpinning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", style: { color: "#9333EA" }, children: error })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-black uppercase tracking-widest text-center mb-3 tech-text",
                    style: { color: "#A78BFA", letterSpacing: "0.2em" },
                    children: "⬥ Select Bet Amount ⬥"
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
                      className: `py-3 rounded-xl font-black transition-all duration-200 btn-premium tech-text cyber-border ${isActive ? "neon-glow" : ""}`,
                      style: {
                        background: isActive ? "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(180,130,40,0.15))" : "rgba(30,14,65,0.6)",
                        color: isActive ? "#D4AF37" : isDisabled ? "#6B21A8" : "#C4B5FD",
                        border: isActive ? "2px solid rgba(212,175,55,0.85)" : "1px solid rgba(123,47,190,0.4)",
                        boxShadow: isActive ? "0 0 16px rgba(212,175,55,0.45), 0 0 8px oklch(0.65 0.25 265 / 0.2), inset 0 1px 0 rgba(255,220,100,0.2)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
                        cursor: isDisabled || isSpinning ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.5 : 1,
                        transform: isActive ? "scale(1.04)" : "scale(1)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5" }),
                          opt.label
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "block text-xs mt-0.5 font-semibold",
                            style: {
                              color: isActive ? "rgba(212,175,55,0.7)" : "rgba(196,181,253,0.55)",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: outcome.status === "idle" || isSpinning ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSpin,
                  disabled: isSpinning || !isConnected || selectedBet > balance,
                  "data-ocid": "spin-btn",
                  className: "w-full py-4 rounded-2xl font-black uppercase tracking-widest relative overflow-hidden plasma-button",
                  style: {
                    fontSize: "1.2rem",
                    letterSpacing: "0.22em",
                    background: isSpinning ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, oklch(0.65 0.22 265) 0%, oklch(0.55 0.22 265) 30%, oklch(0.46 0.22 265) 65%, oklch(0.40 0.22 265) 100%)",
                    color: "oklch(0.97 0 0)",
                    /* 3D button effect: lighter on top, darker on bottom, depth shadow */
                    boxShadow: isSpinning ? "none" : [
                      /* Top highlight — gives 3D top lit feel */
                      "inset 0 2px 0 rgba(180,185,255,0.4)",
                      /* Bottom shadow — gives pressing depth */
                      "inset 0 -3px 0 rgba(40,30,120,0.5)",
                      /* Outer indigo ambient glow */
                      "0 0 32px rgba(99,102,241,0.5)",
                      "0 0 60px rgba(99,102,241,0.25)",
                      /* Neon cyan halo */
                      "0 0 16px oklch(0.70 0.25 200 / 0.2)",
                      /* Hard drop shadow for depth */
                      "0 6px 20px rgba(0,0,0,0.6)",
                      "0 2px 8px rgba(0,0,0,0.4)"
                    ].join(", "),
                    cursor: isSpinning || !isConnected || selectedBet > balance ? "not-allowed" : "pointer",
                    opacity: isSpinning || !isConnected || selectedBet > balance ? 0.65 : 1,
                    transition: "all 0.15s cubic-bezier(0.4,0,0.2,1)"
                  },
                  onMouseEnter: (e) => {
                    if (!isSpinning && isConnected) {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = [
                        "inset 0 2px 0 rgba(180,185,255,0.4)",
                        "inset 0 -3px 0 rgba(40,30,120,0.5)",
                        "0 0 40px rgba(99,102,241,0.65)",
                        "0 0 80px rgba(99,102,241,0.3)",
                        "0 0 20px oklch(0.70 0.25 200 / 0.35)",
                        "0 10px 28px rgba(0,0,0,0.65)",
                        "0 4px 12px rgba(0,0,0,0.5)"
                      ].join(", ");
                    }
                  },
                  onMouseLeave: (e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                    el.style.boxShadow = isSpinning ? "none" : [
                      "inset 0 2px 0 rgba(180,185,255,0.4)",
                      "inset 0 -3px 0 rgba(40,30,120,0.5)",
                      "0 0 32px rgba(99,102,241,0.5)",
                      "0 0 60px rgba(99,102,241,0.25)",
                      "0 0 16px oklch(0.70 0.25 200 / 0.2)",
                      "0 6px 20px rgba(0,0,0,0.6)",
                      "0 2px 8px rgba(0,0,0,0.4)"
                    ].join(", ");
                  },
                  onMouseDown: (e) => {
                    const el = e.currentTarget;
                    el.style.transform = "scale(0.97) translateY(1px)";
                    el.style.boxShadow = [
                      "inset 0 1px 0 rgba(180,185,255,0.3)",
                      "inset 0 -1px 0 rgba(40,30,120,0.4)",
                      "0 0 20px rgba(99,102,241,0.4)",
                      "0 2px 8px rgba(0,0,0,0.5)"
                    ].join(", ");
                  },
                  onMouseUp: (e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                  },
                  children: isSpinning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" }),
                    "Spinning…"
                  ] }) : "🎰 SPIN"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handlePlayAgain,
                  "data-ocid": "play-again-btn",
                  className: "w-full py-4 rounded-2xl font-black uppercase tracking-widest btn-premium plasma-button tech-text",
                  style: {
                    fontSize: "1.1rem",
                    letterSpacing: "0.18em",
                    background: "transparent",
                    color: "#D4AF37",
                    border: "2px solid rgba(212,175,55,0.7)",
                    boxShadow: "0 0 16px rgba(212,175,55,0.3), 0 0 8px oklch(0.65 0.25 265 / 0.15), inset 0 1px 0 rgba(255,220,100,0.15)",
                    cursor: "pointer"
                  },
                  children: "↻ Play Again"
                }
              ) }),
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
                  className: "absolute bottom-0 left-0 right-0 h-px rounded-b-3xl pointer-events-none",
                  style: {
                    background: "linear-gradient(90deg, transparent, rgba(123,47,190,0.6), oklch(0.70 0.25 200 / 0.5), rgba(212,175,55,0.3), oklch(0.70 0.25 200 / 0.5), rgba(123,47,190,0.6), transparent)",
                    zIndex: 2
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-5 rounded-2xl px-6 py-4 w-full max-w-lg futuristic-panel",
            style: {
              background: "linear-gradient(135deg, rgba(30,12,68,0.7), rgba(15,6,32,0.8))",
              border: "1px solid rgba(212,175,55,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-black uppercase tracking-widest text-center mb-3 tech-text",
                  style: { color: "rgba(212,175,55,0.6)", letterSpacing: "0.2em" },
                  children: "Paytable"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-xs text-center relative z-10", children: BET_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg py-2 cyber-border",
                  style: {
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "block font-mono font-bold tech-text",
                        style: { color: "#D4AF37" },
                        children: opt.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "block mt-0.5",
                        style: { color: "rgba(167,139,250,0.7)" },
                        children: [
                          "→ ",
                          opt.win
                        ]
                      }
                    )
                  ]
                },
                opt.label
              )) }),
              activeBetOption && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-3 text-center text-xs font-semibold tech-text relative z-10",
                  style: { color: "rgba(212,175,55,0.45)" },
                  children: [
                    "Current bet: ",
                    activeBetOption.label,
                    " · Jackpot:",
                    " ",
                    activeBetOption.win
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "mt-3 text-xs text-center font-mono tech-text",
            style: { color: "rgba(212,175,55,0.35)" },
            "data-ocid": "house-edge-note",
            children: "House edge: ~8% · RTP 92%"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes reelSpin {
          0%   { transform: translateY(0px) scaleY(1); opacity: 1; }
          20%  { transform: translateY(-10px) scaleY(0.8); opacity: 0.5; filter: blur(2px); }
          50%  { transform: translateY(0px) scaleY(1.1); opacity: 0.7; filter: blur(1px); }
          80%  { transform: translateY(8px) scaleY(0.85); opacity: 0.6; filter: blur(2px); }
          100% { transform: translateY(0px) scaleY(1); opacity: 1; filter: blur(0); }
        }
        .reel-spinning {
          animation: reelSpin 0.2s linear infinite;
        }
      ` })
      ]
    }
  );
}
export {
  LuckySevens as default
};
