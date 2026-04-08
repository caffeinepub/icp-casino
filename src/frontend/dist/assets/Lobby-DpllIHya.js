import { c as createLucideIcon, j as jsxRuntimeExports, G as GameCategory, B as Button, S as Skeleton, r as reactExports, a as useActor, b as useQueryClient, d as useWallet, e as useIcpWallet, f as useMutation, g as formatICP, W as Wallet, h as createActor, i as useQuery, I as Input } from "./index-CHITFDq0.js";
import { g as getGameImage, i as isPicsumUrl, T as TrendingUp } from "./gameImages-BylIqqji.js";
import { U as Users } from "./users-DLmbjCao.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-F088_X-U.js";
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
      className: "rounded-lg overflow-hidden bg-card border border-border hover:border-primary/60 shadow-card shadow-hover cursor-pointer transition-smooth group",
      style: {
        "--tw-shadow-color": "oklch(0.72 0.18 65 / 0.12)"
      },
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 border border-border", children: [
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
              className: "w-full text-xs gap-1.5 transition-smooth",
              style: {
                borderColor: "oklch(0.72 0.18 65 / 0.30)",
                color: "oklch(0.72 0.18 65)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "oklch(0.72 0.18 65 / 0.12)";
                e.currentTarget.style.borderColor = "oklch(0.72 0.18 65 / 0.65)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "oklch(0.72 0.18 65 / 0.30)";
              },
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
const SYMBOLS = [
  {
    id: "fire-breath",
    label: "Fire Breath",
    weight: 18,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fb-core" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stop-color="#D4AF37"/>
          <stop offset="50%" stop-color="#7B2FBE"/>
          <stop offset="100%" stop-color="#4B0082"/>
        </radialGradient>
        <filter id="fb-glow"><feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M40,75 C28,65 18,50 22,35 C24,28 30,25 34,30 C30,18 35,8 40,5 C45,8 50,18 46,30 C50,25 56,28 58,35 C62,50 52,65 40,75Z" fill="url(#fb-core)" filter="url(#fb-glow)"/>
      <path d="M40,65 C33,56 26,44 29,33 C32,28 36,30 40,38 C44,30 48,28 51,33 C54,44 47,56 40,65Z" fill="#7B2FBE" opacity="0.85"/>
      <path d="M40,55 C36,48 32,40 35,33 C38,30 40,34 40,40 C40,34 42,30 45,33 C48,40 44,48 40,55Z" fill="#D4AF37" opacity="0.7"/>
    </svg>`
  },
  {
    id: "dragon-scale",
    label: "Dragon Scale",
    weight: 16,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ds-grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#4a7ae8"/>
          <stop offset="55%" stop-color="#2952c4"/>
          <stop offset="100%" stop-color="#0d1f7a"/>
        </radialGradient>
        <filter id="ds-glow"><feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="40" cy="40" r="32" fill="#0d1f7a" stroke="#2952c4" stroke-width="2"/>
      <ellipse cx="40" cy="28" rx="20" ry="14" fill="url(#ds-grad)" filter="url(#ds-glow)"/>
      <ellipse cx="26" cy="44" rx="14" ry="10" fill="url(#ds-grad)" filter="url(#ds-glow)"/>
      <ellipse cx="54" cy="44" rx="14" ry="10" fill="url(#ds-grad)" filter="url(#ds-glow)"/>
      <ellipse cx="40" cy="58" rx="18" ry="12" fill="url(#ds-grad)" filter="url(#ds-glow)"/>
      <ellipse cx="40" cy="28" rx="10" ry="7" fill="#6fa0ff" opacity="0.5"/>
      <ellipse cx="26" cy="44" rx="7" ry="5" fill="#6fa0ff" opacity="0.5"/>
      <ellipse cx="54" cy="44" rx="7" ry="5" fill="#6fa0ff" opacity="0.5"/>
    </svg>`
  },
  {
    id: "dragon-eye",
    label: "Dragon Eye",
    weight: 12,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="de-iris" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#9B59B6"/>
          <stop offset="45%" stop-color="#7B2FBE"/>
          <stop offset="100%" stop-color="#4B0082"/>
        </radialGradient>
        <radialGradient id="de-bg" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1a0d3a"/>
          <stop offset="100%" stop-color="#0d0520"/>
        </radialGradient>
        <filter id="de-glow"><feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="40" cy="40" r="34" fill="url(#de-bg)" stroke="#7B2FBE" stroke-width="2"/>
      <ellipse cx="40" cy="40" rx="22" ry="16" fill="url(#de-iris)" filter="url(#de-glow)"/>
      <ellipse cx="40" cy="40" rx="9" ry="20" fill="#0a0020"/>
      <ellipse cx="36" cy="36" rx="4" ry="4" fill="#C4B5FD" opacity="0.7"/>
      <ellipse cx="40" cy="40" rx="22" ry="16" fill="none" stroke="#9B59B6" stroke-width="1.5" opacity="0.6"/>
    </svg>`
  },
  {
    id: "ruby-gem",
    label: "Royal Gem",
    weight: 14,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg-top" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stop-color="#C4B5FD"/>
          <stop offset="40%" stop-color="#7B2FBE"/>
          <stop offset="100%" stop-color="#4B0082"/>
        </linearGradient>
        <linearGradient id="rg-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8B5CF6"/>
          <stop offset="100%" stop-color="#5B21B6"/>
        </linearGradient>
        <filter id="rg-glow"><feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <polygon points="40,8 62,30 55,70 25,70 18,30" fill="url(#rg-top)" stroke="#D4AF37" stroke-width="1.5" filter="url(#rg-glow)"/>
      <polygon points="40,8 62,30 55,70" fill="url(#rg-side)" opacity="0.7"/>
      <polygon points="40,8 18,30 25,70" fill="#DDD6FE" opacity="0.3"/>
      <polygon points="40,8 62,30 40,38 18,30" fill="#E9D5FF" opacity="0.5"/>
      <polygon points="32,20 40,8 48,20 40,28" fill="#F3E8FF" opacity="0.6"/>
    </svg>`
  },
  {
    id: "royal-crown",
    label: "Royal Crown",
    weight: 13,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rc-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e8c76a"/>
          <stop offset="50%" stop-color="#d4a843"/>
          <stop offset="100%" stop-color="#a07830"/>
        </linearGradient>
        <filter id="rc-glow"><feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="16" y="50" width="48" height="16" rx="3" fill="url(#rc-gold)"/>
      <polygon points="16,50 16,24 28,38 40,16 52,38 64,24 64,50" fill="url(#rc-gold)" filter="url(#rc-glow)"/>
      <circle cx="40" cy="16" r="5" fill="#9B59B6" stroke="#d4a843" stroke-width="1.5"/>
      <circle cx="16" cy="24" r="4" fill="#4a7ae8" stroke="#d4a843" stroke-width="1.5"/>
      <circle cx="64" cy="24" r="4" fill="#4a7ae8" stroke="#d4a843" stroke-width="1.5"/>
      <rect x="20" y="53" width="40" height="10" rx="2" fill="#a07830" opacity="0.5"/>
      <line x1="28" y1="53" x2="28" y2="66" stroke="#e8c76a" stroke-width="1" opacity="0.6"/>
      <line x1="40" y1="53" x2="40" y2="66" stroke="#e8c76a" stroke-width="1" opacity="0.6"/>
      <line x1="52" y1="53" x2="52" y2="66" stroke="#e8c76a" stroke-width="1" opacity="0.6"/>
    </svg>`
  },
  {
    id: "midnight-moon",
    label: "Midnight Moon",
    weight: 15,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mm-grad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#6a8fdf"/>
          <stop offset="60%" stop-color="#2952c4"/>
          <stop offset="100%" stop-color="#0d1f60"/>
        </radialGradient>
        <filter id="mm-glow"><feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="40" cy="40" r="34" fill="#050d2a" stroke="#2952c4" stroke-width="1.5"/>
      <path d="M52,15 A26,26 0 1,1 15,52 A32,32 0 0,0 52,15Z" fill="url(#mm-grad)" filter="url(#mm-glow)"/>
      <circle cx="30" cy="28" r="3" fill="#a0beff" opacity="0.5"/>
      <circle cx="42" cy="22" r="2" fill="#a0beff" opacity="0.4"/>
      <circle cx="50" cy="35" r="1.5" fill="#ffffff" opacity="0.3"/>
      <circle cx="62" cy="15" r="1.5" fill="#d4a843" opacity="0.7" filter="url(#mm-glow)"/>
      <circle cx="18" cy="20" r="1" fill="#d4a843" opacity="0.6"/>
      <circle cx="70" cy="30" r="1" fill="#d4a843" opacity="0.5"/>
    </svg>`
  },
  {
    id: "dragon-claw",
    label: "Dragon Claw",
    weight: 8,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a7ae8"/>
          <stop offset="100%" stop-color="#7B2FBE"/>
        </linearGradient>
        <filter id="dc-glow"><feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M35,72 C30,60 25,50 28,36 C30,26 36,22 40,28 L42,22 C44,16 50,16 52,22 L50,28 C54,22 60,24 60,34 C62,48 55,62 48,72Z" fill="url(#dc-grad)" filter="url(#dc-glow)" stroke="#d4a843" stroke-width="1"/>
      <path d="M38,68 C34,56 31,46 34,34 C36,28 39,26 40,30 L40,22 C41,18 43,18 44,22 L44,30 C45,26 48,28 49,34 C52,46 49,56 46,68Z" fill="#7a9ff0" opacity="0.4"/>
    </svg>`
  },
  {
    id: "wild-dragon",
    label: "Wild Dragon",
    weight: 4,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wd-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a7ae8"/>
          <stop offset="40%" stop-color="#2952c4"/>
          <stop offset="100%" stop-color="#7B2FBE"/>
        </linearGradient>
        <filter id="wd-glow"><feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M40,60 C25,58 14,50 12,38 C10,26 18,16 28,14 C32,13 36,15 38,18 L40,12 L42,18 C44,15 48,13 52,14 C62,16 70,26 68,38 C66,50 55,58 40,60Z" fill="url(#wd-body)" filter="url(#wd-glow)" stroke="#d4a843" stroke-width="1.5"/>
      <path d="M22,30 C10,20 6,10 12,8 C16,6 22,12 24,20Z" fill="#2952c4" opacity="0.8"/>
      <path d="M58,30 C70,20 74,10 68,8 C64,6 58,12 56,20Z" fill="#7B2FBE" opacity="0.8"/>
      <circle cx="32" cy="28" r="4" fill="#9B59B6" filter="url(#wd-glow)"/>
      <circle cx="48" cy="28" r="4" fill="#4a7ae8" filter="url(#wd-glow)"/>
      <circle cx="32" cy="28" r="1.5" fill="#1a0d3a"/>
      <circle cx="48" cy="28" r="1.5" fill="#1a0d3a"/>
      <path d="M30,14 L26,6 L34,12Z" fill="#9B59B6"/>
      <path d="M40,12 L38,4 L42,4 L40,12Z" fill="#d4a843"/>
      <path d="M50,14 L46,12 L54,6Z" fill="#4a7ae8"/>
      <text x="40" y="52" font-family="Georgia,serif" font-size="9" font-weight="bold" fill="#d4a843" text-anchor="middle" filter="url(#wd-glow)">WILD</text>
    </svg>`
  }
];
const SYMBOL_POOL = SYMBOLS.flatMap(
  (s) => Array(s.weight).fill(s.id)
);
function randomSymbol() {
  return SYMBOL_POOL[Math.floor(Math.random() * SYMBOL_POOL.length)];
}
function getSymbolDef(id) {
  return SYMBOLS.find((s) => s.id === id) ?? SYMBOLS[0];
}
const MULTIPLIERS = {
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7: 12,
  8: 25
};
function detectWins(grid) {
  const wins = [];
  const ROWS = 8;
  const REELS = 8;
  for (let row = 0; row < ROWS; row++) {
    const rowSymbols = grid.map((reel) => reel[row]);
    let count = 1;
    let baseSymbol = rowSymbols[0] === "wild-dragon" ? null : rowSymbols[0];
    for (let col = 1; col < REELS; col++) {
      const sym = rowSymbols[col];
      if (sym === "wild-dragon") {
        count++;
      } else if (baseSymbol === null) {
        baseSymbol = sym;
        count++;
      } else if (sym === baseSymbol) {
        count++;
      } else {
        break;
      }
    }
    if (baseSymbol && count >= 3) {
      wins.push({
        row,
        symbol: baseSymbol,
        count,
        multiplier: MULTIPLIERS[count] ?? 0
      });
    }
  }
  return wins;
}
function SymbolCell({ id, isWinning }) {
  const def = getSymbolDef(id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative flex items-center justify-center transition-all duration-300 ${isWinning ? "scale-105 z-10" : ""}`,
      style: {
        width: 72,
        height: 72,
        background: isWinning ? "radial-gradient(ellipse at center, oklch(0.35 0.18 300 / 0.6) 0%, oklch(0.18 0.1 300 / 0.4) 100%)" : "radial-gradient(ellipse at center, oklch(0.12 0.05 240 / 0.6) 0%, oklch(0.06 0.02 240 / 0.3) 100%)",
        border: isWinning ? "1.5px solid oklch(0.72 0.18 65 / 0.9)" : "1px solid oklch(0.25 0.1 240 / 0.3)",
        borderRadius: 6,
        boxShadow: isWinning ? "0 0 16px oklch(0.72 0.18 65 / 0.6), inset 0 0 8px oklch(0.72 0.18 65 / 0.3)" : "none"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14",
          dangerouslySetInnerHTML: { __html: def.svg }
        }
      )
    }
  );
}
function Reel({ symbols, isSpinning, winningRows, spinDuration }) {
  const strip = [...symbols, ...symbols, ...symbols].map((sym, pos) => ({
    sym,
    key: `${pos}-${sym}`
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative overflow-hidden flex-shrink-0",
      style: {
        width: 80,
        height: 8 * 80,
        background: "oklch(0.06 0.04 240 / 0.8)",
        borderLeft: "1px solid oklch(0.25 0.1 240 / 0.2)",
        borderRight: "1px solid oklch(0.25 0.1 240 / 0.2)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            willChange: "transform",
            animation: isSpinning ? `dragonReelSpin ${spinDuration}ms linear infinite` : "none",
            filter: isSpinning ? "blur(2px)" : "none",
            transition: isSpinning ? "none" : "filter 0.2s ease"
          },
          children: strip.map(({ sym, key }) => {
            const pos = Number(key.split("-")[0]);
            const rowInGrid = pos % ROWS_COUNT;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center",
                style: { width: 80, height: 80, padding: 4 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SymbolCell,
                  {
                    id: sym,
                    isWinning: !isSpinning && winningRows.has(rowInGrid)
                  }
                )
              },
              key
            );
          })
        }
      )
    }
  );
}
function DragonBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 800 140",
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-full",
      style: { maxHeight: 140 },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "banner-bg", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#0a1540" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "35%", stopColor: "#080e28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "65%", stopColor: "#080e28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0a1540" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gold-dragon", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c76a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "#D4AF37" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#a07830" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "blue-dragon", x1: "100%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4a7ae8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "#2952c4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0d1f7a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "title-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4a7ae8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "40%", stopColor: "#8aadff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "#D4AF37" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c76a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "title-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "4", result: "blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "dragon-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "5", result: "blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "800", height: "140", fill: "url(#banner-bg)", rx: "8" }),
        [
          [50, 20],
          [150, 10],
          [350, 15],
          [450, 25],
          [650, 10],
          [750, 30],
          [100, 110],
          [700, 100],
          [400, 8]
        ].map(([x, y]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: "1.5",
            fill: x % 2 === 0 ? "#4a7ae8" : "#D4AF37",
            opacity: "0.7"
          },
          `star-${x}-${y}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(60,70) scale(1.4)", filter: "url(#dragon-glow)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M0,0 C-20,-15 -35,-25 -30,-40 C-25,-55 -10,-55 0,-42 C10,-55 25,-55 30,-40 C35,-25 20,-15 0,0Z",
              fill: "url(#gold-dragon)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "-42", rx: "18", ry: "14", fill: "#D4AF37" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "-30", rx: "10", ry: "7", fill: "#a07830" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "-8", cy: "-44", r: "5", fill: "#7B2FBE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "-8", cy: "-44", r: "2", fill: "#1a0d3a" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M-4,-54 L-8,-70 L0,-55Z", fill: "#d4a843" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M-30,-30 C-60,-20 -70,5 -55,10 C-45,14 -35,5 -25,-5Z",
              fill: "#a07830",
              opacity: "0.9"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M0,0 C-5,15 -15,25 -20,40 C-18,50 -8,48 -5,38 C-2,28 0,20 5,15Z",
              fill: "#D4AF37"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            transform: "translate(740,70) scale(-1.4,1.4)",
            filter: "url(#dragon-glow)",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0,0 C-20,-15 -35,-25 -30,-40 C-25,-55 -10,-55 0,-42 C10,-55 25,-55 30,-40 C35,-25 20,-15 0,0Z",
                  fill: "url(#blue-dragon)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "-42", rx: "18", ry: "14", fill: "#2952c4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "0", cy: "-30", rx: "10", ry: "7", fill: "#1a3a9a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "-8", cy: "-44", r: "5", fill: "#D4AF37" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "-8", cy: "-44", r: "2", fill: "#00050a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M-4,-54 L-8,-70 L0,-55Z", fill: "#d4a843" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M-30,-30 C-60,-20 -70,5 -55,10 C-45,14 -35,5 -25,-5Z",
                  fill: "#0d1f7a",
                  opacity: "0.9"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0,0 C-5,15 -15,25 -20,40 C-18,50 -8,48 -5,38 C-2,28 0,20 5,15Z",
                  fill: "#2952c4"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "400",
            y: "82",
            fontFamily: "Georgia, serif",
            fontSize: "46",
            fontWeight: "bold",
            fill: "url(#title-grad)",
            textAnchor: "middle",
            letterSpacing: "4",
            filter: "url(#title-glow)",
            opacity: "0.5",
            children: "MIDNIGHT DRAGONS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "400",
            y: "82",
            fontFamily: "Georgia, serif",
            fontSize: "46",
            fontWeight: "bold",
            fill: "url(#title-grad)",
            textAnchor: "middle",
            letterSpacing: "4",
            children: "MIDNIGHT DRAGONS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "140",
            y1: "95",
            x2: "320",
            y2: "95",
            stroke: "#2952c4",
            strokeWidth: "1",
            opacity: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "480",
            y1: "95",
            x2: "660",
            y2: "95",
            stroke: "#D4AF37",
            strokeWidth: "1",
            opacity: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "95", r: "3", fill: "#d4a843", opacity: "0.8" })
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
      className: "absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 rounded-2xl",
      style: {
        background: "linear-gradient(160deg, rgba(4,8,26,0.97) 0%, rgba(6,4,20,0.98) 100%)",
        backdropFilter: "blur(8px)",
        border: "2px solid rgba(212,175,55,0.25)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center w-16 h-16 rounded-full",
            style: {
              background: "rgba(212,175,55,0.08)",
              border: "2px solid rgba(212,175,55,0.4)"
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
                textShadow: "0 0 20px rgba(212,175,55,0.6)"
              },
              children: "Connect Your Plug Wallet to Play"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#C4B5FD" }, children: "Real ICP bets only — Midnight Dragons uses live wagers" })
        ] }),
        connectError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs px-6 max-w-xs text-center",
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
              color: "#1a0d3a",
              boxShadow: isConnecting ? "none" : "0 4px 20px rgba(212,175,55,0.5)"
            },
            children: isConnecting ? "Connecting…" : "Connect Wallet"
          }
        )
      ]
    }
  );
}
const REELS_COUNT = 8;
const ROWS_COUNT = 8;
const BET_OPTIONS_ICP = [0.1, 0.5, 1];
const REEL_IDS = ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7"];
function initGrid() {
  return Array.from(
    { length: REELS_COUNT },
    () => Array.from({ length: ROWS_COUNT }, () => randomSymbol())
  );
}
function MidnightDragons() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance: rawBalance } = useWallet();
  const { isConnected, isConnecting, connectError, connect } = useIcpWallet();
  const [grid, setGrid] = reactExports.useState(initGrid);
  const [spinningReels, setSpinningReels] = reactExports.useState(
    Array(REELS_COUNT).fill(false)
  );
  const [betIcp, setBetIcp] = reactExports.useState(0.5);
  const [outcome, setOutcome] = reactExports.useState({ status: "idle" });
  const [localBalance, setLocalBalance] = reactExports.useState(null);
  const spinTimeouts = reactExports.useRef([]);
  const balance = localBalance ?? rawBalance;
  const isSpinning = outcome.status === "spinning";
  const winLines = outcome.status === "won" ? outcome.wins : [];
  const winningRows = new Set(winLines.map((w) => w.row));
  const betE8s = BigInt(Math.round(betIcp * 1e8));
  const betMutation = useMutation({
    mutationFn: async (amountE8s) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.placeMidnightDragonsBet(amountE8s);
    },
    onMutate: () => {
      setOutcome({ status: "spinning" });
      setSpinningReels(Array(REELS_COUNT).fill(true));
      spinTimeouts.current.forEach(clearTimeout);
      spinTimeouts.current = [];
    },
    onSuccess: (result) => {
      if (result.__kind__ !== "ok") {
        setSpinningReels(Array(REELS_COUNT).fill(false));
        setOutcome({ status: "idle" });
        return;
      }
      const { transaction: tx, newBalance } = result.ok;
      const isWin = tx.netAmount >= 0n;
      const newGrid = Array.from(
        { length: REELS_COUNT },
        () => Array.from({ length: ROWS_COUNT }, () => randomSymbol())
      );
      for (let i = 0; i < REELS_COUNT; i++) {
        const t = setTimeout(
          () => {
            setGrid((prev) => {
              const updated = [...prev];
              updated[i] = newGrid[i];
              return updated;
            });
            setSpinningReels((prev) => {
              const updated = [...prev];
              updated[i] = false;
              return updated;
            });
            if (i === REELS_COUNT - 1) {
              const detectedWins = isWin ? detectWins(newGrid) : [];
              const payout = detectedWins.reduce(
                (sum, w) => sum + betIcp * w.multiplier,
                0
              );
              setLocalBalance(newBalance);
              setOutcome(
                isWin ? {
                  status: "won",
                  tx,
                  newBalance,
                  wins: detectedWins,
                  payout
                } : { status: "lost", tx, newBalance }
              );
              queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
              queryClient.invalidateQueries({ queryKey: ["transactions"] });
            }
          },
          800 + i * 400
        );
        spinTimeouts.current.push(t);
      }
    },
    onError: () => {
      setSpinningReels(Array(REELS_COUNT).fill(false));
      setOutcome({ status: "idle" });
    }
  });
  const spin = reactExports.useCallback(() => {
    if (isSpinning || !isConnected) return;
    if (betE8s > balance) return;
    betMutation.mutate(betE8s);
  }, [isSpinning, isConnected, betE8s, balance, betMutation]);
  reactExports.useEffect(() => {
    return () => {
      spinTimeouts.current.forEach(clearTimeout);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "w-full py-10",
      style: { background: "oklch(0.04 0.03 240)" },
      "data-ocid": "midnight-dragons",
      "aria-label": "Midnight Dragons slot machine",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-xl overflow-hidden shadow-dragon-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DragonBanner, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl overflow-hidden relative",
            style: {
              background: "oklch(0.06 0.04 240)",
              border: "2px solid oklch(0.3 0.15 240 / 0.6)",
              boxShadow: "0 0 60px oklch(0.3 0.2 240 / 0.3), 0 0 20px oklch(0.72 0.18 65 / 0.15), inset 0 0 40px oklch(0.04 0.03 240 / 0.8)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-2 left-2 w-6 h-6 rounded-tl-lg",
                    style: {
                      border: "2px solid oklch(0.72 0.18 65 / 0.7)",
                      borderRight: "none",
                      borderBottom: "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-2 right-2 w-6 h-6 rounded-tr-lg",
                    style: {
                      border: "2px solid oklch(0.45 0.25 240 / 0.7)",
                      borderLeft: "none",
                      borderBottom: "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "overflow-hidden mx-auto rounded-lg",
                    style: {
                      width: REELS_COUNT * 80,
                      height: ROWS_COUNT * 80,
                      background: "oklch(0.05 0.04 240)",
                      border: "1px solid oklch(0.2 0.1 240 / 0.4)",
                      position: "relative"
                    },
                    children: [
                      winLines.map((win) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute left-0 right-0 pointer-events-none z-20",
                          style: {
                            top: win.row * 80,
                            height: 80,
                            background: "linear-gradient(90deg, oklch(0.72 0.18 65 / 0.10) 0%, oklch(0.72 0.18 65 / 0.25) 50%, oklch(0.72 0.18 65 / 0.10) 100%)",
                            border: "1px solid oklch(0.72 0.18 65 / 0.55)",
                            boxShadow: "0 0 20px oklch(0.72 0.18 65 / 0.35)",
                            animation: "goldShimmer 1.2s ease-in-out infinite"
                          }
                        },
                        win.row
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: grid.map((reelSymbols, reelIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Reel,
                        {
                          symbols: reelSymbols,
                          isSpinning: spinningReels[reelIdx],
                          winningRows,
                          spinDuration: 300 + reelIdx * 30
                        },
                        REEL_IDS[reelIdx]
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-2 left-2 w-6 h-6 rounded-bl-lg",
                    style: {
                      border: "2px solid oklch(0.45 0.25 240 / 0.7)",
                      borderRight: "none",
                      borderTop: "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-2 right-2 w-6 h-6 rounded-br-lg",
                    style: {
                      border: "2px solid oklch(0.72 0.18 65 / 0.7)",
                      borderLeft: "none",
                      borderTop: "none"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-4",
                  style: {
                    background: "oklch(0.08 0.05 240)",
                    borderTop: "1px solid oklch(0.25 0.12 240 / 0.4)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold uppercase tracking-widest",
                            style: { color: "oklch(0.6 0.1 240)" },
                            children: "Balance"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-mono font-bold text-sm",
                            style: { color: "#D4AF37" },
                            "data-ocid": "wallet-balance",
                            children: [
                              formatICP(balance),
                              " ICP"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold uppercase tracking-widest",
                            style: { color: "oklch(0.6 0.1 240)" },
                            children: "Bet"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: BET_OPTIONS_ICP.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => !isSpinning && setBetIcp(b),
                            disabled: isSpinning || !isConnected,
                            className: "px-3 py-1.5 rounded-md text-sm font-bold transition-all duration-200 disabled:opacity-50",
                            style: {
                              background: betIcp === b ? "oklch(0.72 0.18 65 / 0.25)" : "oklch(0.12 0.06 240)",
                              color: betIcp === b ? "#D4AF37" : "oklch(0.65 0.1 240)",
                              border: betIcp === b ? "1.5px solid oklch(0.72 0.18 65 / 0.8)" : "1px solid oklch(0.25 0.1 240 / 0.5)",
                              boxShadow: betIcp === b ? "0 0 12px oklch(0.72 0.18 65 / 0.4)" : "none"
                            },
                            "data-ocid": `bet-${b}`,
                            "aria-label": `Bet ${b} ICP`,
                            "aria-pressed": betIcp === b,
                            children: [
                              b,
                              " ICP"
                            ]
                          },
                          b
                        )) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        outcome.status === "won" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "px-4 py-1.5 rounded-lg text-sm font-bold",
                            style: {
                              background: "oklch(0.72 0.18 65 / 0.15)",
                              border: "1px solid oklch(0.72 0.18 65 / 0.6)",
                              color: "#D4AF37",
                              boxShadow: "0 0 16px oklch(0.72 0.18 65 / 0.35)",
                              animation: "goldShimmer 1.5s ease-in-out infinite"
                            },
                            "data-ocid": "win-display",
                            children: [
                              "🏆 +",
                              outcome.payout.toFixed(2),
                              " ICP"
                            ]
                          }
                        ),
                        outcome.status === "lost" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "px-4 py-1.5 rounded-lg text-sm font-medium",
                            style: {
                              background: "oklch(0.1 0.04 240 / 0.6)",
                              border: "1px solid oklch(0.3 0.1 240 / 0.4)",
                              color: "oklch(0.5 0.1 240)"
                            },
                            "data-ocid": "loss-display",
                            children: "No match — try again"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: spin,
                          disabled: isSpinning || !isConnected || betE8s > balance,
                          className: "relative px-8 py-3 rounded-xl font-display font-bold text-lg uppercase tracking-wider transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
                          style: {
                            background: isSpinning ? "oklch(0.40 0.15 300 / 0.5)" : "linear-gradient(135deg, #D4AF37 0%, #a07830 60%, #D4AF37 100%)",
                            color: "#1a0d3a",
                            border: "2px solid oklch(0.72 0.18 65 / 0.8)",
                            boxShadow: isSpinning ? "none" : "0 0 24px oklch(0.72 0.18 65 / 0.45), 0 4px 12px oklch(0.2 0.1 45 / 0.5)",
                            minWidth: 140
                          },
                          onMouseEnter: (e) => {
                            if (!isSpinning && isConnected) {
                              e.currentTarget.style.boxShadow = "0 0 32px oklch(0.72 0.18 65 / 0.6), 0 0 24px oklch(0.45 0.25 240 / 0.3), 0 4px 12px oklch(0.2 0.1 45 / 0.5)";
                            }
                          },
                          onMouseLeave: (e) => {
                            if (!isSpinning && isConnected) {
                              e.currentTarget.style.boxShadow = "0 0 24px oklch(0.72 0.18 65 / 0.45), 0 4px 12px oklch(0.2 0.1 45 / 0.5)";
                            }
                          },
                          "data-ocid": "spin-btn",
                          "aria-label": isSpinning ? "Spinning…" : "Spin the reels",
                          children: isSpinning ? "SPINNING…" : "SPIN"
                        }
                      )
                    ] }),
                    winLines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-3 pt-3 flex flex-wrap gap-2",
                        style: { borderTop: "1px solid oklch(0.72 0.18 65 / 0.2)" },
                        children: winLines.map((win) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                            style: {
                              background: "oklch(0.72 0.18 65 / 0.12)",
                              border: "1px solid oklch(0.72 0.18 65 / 0.4)",
                              color: "#D4AF37"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                "Row ",
                                win.row + 1
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.6 0.08 240)" }, children: "·" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getSymbolDef(win.symbol).label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.6 0.08 240)" }, children: "·" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.85 0.18 65)" }, children: [
                                win.count,
                                "× = ",
                                win.multiplier,
                                "x"
                              ] })
                            ]
                          },
                          win.row
                        ))
                      }
                    ),
                    (outcome.status === "won" || outcome.status === "lost") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "mt-2 text-xs text-center font-mono",
                        style: { color: "rgba(212,175,55,0.55)" },
                        children: [
                          "New balance: ",
                          formatICP(outcome.newBalance),
                          " ICP"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "mt-2 text-center text-xs",
                        style: { color: "oklch(0.35 0.06 240)" },
                        "data-ocid": "house-edge-note",
                        children: "House edge: ~8% · Real ICP bets · RTP 92%"
                      }
                    )
                  ]
                }
              ),
              !isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                WalletGateOverlay,
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
            className: "mt-4 rounded-xl p-4 grid grid-cols-4 gap-2",
            style: {
              background: "oklch(0.06 0.04 240 / 0.8)",
              border: "1px solid oklch(0.2 0.1 240 / 0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "col-span-4 text-center text-xs font-semibold uppercase tracking-widest mb-2",
                  style: { color: "oklch(0.55 0.15 240)" },
                  children: "Paytable — Win Multipliers"
                }
              ),
              Object.entries(MULTIPLIERS).map(([count, mult]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-1.5 rounded-lg",
                  style: {
                    background: "oklch(0.08 0.05 240 / 0.6)",
                    border: "1px solid oklch(0.2 0.08 240 / 0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-base font-bold",
                        style: { color: "oklch(0.7 0.15 65)" },
                        children: [
                          mult,
                          "x"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-xs",
                        style: { color: "oklch(0.45 0.08 240)" },
                        children: [
                          count,
                          " match"
                        ]
                      }
                    )
                  ]
                },
                count
              ))
            ]
          }
        )
      ] })
    }
  );
}
function LobbyPage({ onPlay, onVersusMode }) {
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
              className: "flex flex-col items-center justify-center py-24 rounded-xl",
              style: {
                background: "oklch(0.10 0.01 45)",
                border: "1px solid oklch(0.25 0.05 65 / 0.40)"
              },
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
        onVersusMode && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "versus-mode", "aria-label": "Versus Mode", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onVersusMode,
            className: "w-full rounded-2xl p-6 border text-left transition-smooth hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-primary",
            style: {
              background: "linear-gradient(135deg, oklch(0.13 0.01 45), oklch(0.09 0.01 300 / 0.4))",
              borderColor: "oklch(0.45 0.15 300 / 0.5)",
              boxShadow: "0 0 32px oklch(0.45 0.15 300 / 0.15)"
            },
            "data-ocid": "versus-mode-banner",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "⚔️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display text-2xl font-bold",
                      style: { color: "oklch(0.82 0.18 65)" },
                      children: "Versus Mode"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider",
                      style: {
                        background: "oklch(0.45 0.15 300 / 0.2)",
                        color: "oklch(0.72 0.15 300)",
                        border: "1px solid oklch(0.45 0.15 300 / 0.4)"
                      },
                      children: "PvP"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.60 0.03 65)" }, children: "Challenge real players in Chess, Dice Roll, and Rock Paper Scissors. Wager 10, 30, or 100 ICP — winner takes all." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "shrink-0 ml-6 px-5 py-2.5 rounded-xl font-semibold text-sm transition-smooth",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                    color: "oklch(0.07 0 0)"
                  },
                  children: "Play Now →"
                }
              )
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "midnight-dragons", "aria-label": "Midnight Dragons slot machine", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Midnight Dragons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider",
                style: {
                  background: "rgba(212,175,55,0.15)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.35)"
                },
                children: "8×8 Slots"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MidnightDragons, {})
        ] })
      ]
    }
  );
}
export {
  LobbyPage as default
};
