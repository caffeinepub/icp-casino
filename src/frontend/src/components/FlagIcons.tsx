/** SVG flag icons for the profile icon picker and avatar display. */

interface FlagProps {
  size?: number;
}

function FlagUS({ size = 40 }: FlagProps) {
  const stripes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="United States Flag"
    >
      {stripes.map((i) => (
        <rect
          key={`stripe-${i}`}
          x="0"
          y={i * (40 / 13)}
          width="60"
          height={40 / 13}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect x="0" y="0" width="24" height="21.5" fill="#3C3B6E" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => {
          const maxCol = row % 2 === 0 ? 6 : 5;
          if (col >= maxCol) return null;
          return (
            <circle
              key={`star-${row}-${col}`}
              cx={1.8 + col * 4 + (row % 2 === 0 ? 0 : 2)}
              cy={2.2 + row * 4.2}
              r="0.85"
              fill="#FFFFFF"
            />
          );
        }),
      )}
    </svg>
  );
}

function FlagGB({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="United Kingdom Flag"
    >
      <rect width="60" height="40" fill="#012169" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="8" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="8" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="4.5" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="4.5" />
      <rect x="23" y="0" width="14" height="40" fill="#FFFFFF" />
      <rect x="0" y="13" width="60" height="14" fill="#FFFFFF" />
      <rect x="25.5" y="0" width="9" height="40" fill="#C8102E" />
      <rect x="0" y="15.5" width="60" height="9" fill="#C8102E" />
    </svg>
  );
}

function FlagDE({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Germany Flag"
    >
      <rect x="0" y="0" width="60" height="13.3" fill="#000000" />
      <rect x="0" y="13.3" width="60" height="13.3" fill="#DD0000" />
      <rect x="0" y="26.6" width="60" height="13.4" fill="#FFCE00" />
    </svg>
  );
}

function FlagFR({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="France Flag"
    >
      <rect x="0" y="0" width="20" height="40" fill="#002395" />
      <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" y="0" width="20" height="40" fill="#ED2939" />
    </svg>
  );
}

function FlagJP({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Japan Flag"
    >
      <rect width="60" height="40" fill="#FFFFFF" />
      <circle cx="30" cy="20" r="11" fill="#BC002D" />
    </svg>
  );
}

function FlagCN({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="China Flag"
    >
      <rect width="60" height="40" fill="#DE2910" />
      <polygon
        points="10,5 11.5,10 16,10 12.5,13 13.5,18 10,15 6.5,18 7.5,13 4,10 8.5,10"
        fill="#FFDE00"
      />
      <polygon
        points="20,3 20.9,5.7 23.7,5.7 21.5,7.4 22.3,10 20,8.5 17.7,10 18.5,7.4 16.3,5.7 19.1,5.7"
        fill="#FFDE00"
      />
      <polygon
        points="24,8 24.9,10.7 27.7,10.7 25.5,12.4 26.3,15 24,13.5 21.7,15 22.5,12.4 20.3,10.7 23.1,10.7"
        fill="#FFDE00"
      />
      <polygon
        points="24,15 24.9,17.7 27.7,17.7 25.5,19.4 26.3,22 24,20.5 21.7,22 22.5,19.4 20.3,17.7 23.1,17.7"
        fill="#FFDE00"
      />
      <polygon
        points="20,20 20.9,22.7 23.7,22.7 21.5,24.4 22.3,27 20,25.5 17.7,27 18.5,24.4 16.3,22.7 19.1,22.7"
        fill="#FFDE00"
      />
    </svg>
  );
}

function FlagBR({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brazil Flag"
    >
      <rect width="60" height="40" fill="#009C3B" />
      <polygon points="30,4 56,20 30,36 4,20" fill="#FFDF00" />
      <circle cx="30" cy="20" r="8.5" fill="#002776" />
      <path
        d="M21.5,22 Q30,18 38.5,22"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function FlagCA({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Canada Flag"
    >
      <rect x="0" y="0" width="15" height="40" fill="#FF0000" />
      <rect x="15" y="0" width="30" height="40" fill="#FFFFFF" />
      <rect x="45" y="0" width="15" height="40" fill="#FF0000" />
      <path
        d="M30,8 L32,14 L38,13 L34,17 L36,23 L30,19 L24,23 L26,17 L22,13 L28,14 Z"
        fill="#FF0000"
      />
      <rect x="28.5" y="23" width="3" height="5" fill="#FF0000" />
    </svg>
  );
}

function FlagAU({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Australia Flag"
    >
      <rect width="60" height="40" fill="#00008B" />
      <rect x="0" y="0" width="30" height="20" fill="#012169" />
      <line x1="0" y1="0" x2="30" y2="20" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="30" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="0" y1="0" x2="30" y2="20" stroke="#C8102E" strokeWidth="2.5" />
      <line x1="30" y1="0" x2="0" y2="20" stroke="#C8102E" strokeWidth="2.5" />
      <rect x="11" y="0" width="8" height="20" fill="#FFFFFF" />
      <rect x="0" y="6" width="30" height="8" fill="#FFFFFF" />
      <rect x="12.5" y="0" width="5" height="20" fill="#C8102E" />
      <rect x="0" y="7.5" width="30" height="5" fill="#C8102E" />
      <polygon
        points="7,25 8,29 12,29 9,31.5 10,35.5 7,33 4,35.5 5,31.5 2,29 6,29"
        fill="#FFFFFF"
      />
      <polygon
        points="46,10 46.7,12.5 49,12.5 47.2,14 47.9,16.5 46,15 44.1,16.5 44.8,14 43,12.5 45.3,12.5"
        fill="#FFFFFF"
      />
      <polygon
        points="52,16 52.5,18 54.5,18 53,19.2 53.5,21.2 52,20 50.5,21.2 51,19.2 49.5,18 51.5,18"
        fill="#FFFFFF"
      />
      <polygon
        points="46,23 46.5,25 48.5,25 47,26.2 47.5,28.2 46,27 44.5,28.2 45,26.2 43.5,25 45.5,25"
        fill="#FFFFFF"
      />
      <polygon
        points="38,19 38.5,21 40.5,21 39,22.2 39.5,24.2 38,23 36.5,24.2 37,22.2 35.5,21 37.5,21"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function FlagMX({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mexico Flag"
    >
      <rect x="0" y="0" width="20" height="40" fill="#006847" />
      <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" y="0" width="20" height="40" fill="#CE1126" />
      <circle cx="30" cy="20" r="5" fill="#8B6914" opacity="0.8" />
      <circle cx="30" cy="20" r="3" fill="#5C4008" opacity="0.9" />
    </svg>
  );
}

function FlagKR({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="South Korea Flag"
    >
      <rect width="60" height="40" fill="#FFFFFF" />
      <circle cx="30" cy="20" r="9" fill="#CD2E3A" />
      <path
        d="M30,11 A4.5,4.5 0 0 1 30,20 A4.5,4.5 0 0 0 30,29 A9,9 0 0 0 30,11 Z"
        fill="#003478"
      />
      <circle cx="30" cy="15.5" r="2.25" fill="#CD2E3A" />
      <circle cx="30" cy="24.5" r="2.25" fill="#003478" />
      <rect x="6" y="9" width="9" height="2" fill="#000000" />
      <rect x="6" y="12.5" width="9" height="2" fill="#000000" />
      <rect x="6" y="16" width="9" height="2" fill="#000000" />
      <rect x="45" y="9" width="9" height="2" fill="#000000" />
      <rect x="45" y="12.5" width="3.5" height="2" fill="#000000" />
      <rect x="50.5" y="12.5" width="3.5" height="2" fill="#000000" />
      <rect x="45" y="16" width="9" height="2" fill="#000000" />
      <rect x="6" y="22" width="9" height="2" fill="#000000" />
      <rect x="6" y="25.5" width="3.5" height="2" fill="#000000" />
      <rect x="11.5" y="25.5" width="3.5" height="2" fill="#000000" />
      <rect x="6" y="29" width="9" height="2" fill="#000000" />
      <rect x="45" y="22" width="9" height="2" fill="#000000" />
      <rect x="45" y="25.5" width="9" height="2" fill="#000000" />
      <rect x="45" y="29" width="9" height="2" fill="#000000" />
    </svg>
  );
}

function FlagIN({ size = 40 }: FlagProps) {
  const spokes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="India Flag"
    >
      <rect x="0" y="0" width="60" height="13.3" fill="#FF9933" />
      <rect x="0" y="13.3" width="60" height="13.3" fill="#FFFFFF" />
      <rect x="0" y="26.6" width="60" height="13.4" fill="#138808" />
      <circle
        cx="30"
        cy="20"
        r="5.5"
        fill="none"
        stroke="#000080"
        strokeWidth="0.8"
      />
      <circle cx="30" cy="20" r="0.8" fill="#000080" />
      {spokes.map((i) => {
        const angle = i * 15 * (Math.PI / 180);
        return (
          <line
            key={`spoke-${i}`}
            x1={30 + 0.8 * Math.cos(angle)}
            y1={20 + 0.8 * Math.sin(angle)}
            x2={30 + 5.5 * Math.cos(angle)}
            y2={20 + 5.5 * Math.sin(angle)}
            stroke="#000080"
            strokeWidth="0.4"
          />
        );
      })}
    </svg>
  );
}

function FlagRU({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Russia Flag"
    >
      <rect x="0" y="0" width="60" height="13.3" fill="#FFFFFF" />
      <rect x="0" y="13.3" width="60" height="13.3" fill="#0039A6" />
      <rect x="0" y="26.6" width="60" height="13.4" fill="#D52B1E" />
    </svg>
  );
}

function FlagIT({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Italy Flag"
    >
      <rect x="0" y="0" width="20" height="40" fill="#009246" />
      <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" y="0" width="20" height="40" fill="#CE2B37" />
    </svg>
  );
}

function FlagES({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Spain Flag"
    >
      <rect x="0" y="0" width="60" height="10" fill="#AA151B" />
      <rect x="0" y="10" width="60" height="20" fill="#F1BF00" />
      <rect x="0" y="30" width="60" height="10" fill="#AA151B" />
      <rect x="22" y="14" width="3" height="12" fill="#AA151B" opacity="0.6" />
      <rect
        x="18"
        y="18"
        width="11"
        height="8"
        fill="none"
        stroke="#AA151B"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

function FlagSA({ size = 40 }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * (40 / 60)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Saudi Arabia Flag"
    >
      <rect width="60" height="40" fill="#006C35" />
      {/* Crescent */}
      <path d="M28,10 A9,9 0 1 1 28,30 A6,6 0 1 0 28,10 Z" fill="#FFFFFF" />
      {/* Star */}
      <polygon
        points="36,17 37,20 40,20 37.5,22 38.5,25 36,23 33.5,25 34.5,22 32,20 35,20"
        fill="#FFFFFF"
      />
      {/* Sword */}
      <line
        x1="12"
        y1="32"
        x2="48"
        y2="32"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <polygon points="48,31.2 52,32 48,32.8" fill="#FFFFFF" />
    </svg>
  );
}

import type { ReactElement } from "react";

type FlagComponent = (props: FlagProps) => ReactElement;

const FLAG_MAP: Record<string, FlagComponent> = {
  flag_us: FlagUS,
  flag_gb: FlagGB,
  flag_de: FlagDE,
  flag_fr: FlagFR,
  flag_jp: FlagJP,
  flag_cn: FlagCN,
  flag_br: FlagBR,
  flag_ca: FlagCA,
  flag_au: FlagAU,
  flag_mx: FlagMX,
  flag_kr: FlagKR,
  flag_in: FlagIN,
  flag_ru: FlagRU,
  flag_it: FlagIT,
  flag_es: FlagES,
  flag_sa: FlagSA,
};

export const FLAG_LABELS: Record<string, string> = {
  flag_us: "United States",
  flag_gb: "United Kingdom",
  flag_de: "Germany",
  flag_fr: "France",
  flag_jp: "Japan",
  flag_cn: "China",
  flag_br: "Brazil",
  flag_ca: "Canada",
  flag_au: "Australia",
  flag_mx: "Mexico",
  flag_kr: "South Korea",
  flag_in: "India",
  flag_ru: "Russia",
  flag_it: "Italy",
  flag_es: "Spain",
  flag_sa: "Saudi Arabia",
};

/** Returns true if the given string is a flag identifier (starts with "flag_") */
export function isFlagAvatar(value: string | null | undefined): boolean {
  if (!value) return false;
  return value.startsWith("flag_");
}

/**
 * Renders the SVG flag for a given flag code (e.g. "flag_us").
 * Returns null if the code is not found.
 */
export function FlagIcon({
  code,
  size = 40,
}: {
  code: string;
  size?: number;
}) {
  const Component = FLAG_MAP[code];
  if (!Component) return null;
  return <Component size={size} />;
}

/** All flag codes in display order */
export const ALL_FLAG_CODES = Object.keys(FLAG_MAP);
