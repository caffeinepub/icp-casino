import { c as createLucideIcon, j as jsxRuntimeExports, G as GameCategory, B as Button, S as Skeleton, r as reactExports, a as cn, b as useActor, d as useQuery, I as Input, e as createActor } from "./index-CH_7_uSw.js";
import { U as Users, g as getGameImage, i as isPicsumUrl, T as TrendingUp } from "./gameImages-ChVxEWHA.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-DD8w38KD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("dices", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const FILTERS = [
  { label: "All Games", value: "All" },
  { label: "Slots", value: GameCategory.Slots },
  { label: "Table Games", value: GameCategory.TableGames },
  { label: "Card Games", value: GameCategory.CardGames }
];
function CategoryFilter({ active, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "fieldset",
    {
      className: "flex items-center gap-2 flex-wrap border-0 p-0 m-0",
      "aria-label": "Filter games by category",
      "data-ocid": "category-filters",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
        FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(f.value),
            className: `px-3 py-1.5 rounded-md text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === f.value ? "bg-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
            "aria-pressed": active === f.value,
            "data-ocid": `filter-${f.value}`,
            children: f.label
          },
          f.value
        ))
      ]
    }
  );
}
const CATEGORY_BADGE = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime"
};
const CATEGORY_LABEL = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table",
  [GameCategory.CardGames]: "Cards"
};
function GameImage({ game, className }) {
  const svgImage = getGameImage(Number(game.id));
  const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
  const src = useSvg ? svgImage : game.imageUrl;
  if (src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: game.name, className, loading: "lazy" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-muted-foreground" }) });
}
function GameCard({ game, onPlay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 shadow-card shadow-hover cursor-pointer transition-smooth group",
      "data-ocid": "game-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onPlay == null ? void 0 : onPlay(game),
            "aria-label": `Play ${game.name}`,
            className: "relative aspect-[4/3] w-full overflow-hidden bg-muted block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GameImage,
                {
                  game,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: CATEGORY_BADGE[game.category], children: CATEGORY_LABEL[game.category] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-background/70 backdrop-blur-sm rounded-full px-2 py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: Number(game.playerCount).toLocaleString() })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground truncate mb-0.5 min-w-0", children: game.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              Number(game.playerCount).toLocaleString(),
              " playing"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
              (game.rtp * 100).toFixed(1),
              "% RTP"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "w-full text-xs gap-1.5 hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-smooth",
              "data-ocid": "play-btn",
              onClick: (e) => {
                e.stopPropagation();
                onPlay == null ? void 0 : onPlay(game);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 fill-current" }),
                "Play Now"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SkeletonCard({ variant = "game" }) {
  if (variant === "carousel") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-card border border-border aspect-[16/9] w-full animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28" })
      ] })
    ] });
  }
  if (variant === "transaction") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg overflow-hidden bg-card border border-border",
      "data-ocid": "skeleton-game-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded" })
          ] })
        ] })
      ]
    }
  );
}
const AUTO_ADVANCE_MS = 5e3;
function FeaturedCarousel({
  games,
  isLoading,
  onPlay
}) {
  const [current, setCurrent] = reactExports.useState(0);
  const [paused, setPaused] = reactExports.useState(false);
  const count = games.length;
  reactExports.useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % count),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(timer);
  }, [count, paused]);
  reactExports.useEffect(() => {
    setCurrent(0);
  }, [count]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { variant: "carousel" });
  if (!count) return null;
  const game = games[current];
  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);
  const svgImage = getGameImage(Number(game.id));
  const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
  const imageSrc = useSvg ? svgImage : game.imageUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden bg-card border border-border group select-none",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      "data-ocid": "featured-carousel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[21/9] md:aspect-[3/1] overflow-hidden", children: [
          imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageSrc,
              alt: game.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
            },
            game.id.toString()
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-secondary to-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${CATEGORY_BADGE[game.category]} mb-2 w-fit`, children: CATEGORY_LABEL[game.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight max-w-lg", children: game.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
              Number(game.playerCount).toLocaleString(),
              " playing"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-primary font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
              (game.rtp * 100).toFixed(1),
              "% RTP"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "w-fit gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-smooth",
              onClick: () => onPlay == null ? void 0 : onPlay(game),
              "data-ocid": "carousel-play-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
                "Play Now"
              ]
            }
          )
        ] }),
        count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prev,
              "aria-label": "Previous game",
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: next,
              "aria-label": "Next game",
              className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-card transition-smooth focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-6 flex items-center gap-1.5", children: games.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCurrent(i),
              "aria-label": `Go to slide ${i + 1}`,
              className: `h-2 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${i === current ? "bg-primary w-5" : "bg-foreground/30 w-2 hover:bg-foreground/60"}`
            },
            g.id.toString()
          )) })
        ] })
      ]
    }
  );
}
const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "7️⃣", "🔔"];
const REEL_SYMBOL_COUNT = 24;
function buildStrip(result) {
  const strip = [];
  for (let i = 0; i < REEL_SYMBOL_COUNT - 1; i++) {
    strip.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }
  strip.push(result);
  return strip;
}
function Reel({ result, spinning, delay, duration }) {
  const strip = buildStrip(result);
  const symbolHeight = 80;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden",
      style: {
        width: 88,
        height: symbolHeight,
        borderRadius: "0.5rem",
        background: "oklch(0.10 0 0)",
        border: "2px solid oklch(var(--primary) / 0.4)",
        boxShadow: "inset 0 0 16px oklch(0 0 0 / 0.6)"
      },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 z-10 pointer-events-none",
            style: {
              height: 28,
              background: "linear-gradient(to bottom, oklch(0.10 0 0), transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 bottom-0 z-10 pointer-events-none",
            style: {
              height: 28,
              background: "linear-gradient(to top, oklch(0.10 0 0), transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 z-10 pointer-events-none",
            style: {
              top: symbolHeight / 2 - 1,
              height: 2,
              background: "oklch(var(--primary) / 0.5)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: spinning ? {
              animation: `slotSpin ${duration}ms ease-out ${delay}ms 1 forwards`,
              transform: "translateY(0)"
            } : {
              transform: `translateY(-${(REEL_SYMBOL_COUNT - 1) * symbolHeight}px)`
            },
            children: strip.map((sym, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  height: symbolHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  userSelect: "none"
                },
                children: sym
              },
              `strip-${i}-${sym}`
            ))
          }
        )
      ]
    }
  );
}
const REEL_NAMES = ["left", "center", "right"];
const BET_OPTIONS = [
  { label: "0.1 ICP", value: 0.1 },
  { label: "0.5 ICP", value: 0.5 },
  { label: "1 ICP", value: 1 }
];
function SlotMachine({ title }) {
  const [bet, setBet] = reactExports.useState(0.1);
  const [spinning, setSpinning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState(["🍒", "🍒", "🍒"]);
  const [outcome, setOutcome] = reactExports.useState("idle");
  const [durations] = reactExports.useState([1500, 1750, 2e3]);
  const [delays] = reactExports.useState([0, 120, 240]);
  const spinTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);
  const spin = reactExports.useCallback(() => {
    if (spinning) return;
    const newResults = Array.from(
      { length: 3 },
      () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
    setResults(newResults);
    setOutcome("idle");
    setSpinning(true);
    const maxDuration = Math.max(...durations) + Math.max(...delays);
    spinTimeoutRef.current = setTimeout(() => {
      setSpinning(false);
      const [a, b, c] = newResults;
      if (a === b && b === c) {
        setOutcome("win");
      } else if (a === b || b === c || a === c) {
        setOutcome("near-miss");
      } else {
        setOutcome("loss");
      }
    }, maxDuration + 100);
  }, [spinning, durations, delays]);
  const outcomeLabel = outcome === "win" ? "🎉 JACKPOT!" : outcome === "near-miss" ? "✨ NEAR MISS" : outcome === "loss" ? "Try again!" : null;
  const outcomeClass = outcome === "win" ? "text-win" : outcome === "near-miss" ? "text-deposit" : outcome === "loss" ? "text-loss" : "";
  const machineBorderClass = outcome === "win" ? "border-win shadow-win-glow" : outcome === "loss" ? "border-loss" : "border-primary/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-4 p-5 rounded-2xl bg-card border-2 transition-smooth",
        machineBorderClass
      ),
      style: outcome === "win" ? {
        boxShadow: "0 0 24px oklch(var(--win) / 0.35), 0 0 6px oklch(var(--win) / 0.2)"
      } : void 0,
      "data-ocid": "slot-machine",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold uppercase tracking-widest",
            style: { color: "oklch(var(--primary))" },
            children: title
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-3",
            role: "img",
            "aria-label": `Slot reels showing ${results.join(", ")}`,
            children: results.map((sym, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Reel,
              {
                result: sym,
                spinning,
                delay: delays[i],
                duration: durations[i]
              },
              REEL_NAMES[i]
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 flex items-center justify-center", children: outcomeLabel && !spinning && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm font-bold tracking-wide", outcomeClass), children: outcomeLabel }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "fieldset",
          {
            className: "flex items-center gap-2 border-none p-0 m-0",
            "aria-label": "Bet amount",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Bet amount" }),
              BET_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setBet(opt.value),
                  disabled: spinning,
                  className: cn(
                    "px-3 py-1 rounded-md text-xs font-semibold border transition-smooth",
                    bet === opt.value ? "border-primary bg-primary/20 text-foreground" : "border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  ),
                  style: bet === opt.value ? { borderColor: "oklch(var(--primary))" } : void 0,
                  "data-ocid": `bet-option-${opt.value}`,
                  "aria-pressed": bet === opt.value,
                  children: opt.label
                },
                opt.value
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: spin,
            disabled: spinning,
            className: "w-full font-bold tracking-wide",
            style: {
              background: spinning ? void 0 : "linear-gradient(135deg, oklch(var(--primary)) 0%, oklch(0.55 0.28 280) 100%)",
              color: "oklch(var(--primary-foreground))"
            },
            "data-ocid": "spin-btn",
            "aria-label": spinning ? "Spinning…" : `Spin for ${bet} ICP`,
            children: spinning ? "Spinning…" : `Spin · ${bet} ICP`
          }
        )
      ]
    }
  );
}
const MACHINES = [
  { id: "lucky-reels", title: "Lucky Reels" },
  { id: "classic-slots", title: "Classic Slots" },
  { id: "golden-spin", title: "Golden Spin" }
];
function SlotMachineSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "slot-machines",
      "aria-label": "Slot machines",
      className: "py-4",
      "data-ocid": "slot-machine-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Slot Machines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
              style: {
                background: "oklch(var(--primary) / 0.18)",
                color: "oklch(var(--primary))",
                border: "1px solid oklch(var(--primary) / 0.35)"
              },
              children: "Demo"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: MACHINES.map((machine) => /* @__PURE__ */ jsxRuntimeExports.jsx(SlotMachine, { title: machine.title }, machine.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground text-center", children: "Demo mode — no real ICP is wagered. Spins are purely visual." })
      ]
    }
  );
}
function LobbyPage({ onPlay }) {
  const { actor, isFetching } = useActor(createActor);
  const [categoryFilter, setCategoryFilter] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const { data: featuredGames = [], isLoading: featuredLoading } = useQuery({
    queryKey: ["featured-games"],
    queryFn: async () => actor ? actor.listFeaturedGames() : [],
    enabled: !!actor && !isFetching
  });
  const { data: allGames = [], isLoading: gamesLoading } = useQuery({
    queryKey: ["games", categoryFilter],
    queryFn: async () => {
      if (!actor) return [];
      if (categoryFilter === "All") return actor.listGames();
      return actor.listGamesByCategory(categoryFilter);
    },
    enabled: !!actor && !isFetching
  });
  const filteredGames = reactExports.useMemo(() => {
    if (!search.trim()) return allGames;
    const q = search.toLowerCase();
    return allGames.filter((g) => g.name.toLowerCase().includes(q));
  }, [allGames, search]);
  const isLoading = gamesLoading || isFetching;
  const isCarouselLoading = featuredLoading || isFetching;
  function handleCategoryChange(value) {
    setCategoryFilter(value);
    setSearch("");
  }
  function clearFilters() {
    setCategoryFilter("All");
    setSearch("");
  }
  function handlePlay(game) {
    onPlay(game.id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 space-y-12",
      "data-ocid": "lobby-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Featured games", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeaturedCarousel,
          {
            games: featuredGames,
            isLoading: isCarouselLoading,
            onPlay: handlePlay
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "games", "aria-label": "Game lobby", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Game Lobby" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryFilter,
              {
                active: categoryFilter,
                onChange: handleCategoryChange
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6 max-w-sm", "data-ocid": "game-search", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "search",
                placeholder: "Search games…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 bg-card border-border focus-visible:ring-ring",
                "aria-label": "Search games by name"
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: Array.from({ length: 10 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { variant: "game" }, key)) }) : filteredGames.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-24 bg-card border border-border rounded-xl",
              "data-ocid": "games-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-14 h-14 text-muted-foreground mb-4 opacity-60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: search ? "No games match your search" : "No games available" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 text-center max-w-xs", children: search ? `We couldn't find any games matching "${search}". Try a different term or clear your filters.` : "No games are available in this category yet. Check back soon!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: clearFilters,
                    className: "flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-smooth",
                    "data-ocid": "clear-filters-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                      "Clear filters"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
              filteredGames.length,
              " ",
              filteredGames.length === 1 ? "game" : "games",
              " found"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: filteredGames.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              GameCard,
              {
                game,
                onPlay: handlePlay
              },
              game.id.toString()
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlotMachineSection, {})
      ]
    }
  );
}
export {
  LobbyPage as default
};
