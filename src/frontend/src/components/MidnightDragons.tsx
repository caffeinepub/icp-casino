import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { Transaction } from "../backend";
import { useIcpWallet } from "../hooks/use-icp-wallet";
import { formatICP, useWallet } from "../hooks/use-wallet";

// ── Symbol definitions ─────────────────────────────────────────────────────────

const SYMBOL_NAMES = [
  "fire-breath",
  "dragon-scale",
  "dragon-eye",
  "ruby-gem",
  "royal-crown",
  "midnight-moon",
  "dragon-claw",
  "wild-dragon",
] as const;

type SymbolName = (typeof SYMBOL_NAMES)[number];

interface SymbolDef {
  id: SymbolName;
  label: string;
  weight: number;
  svg: string;
}

const SYMBOLS: SymbolDef[] = [
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
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
    </svg>`,
  },
];

// Build weighted pool
const SYMBOL_POOL: SymbolName[] = SYMBOLS.flatMap((s) =>
  Array(s.weight).fill(s.id),
);

function randomSymbol(): SymbolName {
  return SYMBOL_POOL[Math.floor(Math.random() * SYMBOL_POOL.length)];
}

function getSymbolDef(id: SymbolName): SymbolDef {
  return SYMBOLS.find((s) => s.id === id) ?? SYMBOLS[0];
}

// ── Win detection ──────────────────────────────────────────────────────────────

const MULTIPLIERS: Record<number, number> = {
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7: 12,
  8: 25,
};

interface WinLine {
  row: number;
  symbol: SymbolName;
  count: number;
  multiplier: number;
}

function detectWins(grid: SymbolName[][]): WinLine[] {
  const wins: WinLine[] = [];
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
        multiplier: MULTIPLIERS[count] ?? 0,
      });
    }
  }

  return wins;
}

// ── Symbol Cell Component ──────────────────────────────────────────────────────

function SymbolCell({
  id,
  isWinning,
  isSpinning,
}: {
  id: SymbolName;
  isWinning: boolean;
  isSpinning: boolean;
}) {
  const def = getSymbolDef(id);
  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-300 ${
        isWinning ? "scale-105 z-10" : ""
      }`}
      style={{
        width: 72,
        height: 72,
        background: isWinning
          ? "radial-gradient(ellipse at center, oklch(0.35 0.18 300 / 0.7) 0%, oklch(0.18 0.12 300 / 0.5) 100%)"
          : "radial-gradient(ellipse at 40% 35%, oklch(0.14 0.07 240 / 0.7) 0%, oklch(0.07 0.04 240 / 0.4) 100%)",
        border: isWinning
          ? "1.5px solid oklch(0.72 0.18 65 / 0.95)"
          : "1px solid oklch(0.22 0.08 240 / 0.35)",
        borderRadius: 8,
        boxShadow: isWinning
          ? "0 0 20px oklch(0.72 0.18 65 / 0.7), 0 0 40px oklch(0.72 0.18 65 / 0.35), inset 0 0 10px oklch(0.72 0.18 65 / 0.25)"
          : isSpinning
            ? "none"
            : "inset 0 1px 0 oklch(1 0 0 / 0.04), inset 0 -1px 0 oklch(0 0 0 / 0.3)",
        filter: isSpinning ? "blur(1px)" : "none",
        opacity: isSpinning ? 0.65 : 1,
        animation: isWinning
          ? "cellWinPulse 1.4s ease-in-out infinite"
          : undefined,
      }}
    >
      {/* Winning shimmer */}
      {isWinning && (
        <div
          className="absolute inset-0 shimmer-overlay rounded-lg pointer-events-none"
          style={{ opacity: 0.5 }}
        />
      )}
      <div
        className="w-14 h-14"
        style={{
          filter: isWinning
            ? "drop-shadow(0 0 5px oklch(0.72 0.18 65 / 0.9))"
            : "drop-shadow(0 2px 3px oklch(0 0 0 / 0.6))",
        }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled SVG string from SYMBOLS const
        dangerouslySetInnerHTML={{ __html: def.svg }}
      />
    </div>
  );
}

// ── Reel Component ─────────────────────────────────────────────────────────────

interface ReelProps {
  symbols: SymbolName[];
  isSpinning: boolean;
  winningRows: Set<number>;
  spinDuration: number;
}

function Reel({ symbols, isSpinning, winningRows, spinDuration }: ReelProps) {
  const strip = [...symbols, ...symbols, ...symbols].map((sym, pos) => ({
    sym,
    key: `${pos}-${sym}`,
  }));

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 80,
        height: 8 * 80,
        background:
          "linear-gradient(180deg, oklch(0.05 0.04 240 / 0.95), oklch(0.07 0.05 240 / 0.9))",
        borderLeft: "1px solid oklch(0.18 0.08 240 / 0.25)",
        borderRight: "1px solid oklch(0.18 0.08 240 / 0.25)",
      }}
    >
      {/* Top reel shadow — glass pane illusion */}
      <div
        className="absolute inset-x-0 top-0 z-20 pointer-events-none"
        style={{
          height: 24,
          background:
            "linear-gradient(180deg, oklch(0.04 0.03 240 / 0.9) 0%, transparent 100%)",
        }}
      />
      {/* Bottom reel shadow */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{
          height: 24,
          background:
            "linear-gradient(0deg, oklch(0.04 0.03 240 / 0.9) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
          animation: isSpinning
            ? `dragonReelSpin ${spinDuration}ms linear infinite`
            : "none",
          filter: isSpinning ? "blur(2.5px)" : "none",
          transition: isSpinning ? "none" : "filter 0.25s ease",
        }}
      >
        {strip.map(({ sym, key }) => {
          const pos = Number(key.split("-")[0]);
          const rowInGrid = pos % ROWS_COUNT;
          return (
            <div
              key={key}
              className="flex items-center justify-center"
              style={{ width: 80, height: 80, padding: 4 }}
            >
              <SymbolCell
                id={sym}
                isWinning={!isSpinning && winningRows.has(rowInGrid)}
                isSpinning={isSpinning}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Dragon Banner SVG ──────────────────────────────────────────────────────────

function DragonBanner() {
  return (
    <svg
      viewBox="0 0 800 140"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ maxHeight: 140 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="banner-bg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0a1540" />
          <stop offset="35%" stopColor="#080e28" />
          <stop offset="65%" stopColor="#080e28" />
          <stop offset="100%" stopColor="#0a1540" />
        </linearGradient>
        <linearGradient id="gold-dragon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c76a" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#a07830" />
        </linearGradient>
        <linearGradient id="blue-dragon" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a7ae8" />
          <stop offset="60%" stopColor="#2952c4" />
          <stop offset="100%" stopColor="#0d1f7a" />
        </linearGradient>
        <linearGradient id="title-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a7ae8" />
          <stop offset="40%" stopColor="#8aadff" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#e8c76a" />
        </linearGradient>
        <filter id="title-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dragon-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="800" height="140" fill="url(#banner-bg)" rx="8" />

      {(
        [
          [50, 20],
          [150, 10],
          [350, 15],
          [450, 25],
          [650, 10],
          [750, 30],
          [100, 110],
          [700, 100],
          [400, 8],
        ] as [number, number][]
      ).map(([x, y]) => (
        <circle
          key={`star-${x}-${y}`}
          cx={x}
          cy={y}
          r="1.5"
          fill={x % 2 === 0 ? "#4a7ae8" : "#D4AF37"}
          opacity="0.7"
        />
      ))}

      <g transform="translate(60,70) scale(1.4)" filter="url(#dragon-glow)">
        <path
          d="M0,0 C-20,-15 -35,-25 -30,-40 C-25,-55 -10,-55 0,-42 C10,-55 25,-55 30,-40 C35,-25 20,-15 0,0Z"
          fill="url(#gold-dragon)"
        />
        <ellipse cx="0" cy="-42" rx="18" ry="14" fill="#D4AF37" />
        <ellipse cx="0" cy="-30" rx="10" ry="7" fill="#a07830" />
        <circle cx="-8" cy="-44" r="5" fill="#7B2FBE" />
        <circle cx="-8" cy="-44" r="2" fill="#1a0d3a" />
        <path d="M-4,-54 L-8,-70 L0,-55Z" fill="#d4a843" />
        <path
          d="M-30,-30 C-60,-20 -70,5 -55,10 C-45,14 -35,5 -25,-5Z"
          fill="#a07830"
          opacity="0.9"
        />
        <path
          d="M0,0 C-5,15 -15,25 -20,40 C-18,50 -8,48 -5,38 C-2,28 0,20 5,15Z"
          fill="#D4AF37"
        />
      </g>

      <g
        transform="translate(740,70) scale(-1.4,1.4)"
        filter="url(#dragon-glow)"
      >
        <path
          d="M0,0 C-20,-15 -35,-25 -30,-40 C-25,-55 -10,-55 0,-42 C10,-55 25,-55 30,-40 C35,-25 20,-15 0,0Z"
          fill="url(#blue-dragon)"
        />
        <ellipse cx="0" cy="-42" rx="18" ry="14" fill="#2952c4" />
        <ellipse cx="0" cy="-30" rx="10" ry="7" fill="#1a3a9a" />
        <circle cx="-8" cy="-44" r="5" fill="#D4AF37" />
        <circle cx="-8" cy="-44" r="2" fill="#00050a" />
        <path d="M-4,-54 L-8,-70 L0,-55Z" fill="#d4a843" />
        <path
          d="M-30,-30 C-60,-20 -70,5 -55,10 C-45,14 -35,5 -25,-5Z"
          fill="#0d1f7a"
          opacity="0.9"
        />
        <path
          d="M0,0 C-5,15 -15,25 -20,40 C-18,50 -8,48 -5,38 C-2,28 0,20 5,15Z"
          fill="#2952c4"
        />
      </g>

      <text
        x="400"
        y="82"
        fontFamily="Georgia, serif"
        fontSize="46"
        fontWeight="bold"
        fill="url(#title-grad)"
        textAnchor="middle"
        letterSpacing="4"
        filter="url(#title-glow)"
        opacity="0.5"
      >
        MIDNIGHT DRAGONS
      </text>
      <text
        x="400"
        y="82"
        fontFamily="Georgia, serif"
        fontSize="46"
        fontWeight="bold"
        fill="url(#title-grad)"
        textAnchor="middle"
        letterSpacing="4"
      >
        MIDNIGHT DRAGONS
      </text>

      <line
        x1="140"
        y1="95"
        x2="320"
        y2="95"
        stroke="#2952c4"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="480"
        y1="95"
        x2="660"
        y2="95"
        stroke="#D4AF37"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="400" cy="95" r="3" fill="#d4a843" opacity="0.8" />
    </svg>
  );
}

// ── Wallet Gate ────────────────────────────────────────────────────────────────

function WalletGateOverlay({
  isConnecting,
  onConnect,
  connectError,
}: {
  isConnecting: boolean;
  onConnect: () => Promise<void>;
  connectError: string | null;
}) {
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 rounded-2xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(8,3,24,0.97) 0%, rgba(4,2,14,0.98) 100%)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(212,175,55,0.3)",
        boxShadow: "inset 0 1px 0 rgba(212,175,55,0.15)",
      }}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full"
        style={{
          background: "rgba(212,175,55,0.09)",
          border: "2px solid rgba(212,175,55,0.55)",
          boxShadow: "0 0 24px rgba(212,175,55,0.3)",
        }}
      >
        <Wallet className="w-8 h-8" style={{ color: "#D4AF37" }} />
      </div>
      <div className="text-center px-8">
        <p
          className="heading-cinematic text-xl mb-1 text-gold-glow"
          style={{ color: "#D4AF37" }}
        >
          Connect Your Plug Wallet to Play
        </p>
        <p className="text-sm" style={{ color: "#C4B5FD" }}>
          Real ICP bets only — Midnight Dragons uses live wagers
        </p>
      </div>
      {connectError && (
        <p
          className="text-xs px-6 max-w-xs text-center"
          style={{ color: "#9333EA" }}
        >
          {connectError}
        </p>
      )}
      <button
        type="button"
        onClick={onConnect}
        disabled={isConnecting}
        data-ocid="wallet-gate-connect-btn"
        className="btn-premium px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: isConnecting
            ? "rgba(99,102,241,0.4)"
            : "linear-gradient(135deg, oklch(0.62 0.22 265) 0%, oklch(0.52 0.22 265) 40%, oklch(0.44 0.22 265) 100%)",
          color: "oklch(0.97 0 0)",
          boxShadow: isConnecting
            ? "none"
            : "0 4px 24px rgba(99,102,241,0.55), 0 2px 0 rgba(70,58,180,0.6), inset 0 1px 0 rgba(180,185,255,0.25)",
        }}
      >
        {isConnecting ? "Connecting…" : "Connect Wallet"}
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

const REELS_COUNT = 8;
const ROWS_COUNT = 8;
const BET_OPTIONS_ICP = [0.1, 0.5, 1.0];

const REEL_IDS = ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7"] as const;

function initGrid(): SymbolName[][] {
  return Array.from({ length: REELS_COUNT }, () =>
    Array.from({ length: ROWS_COUNT }, () => randomSymbol()),
  );
}

type DragonOutcome =
  | { status: "idle" }
  | { status: "spinning" }
  | {
      status: "won";
      tx: Transaction;
      newBalance: bigint;
      wins: WinLine[];
      payout: number;
    }
  | { status: "lost"; tx: Transaction; newBalance: bigint };

export function MidnightDragons() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance: rawBalance } = useWallet();
  const { isConnected, isConnecting, connectError, connect } = useIcpWallet();

  const [grid, setGrid] = useState<SymbolName[][]>(initGrid);
  const [spinningReels, setSpinningReels] = useState<boolean[]>(
    Array(REELS_COUNT).fill(false),
  );
  const [betIcp, setBetIcp] = useState(0.5);
  const [outcome, setOutcome] = useState<DragonOutcome>({ status: "idle" });
  const [localBalance, setLocalBalance] = useState<bigint | null>(null);
  const spinTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const balance = localBalance ?? rawBalance;

  const isSpinning = outcome.status === "spinning";
  const winLines = outcome.status === "won" ? outcome.wins : [];
  const winningRows = new Set(winLines.map((w) => w.row));

  const betE8s = BigInt(Math.round(betIcp * 100_000_000));

  // ── Backend bet mutation ────────────────────────────────────────────────────

  const betMutation = useMutation({
    mutationFn: async (amountE8s: bigint) => {
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

      const newGrid = Array.from({ length: REELS_COUNT }, () =>
        Array.from({ length: ROWS_COUNT }, () => randomSymbol()),
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
                0,
              );
              setLocalBalance(newBalance);
              setOutcome(
                isWin
                  ? {
                      status: "won",
                      tx,
                      newBalance,
                      wins: detectedWins,
                      payout,
                    }
                  : { status: "lost", tx, newBalance },
              );
              queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
              queryClient.invalidateQueries({ queryKey: ["transactions"] });
            }
          },
          800 + i * 400,
        );
        spinTimeouts.current.push(t);
      }
    },
    onError: () => {
      setSpinningReels(Array(REELS_COUNT).fill(false));
      setOutcome({ status: "idle" });
    },
  });

  const spin = useCallback(() => {
    if (isSpinning || !isConnected) return;
    if (betE8s > balance) return;
    betMutation.mutate(betE8s);
  }, [isSpinning, isConnected, betE8s, balance, betMutation]);

  useEffect(() => {
    return () => {
      spinTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      className="w-full py-12"
      style={{
        /* Deep purple radial vignette for dramatic atmosphere */
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(10,6,30,1) 0%, rgba(4,2,14,0.98) 60%, rgba(2,1,8,1) 100%)",
      }}
      data-ocid="midnight-dragons"
      aria-label="Midnight Dragons slot machine"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* ── Section title ── */}
        <div className="text-center mb-8">
          <h2
            className="heading-cinematic text-gold-glow"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              background:
                "linear-gradient(135deg, #4a7ae8 0%, #8aadff 30%, #D4AF37 65%, #e8c76a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🐉 Midnight Dragons 🐉
          </h2>
          <p
            className="mt-2 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "rgba(164,128,255,0.65)", letterSpacing: "0.2em" }}
          >
            8×8 Premium Dragon Slot · Up to 25× Multiplier
          </p>
        </div>

        {/* Dragon Banner */}
        <div
          className="mb-6 rounded-xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 40px oklch(0.45 0.25 240 / 0.5), 0 0 80px oklch(0.72 0.18 65 / 0.15)",
          }}
        >
          <DragonBanner />
        </div>

        {/* ── Main game cabinet ── */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            /* Premium metallic cabinet */
            borderTop: "2px solid rgba(212,175,55,0.5)",
            borderLeft: "2px solid rgba(212,175,55,0.3)",
            borderRight: "1px solid rgba(60,40,10,0.5)",
            borderBottom: "1px solid rgba(40,20,5,0.6)",
            boxShadow: [
              "0 0 60px 8px rgba(74,122,232,0.2)",
              "0 0 30px 2px rgba(212,175,55,0.12)",
              "0 24px 80px rgba(0,0,0,0.85)",
              "inset 0 2px 0 rgba(255,220,100,0.18)",
              "inset 0 -2px 0 rgba(30,15,60,0.5)",
            ].join(", "),
          }}
        >
          {/* Top gold light strip */}
          <div className="cinematic-top-light" />

          {/* Cabinet header strip */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,6,30,0.98) 0%, rgba(8,4,22,0.95) 100%)",
              borderBottom: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Corner accent dots */}
              {(["gold-a", "blue-a", "gold-b", "blue-b"] as const).map(
                (id, i) => (
                  <div
                    key={id}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(212,175,55,0.7)"
                          : "rgba(74,122,232,0.6)",
                      boxShadow:
                        i % 2 === 0
                          ? "0 0 6px rgba(212,175,55,0.8)"
                          : "0 0 6px rgba(74,122,232,0.8)",
                    }}
                  />
                ),
              )}
            </div>
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.5)", letterSpacing: "0.22em" }}
            >
              ⬦ DRAGON REELS ⬦
            </span>
            <div className="flex items-center gap-3">
              {(["blue-c", "gold-c", "blue-d", "gold-d"] as const).map(
                (id, i) => (
                  <div
                    key={id}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(74,122,232,0.6)"
                          : "rgba(212,175,55,0.7)",
                      boxShadow:
                        i % 2 === 0
                          ? "0 0 6px rgba(74,122,232,0.8)"
                          : "0 0 6px rgba(212,175,55,0.8)",
                    }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Reel grid container */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(6,3,18,0.98) 0%, rgba(8,4,22,0.95) 100%)",
              borderBottom: "1px solid rgba(74,122,232,0.2)",
            }}
          >
            <div className="relative p-3">
              {/* Frame corner accents */}
              <div
                className="absolute top-2 left-2 w-7 h-7 pointer-events-none"
                style={{
                  border: "2px solid rgba(212,175,55,0.65)",
                  borderRight: "none",
                  borderBottom: "none",
                  borderRadius: 4,
                }}
              />
              <div
                className="absolute top-2 right-2 w-7 h-7 pointer-events-none"
                style={{
                  border: "2px solid rgba(212,175,55,0.65)",
                  borderLeft: "none",
                  borderBottom: "none",
                  borderRadius: 4,
                }}
              />
              <div
                className="absolute bottom-2 left-2 w-7 h-7 pointer-events-none"
                style={{
                  border: "2px solid rgba(74,122,232,0.6)",
                  borderRight: "none",
                  borderTop: "none",
                  borderRadius: 4,
                }}
              />
              <div
                className="absolute bottom-2 right-2 w-7 h-7 pointer-events-none"
                style={{
                  border: "2px solid rgba(74,122,232,0.6)",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRadius: 4,
                }}
              />

              {/* Reel viewport with inset depth */}
              <div
                className="overflow-hidden mx-auto rounded-xl"
                style={{
                  width: REELS_COUNT * 80,
                  height: ROWS_COUNT * 80,
                  background: "oklch(0.04 0.03 240)",
                  border: "1px solid oklch(0.15 0.06 240 / 0.5)",
                  boxShadow:
                    "inset 0 4px 20px rgba(0,0,0,0.9), inset 0 -4px 12px rgba(30,15,60,0.5)",
                  position: "relative",
                }}
              >
                {/* Win row highlights */}
                {winLines.map((win) => (
                  <div
                    key={win.row}
                    className="absolute left-0 right-0 pointer-events-none z-20"
                    style={{
                      top: win.row * 80,
                      height: 80,
                      background:
                        "linear-gradient(90deg, oklch(0.72 0.18 65 / 0.05) 0%, oklch(0.72 0.18 65 / 0.22) 30%, oklch(0.72 0.18 65 / 0.30) 50%, oklch(0.72 0.18 65 / 0.22) 70%, oklch(0.72 0.18 65 / 0.05) 100%)",
                      borderTop: "1px solid oklch(0.72 0.18 65 / 0.6)",
                      borderBottom: "1px solid oklch(0.72 0.18 65 / 0.6)",
                      boxShadow: "0 0 24px oklch(0.72 0.18 65 / 0.4)",
                      animation: "goldShimmer 1.6s ease-in-out infinite",
                    }}
                  />
                ))}

                {/* Reels */}
                <div className="flex">
                  {grid.map((reelSymbols, reelIdx) => (
                    <Reel
                      key={REEL_IDS[reelIdx]}
                      symbols={reelSymbols}
                      isSpinning={spinningReels[reelIdx]}
                      winningRows={winningRows}
                      spinDuration={300 + reelIdx * 30}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Controls bar ── */}
          <div
            className="px-6 py-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,4,22,0.98) 0%, rgba(10,5,26,0.95) 100%)",
              borderTop: "1px solid rgba(74,122,232,0.2)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Balance display */}
              <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "rgba(164,128,255,0.7)" }}
                >
                  BAL
                </span>
                <span
                  className="font-mono font-bold text-sm text-gold-glow wallet-balance"
                  style={{ color: "#D4AF37" }}
                  data-ocid="wallet-balance"
                >
                  {formatICP(balance)} ICP
                </span>
              </div>

              {/* Bet selector */}
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: "rgba(164,128,255,0.65)",
                    letterSpacing: "0.18em",
                  }}
                >
                  BET
                </span>
                <div className="flex gap-2">
                  {BET_OPTIONS_ICP.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => !isSpinning && setBetIcp(b)}
                      disabled={isSpinning || !isConnected}
                      className="px-3 py-1.5 rounded-lg text-sm font-black btn-premium disabled:opacity-50"
                      style={{
                        background:
                          betIcp === b
                            ? "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(180,130,40,0.12))"
                            : "rgba(20,10,45,0.7)",
                        color:
                          betIcp === b ? "#D4AF37" : "rgba(164,128,255,0.7)",
                        border:
                          betIcp === b
                            ? "1.5px solid rgba(212,175,55,0.85)"
                            : "1px solid rgba(74,122,232,0.35)",
                        boxShadow:
                          betIcp === b
                            ? "0 0 14px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,220,100,0.2)"
                            : "inset 0 1px 0 rgba(255,255,255,0.04)",
                        transform: betIcp === b ? "scale(1.05)" : "scale(1)",
                      }}
                      data-ocid={`bet-${b}`}
                      aria-label={`Bet ${b} ICP`}
                      aria-pressed={betIcp === b}
                    >
                      {b} ICP
                    </button>
                  ))}
                </div>
              </div>

              {/* Win display */}
              <div className="flex items-center min-w-[120px] justify-center">
                {outcome.status === "won" && (
                  <div
                    className="relative overflow-hidden px-4 py-1.5 rounded-xl text-sm font-black"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.65)",
                      color: "#D4AF37",
                      boxShadow:
                        "0 0 20px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,220,100,0.2)",
                    }}
                    data-ocid="win-display"
                  >
                    <div
                      className="absolute inset-0 shimmer-overlay pointer-events-none"
                      style={{ opacity: 0.5 }}
                    />
                    <span className="relative z-10 text-gold-glow">
                      🏆 +{outcome.payout.toFixed(2)} ICP
                    </span>
                  </div>
                )}
                {outcome.status === "lost" && (
                  <div
                    className="px-4 py-1.5 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(60,30,100,0.25)",
                      border: "1px solid rgba(74,122,232,0.3)",
                      color: "rgba(164,128,255,0.65)",
                    }}
                    data-ocid="loss-display"
                  >
                    No match — try again
                  </div>
                )}
              </div>

              {/* Spin button */}
              <button
                type="button"
                onClick={spin}
                disabled={isSpinning || !isConnected || betE8s > balance}
                className="relative px-8 py-3.5 rounded-xl font-black text-lg uppercase tracking-wider overflow-hidden"
                style={{
                  letterSpacing: "0.18em",
                  background: isSpinning
                    ? "rgba(99,102,241,0.25)"
                    : "linear-gradient(135deg, oklch(0.65 0.22 265) 0%, oklch(0.55 0.22 265) 35%, oklch(0.46 0.22 265) 65%, oklch(0.40 0.22 265) 100%)",
                  color: "oklch(0.97 0 0)",
                  borderTop: "2px solid rgba(180,185,255,0.4)",
                  borderLeft: "2px solid rgba(160,165,255,0.3)",
                  borderRight: "1px solid rgba(40,30,120,0.5)",
                  borderBottom: "2px solid rgba(30,20,100,0.6)",
                  boxShadow: isSpinning
                    ? "none"
                    : [
                        "inset 0 2px 0 rgba(180,185,255,0.35)",
                        "inset 0 -3px 0 rgba(40,30,120,0.45)",
                        "0 0 32px rgba(99,102,241,0.5)",
                        "0 0 60px rgba(99,102,241,0.2)",
                        "0 6px 24px rgba(0,0,0,0.7)",
                      ].join(", "),
                  minWidth: 140,
                  cursor:
                    isSpinning || !isConnected || betE8s > balance
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    isSpinning || !isConnected || betE8s > balance ? 0.6 : 1,
                  transition: "all 0.15s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) => {
                  if (!isSpinning && isConnected) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = [
                      "inset 0 2px 0 rgba(180,185,255,0.35)",
                      "inset 0 -3px 0 rgba(40,30,120,0.45)",
                      "0 0 48px rgba(99,102,241,0.65)",
                      "0 0 80px rgba(99,102,241,0.3)",
                      "0 10px 32px rgba(0,0,0,0.75)",
                    ].join(", ");
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "";
                  el.style.boxShadow = isSpinning
                    ? "none"
                    : [
                        "inset 0 2px 0 rgba(180,185,255,0.35)",
                        "inset 0 -3px 0 rgba(40,30,120,0.45)",
                        "0 0 32px rgba(99,102,241,0.5)",
                        "0 0 60px rgba(99,102,241,0.2)",
                        "0 6px 24px rgba(0,0,0,0.7)",
                      ].join(", ");
                }}
                onMouseDown={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "scale(0.97) translateY(1px)";
                }}
                onMouseUp={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "";
                }}
                data-ocid="spin-btn"
                aria-label={isSpinning ? "Spinning…" : "Spin the reels"}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                    SPINNING…
                  </span>
                ) : (
                  "SPIN 🐉"
                )}
              </button>
            </div>

            {/* Win details */}
            {winLines.length > 0 && (
              <div
                className="mt-4 pt-3 flex flex-wrap gap-2"
                style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
              >
                <span
                  className="text-xs font-black uppercase tracking-widest self-center mr-2"
                  style={{
                    color: "rgba(212,175,55,0.55)",
                    letterSpacing: "0.18em",
                  }}
                >
                  Winning Rows:
                </span>
                {winLines.map((win) => (
                  <div
                    key={win.row}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      border: "1px solid rgba(212,175,55,0.45)",
                      color: "#D4AF37",
                    }}
                  >
                    <span>Row {win.row + 1}</span>
                    <span style={{ color: "rgba(164,128,255,0.5)" }}>·</span>
                    <span style={{ color: "rgba(196,181,253,0.85)" }}>
                      {getSymbolDef(win.symbol).label}
                    </span>
                    <span style={{ color: "rgba(164,128,255,0.5)" }}>·</span>
                    <span
                      className="text-gold-glow"
                      style={{ color: "oklch(0.85 0.18 65)" }}
                    >
                      {win.count}× = {win.multiplier}x
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Balance after result */}
            {(outcome.status === "won" || outcome.status === "lost") && (
              <p
                className="mt-2 text-xs text-center font-mono"
                style={{ color: "rgba(212,175,55,0.5)" }}
              >
                New balance: {formatICP(outcome.newBalance)} ICP
              </p>
            )}

            {/* House edge fine print */}
            <p
              className="mt-2 text-center text-xs font-mono"
              style={{ color: "rgba(74,122,232,0.3)" }}
              data-ocid="house-edge-note"
            >
              House edge: ~8% · Real ICP bets · RTP 92%
            </p>
          </div>

          {/* Wallet gate overlay */}
          {!isConnected && (
            <WalletGateOverlay
              isConnecting={isConnecting}
              onConnect={() => connect("plug")}
              connectError={connectError}
            />
          )}
        </div>

        {/* ── Paytable ── */}
        <div
          className="mt-5 rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,4,22,0.9), rgba(5,2,14,0.95))",
            border: "1px solid rgba(74,122,232,0.2)",
            boxShadow: "inset 0 1px 0 rgba(212,175,55,0.08)",
          }}
        >
          <div
            className="text-center text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: "rgba(164,128,255,0.55)", letterSpacing: "0.2em" }}
          >
            ⬦ Paytable — Win Multipliers ⬦
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(MULTIPLIERS).map(([count, mult]) => (
              <div
                key={count}
                className="text-center py-2.5 rounded-xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, rgba(8,4,22,0.6) 100%)",
                  border: "1px solid rgba(212,175,55,0.18)",
                }}
              >
                <div
                  className="text-lg font-black text-gold-glow"
                  style={{ color: "oklch(0.75 0.18 65)" }}
                >
                  {mult}x
                </div>
                <div
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "rgba(164,128,255,0.55)" }}
                >
                  {count} match
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes cellWinPulse {
          0%, 100% {
            box-shadow: 0 0 20px oklch(0.72 0.18 65 / 0.65),
                        0 0 40px oklch(0.72 0.18 65 / 0.30),
                        inset 0 0 10px oklch(0.72 0.18 65 / 0.20);
          }
          50% {
            box-shadow: 0 0 32px oklch(0.72 0.18 65 / 0.90),
                        0 0 64px oklch(0.72 0.18 65 / 0.50),
                        inset 0 0 18px oklch(0.72 0.18 65 / 0.35);
          }
        }
      `}</style>
    </section>
  );
}
