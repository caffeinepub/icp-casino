/**
 * Game-specific SVG illustrations as data URIs.
 * Each SVG is themed for its game with a deep gold & royal purple casino aesthetic.
 * All hex colors use the casino palette:
 *   Gold primary:    #d4a843 (oklch 0.72 0.18 65)
 *   Gold light:      #e8c76a (oklch 0.82 0.16 65)
 *   Gold dark:       #a07830 (oklch 0.60 0.20 65)
 *   Royal purple:    #6b3fa0 (oklch 0.40 0.15 300)
 *   Deep purple:     #4a2680 (oklch 0.38 0.15 300)
 *   Light purple:    #9060d0 (oklch 0.55 0.18 300)
 *   Obsidian bg:     #120c1a
 *   Card bg dark:    #1a0e3d
 *   Card bg mid:     #2d1b69
 */

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Returns true if the URL is a picsum placeholder */
export function isPicsumUrl(url: string): boolean {
  return url.includes("picsum.photos");
}

// ── Individual game SVGs ──────────────────────────────────────────────────────

const LUCKY_SEVENS =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#1a0d35"/>
    </linearGradient>
    <linearGradient id="reel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a1030"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="50%" stop-color="#d4a843"/>
      <stop offset="100%" stop-color="#a07830"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Stars -->
  <circle cx="30" cy="20" r="1.5" fill="#d4a843" opacity="0.6"/>
  <circle cx="370" cy="40" r="1" fill="#d4a843" opacity="0.5"/>
  <circle cx="60" cy="260" r="1" fill="#9060d0" opacity="0.4"/>
  <circle cx="340" cy="250" r="1.5" fill="#d4a843" opacity="0.6"/>
  <!-- Slot machine frame -->
  <rect x="60" y="50" width="280" height="200" rx="16" fill="#0d0820" stroke="#d4a843" stroke-width="2.5"/>
  <rect x="70" y="60" width="260" height="180" rx="10" fill="#0a0615"/>
  <!-- Reel windows -->
  <rect x="85" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#d4a843" stroke-width="1.5"/>
  <rect x="165" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#d4a843" stroke-width="1.5"/>
  <rect x="245" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#d4a843" stroke-width="1.5"/>
  <!-- 7 in each reel -->
  <text x="120" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="200" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="280" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <!-- Win line — gold -->
  <line x1="80" y1="150" x2="320" y2="150" stroke="#d4a843" stroke-width="2.5" stroke-dasharray="4,3" opacity="0.8"/>
  <!-- Title bar -->
  <rect x="60" y="245" width="280" height="30" rx="0" fill="#0d0820"/>
  <text x="200" y="265" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="4">LUCKY SEVENS</text>
</svg>`);

const GOLDEN_FORTUNE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#1a1030"/>
    </linearGradient>
    <linearGradient id="chest" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a2680"/>
      <stop offset="100%" stop-color="#2d1450"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="50%" stop-color="#d4a843"/>
      <stop offset="100%" stop-color="#a07830"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Glow behind chest -->
  <ellipse cx="200" cy="220" rx="120" ry="40" fill="#d4a843" opacity="0.08"/>
  <!-- Floating coins -->
  <ellipse cx="90" cy="100" rx="22" ry="10" fill="url(#gold)" opacity="0.9"/>
  <text x="90" y="104" font-family="Arial" font-size="10" fill="#4a2680" text-anchor="middle" font-weight="bold">¥</text>
  <ellipse cx="310" cy="85" rx="22" ry="10" fill="url(#gold)" opacity="0.9"/>
  <text x="310" y="89" font-family="Arial" font-size="10" fill="#4a2680" text-anchor="middle" font-weight="bold">$</text>
  <ellipse cx="60" cy="170" rx="18" ry="8" fill="url(#gold)" opacity="0.7"/>
  <ellipse cx="340" cy="155" rx="18" ry="8" fill="url(#gold)" opacity="0.7"/>
  <ellipse cx="130" cy="55" rx="20" ry="9" fill="url(#gold)" opacity="0.8"/>
  <ellipse cx="270" cy="50" rx="20" ry="9" fill="url(#gold)" opacity="0.8"/>
  <!-- Treasure chest body -->
  <rect x="110" y="170" width="180" height="100" rx="8" fill="url(#chest)" stroke="#d4a843" stroke-width="2"/>
  <!-- Chest lid -->
  <path d="M110,170 Q110,120 200,120 Q290,120 290,170 Z" fill="#3d1e6a" stroke="#d4a843" stroke-width="2"/>
  <!-- Chest lock -->
  <rect x="182" y="155" width="36" height="28" rx="4" fill="#d4a843"/>
  <circle cx="200" cy="162" r="8" fill="#a07830"/>
  <rect x="196" y="165" width="8" height="10" rx="2" fill="#a07830"/>
  <!-- Coins spilling -->
  <ellipse cx="155" cy="172" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="185" cy="168" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="215" cy="168" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="245" cy="172" rx="16" ry="7" fill="url(#gold)"/>
  <!-- Title -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="3">GOLDEN FORTUNE</text>
</svg>`);

const NEON_NIGHTS =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0015"/>
      <stop offset="100%" stop-color="#15002a"/>
    </linearGradient>
    <filter id="neon-gold"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="neon-purple"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Moon -->
  <circle cx="340" cy="45" r="25" fill="#1a003a"/>
  <circle cx="348" cy="38" r="22" fill="#0a0015"/>
  <!-- Stars — gold and purple, no white -->
  <circle cx="30" cy="30" r="1.5" fill="#d4a843" opacity="0.8"/>
  <circle cx="80" cy="15" r="1" fill="#9060d0" opacity="0.7"/>
  <circle cx="160" cy="25" r="1.5" fill="#d4a843" opacity="0.7"/>
  <circle cx="250" cy="10" r="1" fill="#9060d0" opacity="0.6"/>
  <circle cx="50" cy="70" r="1" fill="#d4a843" opacity="0.8"/>
  <circle cx="200" cy="35" r="1" fill="#9060d0" opacity="0.7"/>
  <circle cx="300" cy="20" r="1.5" fill="#d4a843" opacity="0.6"/>
  <circle cx="380" cy="55" r="1" fill="#9060d0" opacity="0.5"/>
  <!-- City skyline silhouette -->
  <rect x="0" y="180" width="400" height="120" fill="#060010"/>
  <!-- Buildings -->
  <rect x="10" y="140" width="30" height="160" fill="#0a0018"/>
  <rect x="15" y="120" width="20" height="30" fill="#0a0018"/>
  <rect x="50" y="160" width="45" height="140" fill="#0a0018"/>
  <rect x="105" y="130" width="35" height="170" fill="#0a0018"/>
  <rect x="108" y="110" width="10" height="30" fill="#0a0018"/>
  <rect x="150" y="155" width="50" height="145" fill="#0a0018"/>
  <rect x="210" y="145" width="40" height="155" fill="#0a0018"/>
  <rect x="260" y="135" width="55" height="165" fill="#0a0018"/>
  <rect x="265" y="110" width="15" height="35" fill="#0a0018"/>
  <rect x="325" y="158" width="40" height="142" fill="#0a0018"/>
  <rect x="370" y="170" width="30" height="130" fill="#0a0018"/>
  <!-- Neon signs — gold and purple -->
  <text x="60" y="175" font-family="Arial" font-size="11" font-weight="bold" fill="#d4a843" filter="url(#neon-gold)" opacity="0.9">BAR</text>
  <text x="165" y="165" font-family="Arial" font-size="9" font-weight="bold" fill="#9060d0" filter="url(#neon-purple)" opacity="0.9">CASINO</text>
  <text x="268" y="148" font-family="Arial" font-size="10" font-weight="bold" fill="#d4a843" filter="url(#neon-gold)" opacity="0.9">HOTEL</text>
  <!-- Neon grid floor reflection -->
  <line x1="200" y1="220" x2="0" y2="300" stroke="#9060d0" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="220" x2="400" y2="300" stroke="#9060d0" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="230" x2="0" y2="300" stroke="#d4a843" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="230" x2="400" y2="300" stroke="#d4a843" stroke-width="0.5" opacity="0.3"/>
  <!-- Title with neon glow -->
  <text x="200" y="102" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#9060d0" text-anchor="middle" filter="url(#neon-purple)" opacity="0.5">NEON NIGHTS</text>
  <text x="200" y="102" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#9060d0" text-anchor="middle">NEON NIGHTS</text>
</svg>`);

const DIAMOND_RUSH =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#1a0d35"/>
    </linearGradient>
    <linearGradient id="diamond1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="40%" stop-color="#d4a843"/>
      <stop offset="100%" stop-color="#6b3fa0"/>
    </linearGradient>
    <linearGradient id="diamond2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="40%" stop-color="#c8a040"/>
      <stop offset="100%" stop-color="#9060d0"/>
    </linearGradient>
    <filter id="sparkle"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Background sparkles -->
  <circle cx="50" cy="40" r="2" fill="#d4a843" opacity="0.6" filter="url(#sparkle)"/>
  <circle cx="350" cy="60" r="2.5" fill="#e8c76a" opacity="0.8" filter="url(#sparkle)"/>
  <circle cx="30" cy="200" r="1.5" fill="#d4a843" opacity="0.5"/>
  <circle cx="370" cy="220" r="2" fill="#9060d0" opacity="0.6"/>
  <circle cx="100" cy="260" r="1.5" fill="#e8c76a" opacity="0.4"/>
  <circle cx="300" cy="250" r="2" fill="#d4a843" opacity="0.5"/>
  <!-- Star sparkles -->
  <path d="M60,80 L62,74 L64,80 L70,82 L64,84 L62,90 L60,84 L54,82 Z" fill="#d4a843" filter="url(#sparkle)" opacity="0.8"/>
  <path d="M330,100 L332,94 L334,100 L340,102 L334,104 L332,110 L330,104 L324,102 Z" fill="#e8c76a" filter="url(#sparkle)" opacity="0.9"/>
  <path d="M80,230 L81,227 L82,230 L85,231 L82,232 L81,235 L80,232 L77,231 Z" fill="#9060d0" opacity="0.7"/>
  <path d="M320,240 L321,237 L322,240 L325,241 L322,242 L321,245 L320,242 L317,241 Z" fill="#d4a843" opacity="0.7"/>
  <!-- Large central diamond -->
  <polygon points="200,60 250,150 200,210 150,150" fill="url(#diamond1)" stroke="#e8c76a" stroke-width="1.5"/>
  <polygon points="200,60 250,150 200,100" fill="#e8c76a" opacity="0.5"/>
  <polygon points="200,60 150,150 200,100" fill="#d4a843" opacity="0.3"/>
  <line x1="200" y1="60" x2="200" y2="210" stroke="#e8c76a" stroke-width="0.5" opacity="0.4"/>
  <line x1="150" y1="150" x2="250" y2="150" stroke="#e8c76a" stroke-width="0.5" opacity="0.4"/>
  <!-- Small diamonds -->
  <polygon points="90,100 110,140 90,165 70,140" fill="url(#diamond2)" stroke="#d4a843" stroke-width="1" opacity="0.8"/>
  <polygon points="310,90 330,130 310,155 290,130" fill="url(#diamond2)" stroke="#d4a843" stroke-width="1" opacity="0.8"/>
  <polygon points="120,210 135,240 120,260 105,240" fill="url(#diamond2)" stroke="#d4a843" stroke-width="1" opacity="0.6"/>
  <polygon points="280,200 295,230 280,250 265,230" fill="url(#diamond2)" stroke="#d4a843" stroke-width="1" opacity="0.6"/>
  <!-- Title -->
  <text x="200" y="285" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="3" filter="url(#sparkle)">DIAMOND RUSH</text>
</svg>`);

const WILD_SAFARI =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="40%" stop-color="#2d1450"/>
      <stop offset="70%" stop-color="#4a2680"/>
      <stop offset="100%" stop-color="#6b3fa0"/>
    </linearGradient>
    <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Sun — gold disc -->
  <circle cx="200" cy="80" r="45" fill="#e8c76a" opacity="0.9"/>
  <circle cx="200" cy="80" r="38" fill="#d4a843"/>
  <!-- Ground -->
  <rect x="0" y="210" width="400" height="90" fill="url(#ground)"/>
  <rect x="0" y="200" width="400" height="20" fill="#1a0d35"/>
  <!-- Acacia tree left -->
  <rect x="55" y="130" width="12" height="85" fill="#2d1450"/>
  <ellipse cx="61" cy="125" rx="38" ry="20" fill="#1a0d35"/>
  <ellipse cx="45" cy="118" rx="22" ry="14" fill="#1a0d35"/>
  <ellipse cx="80" cy="120" rx="22" ry="14" fill="#120c28"/>
  <!-- Acacia tree right -->
  <rect x="320" y="140" width="10" height="75" fill="#2d1450"/>
  <ellipse cx="325" cy="134" rx="32" ry="18" fill="#1a0d35"/>
  <ellipse cx="308" cy="128" rx="20" ry="12" fill="#120c28"/>
  <ellipse cx="342" cy="130" rx="20" ry="12" fill="#1a0d35"/>
  <!-- Lion silhouette -->
  <ellipse cx="140" cy="205" rx="45" ry="22" fill="#0d0820"/>
  <circle cx="175" cy="192" r="20" fill="#0d0820"/>
  <circle cx="175" cy="192" r="15" fill="#120c28"/>
  <!-- Mane -->
  <circle cx="175" cy="188" r="22" fill="#0d0820" opacity="0.8"/>
  <!-- Legs -->
  <rect x="110" y="215" width="10" height="20" fill="#0d0820"/>
  <rect x="130" y="215" width="10" height="20" fill="#0d0820"/>
  <rect x="155" y="215" width="10" height="20" fill="#0d0820"/>
  <rect x="170" y="215" width="10" height="20" fill="#0d0820"/>
  <!-- Elephant silhouette far right -->
  <ellipse cx="300" cy="205" rx="50" ry="28" fill="#0d0820"/>
  <rect x="275" y="200" width="50" height="35" fill="#0d0820"/>
  <!-- Trunk -->
  <path d="M255,200 Q235,210 240,230" stroke="#0d0820" stroke-width="10" fill="none" stroke-linecap="round"/>
  <!-- Tusks — gold tint -->
  <path d="M258,208 Q245,220 250,232" stroke="#d4a843" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
  <!-- Elephant head -->
  <circle cx="265" cy="192" r="28" fill="#0d0820"/>
  <!-- Ear -->
  <ellipse cx="248" cy="193" rx="16" ry="22" fill="#0a0618"/>
  <!-- Elephant legs -->
  <rect x="285" y="225" width="15" height="25" fill="#0d0820"/>
  <rect x="305" y="225" width="15" height="25" fill="#0d0820"/>
  <!-- Birds in sky — gold instead of dark -->
  <path d="M100,55 Q110,48 120,55" stroke="#d4a843" stroke-width="1.5" fill="none" opacity="0.6"/>
  <path d="M130,40 Q140,33 150,40" stroke="#d4a843" stroke-width="1.5" fill="none" opacity="0.5"/>
  <path d="M250,65 Q260,58 270,65" stroke="#d4a843" stroke-width="1.5" fill="none" opacity="0.6"/>
  <!-- Title — gold -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="3">WILD SAFARI</text>
</svg>`);

const SPACE_ODYSSEY =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="space" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </radialGradient>
    <radialGradient id="planet1" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#9060d0"/>
      <stop offset="100%" stop-color="#4a2680"/>
    </radialGradient>
    <radialGradient id="planet2" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#6b3fa0"/>
      <stop offset="100%" stop-color="#2d1450"/>
    </radialGradient>
    <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9060d0" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#4a2680" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#space)"/>
  <!-- Nebula -->
  <ellipse cx="200" cy="150" rx="200" ry="120" fill="url(#nebula)"/>
  <!-- Stars — gold and purple, no white -->
  <circle cx="20" cy="15" r="1" fill="#d4a843" opacity="0.9"/>
  <circle cx="55" cy="35" r="1.5" fill="#9060d0" opacity="0.8"/>
  <circle cx="90" cy="10" r="1" fill="#d4a843" opacity="0.8"/>
  <circle cx="150" cy="25" r="1" fill="#9060d0" opacity="0.7"/>
  <circle cx="220" cy="8" r="1.5" fill="#d4a843" opacity="0.9"/>
  <circle cx="280" cy="30" r="1" fill="#9060d0" opacity="0.7"/>
  <circle cx="340" cy="15" r="1.5" fill="#d4a843" opacity="0.8"/>
  <circle cx="380" cy="45" r="1" fill="#9060d0" opacity="0.6"/>
  <circle cx="30" cy="100" r="1" fill="#d4a843" opacity="0.6"/>
  <circle cx="375" cy="120" r="1.5" fill="#9060d0" opacity="0.8"/>
  <circle cx="15" cy="200" r="1" fill="#d4a843" opacity="0.7"/>
  <circle cx="390" cy="200" r="1" fill="#9060d0" opacity="0.6"/>
  <circle cx="100" cy="270" r="1.5" fill="#d4a843" opacity="0.5"/>
  <circle cx="290" cy="260" r="1" fill="#9060d0" opacity="0.7"/>
  <circle cx="360" cy="280" r="1.5" fill="#d4a843" opacity="0.8"/>
  <!-- Large planet with rings -->
  <circle cx="130" cy="110" r="55" fill="url(#planet1)"/>
  <ellipse cx="130" cy="110" rx="80" ry="14" fill="none" stroke="#9060d0" stroke-width="5" opacity="0.6"/>
  <ellipse cx="130" cy="110" rx="80" ry="14" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.5"/>
  <!-- Planet surface lines -->
  <ellipse cx="130" cy="100" rx="50" ry="10" fill="none" stroke="#6b3fa0" stroke-width="1.5" opacity="0.4"/>
  <ellipse cx="130" cy="120" rx="50" ry="10" fill="none" stroke="#6b3fa0" stroke-width="1" opacity="0.3"/>
  <!-- Small purple planet -->
  <circle cx="310" cy="80" r="30" fill="url(#planet2)"/>
  <ellipse cx="310" cy="75" rx="28" ry="8" fill="none" stroke="#d4a843" stroke-width="1.5" opacity="0.5"/>
  <!-- Rocket — gold/purple palette -->
  <g transform="translate(220, 155) rotate(-30)">
    <rect x="-8" y="-30" width="16" height="45" rx="8" fill="#c8b8e8"/>
    <polygon points="-8,-30 8,-30 0,-50" fill="#6b3fa0"/>
    <rect x="-14" y="5" width="10" height="18" rx="3" fill="#9060d0"/>
    <rect x="4" y="5" width="10" height="18" rx="3" fill="#9060d0"/>
    <!-- Engine glow — gold -->
    <ellipse cx="0" cy="15" rx="7" ry="14" fill="#d4a843" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="0" cy="15" rx="4" ry="10" fill="#e8c76a" opacity="0.9"/>
    <circle cx="-2" cy="0" r="4" fill="#d4a843"/>
    <circle cx="2" cy="0" r="4" fill="#d4a843"/>
  </g>
  <!-- Title -->
  <text x="200" y="285" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9060d0" text-anchor="middle" letter-spacing="3" filter="url(#glow)">SPACE ODYSSEY</text>
</svg>`);

const ROULETTE_ROYALE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </radialGradient>
    <radialGradient id="wheel" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2d1450"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Wheel outer ring -->
  <circle cx="200" cy="150" r="130" fill="#0d0820" stroke="#d4a843" stroke-width="3"/>
  <!-- Wheel sectors — alternating royal purple / deep obsidian -->
  <g transform="translate(200,150)">
    <!-- Purple sectors -->
    <path d="M0,0 L0,-120 A120,120 0 0,1 37.3,-114.1 Z" fill="#6b3fa0"/>
    <path d="M0,0 L74.6,-91.9 A120,120 0 0,1 102.4,-63.2 Z" fill="#6b3fa0"/>
    <path d="M0,0 L116.5,-34.1 A120,120 0 0,1 120,0 Z" fill="#6b3fa0"/>
    <path d="M0,0 L116.5,34.1 A120,120 0 0,1 102.4,63.2 Z" fill="#6b3fa0"/>
    <path d="M0,0 L74.6,91.9 A120,120 0 0,1 37.3,114.1 Z" fill="#6b3fa0"/>
    <path d="M0,0 L0,120 A120,120 0 0,1 -37.3,114.1 Z" fill="#6b3fa0"/>
    <path d="M0,0 L-74.6,91.9 A120,120 0 0,1 -102.4,63.2 Z" fill="#6b3fa0"/>
    <path d="M0,0 L-116.5,34.1 A120,120 0 0,1 -120,0 Z" fill="#6b3fa0"/>
    <path d="M0,0 L-116.5,-34.1 A120,120 0 0,1 -102.4,-63.2 Z" fill="#6b3fa0"/>
    <path d="M0,0 L-74.6,-91.9 A120,120 0 0,1 -37.3,-114.1 Z" fill="#6b3fa0"/>
    <!-- Dark sectors -->
    <path d="M0,0 L37.3,-114.1 A120,120 0 0,1 74.6,-91.9 Z" fill="#1a0d35"/>
    <path d="M0,0 L102.4,-63.2 A120,120 0 0,1 116.5,-34.1 Z" fill="#1a0d35"/>
    <path d="M0,0 L120,0 A120,120 0 0,1 116.5,34.1 Z" fill="#1a0d35"/>
    <path d="M0,0 L102.4,63.2 A120,120 0 0,1 74.6,91.9 Z" fill="#1a0d35"/>
    <path d="M0,0 L37.3,114.1 A120,120 0 0,1 0,120 Z" fill="#1a0d35"/>
    <path d="M0,0 L-37.3,114.1 A120,120 0 0,1 -74.6,91.9 Z" fill="#1a0d35"/>
    <path d="M0,0 L-102.4,63.2 A120,120 0 0,1 -116.5,34.1 Z" fill="#1a0d35"/>
    <path d="M0,0 L-120,0 A120,120 0 0,1 -116.5,-34.1 Z" fill="#1a0d35"/>
    <path d="M0,0 L-102.4,-63.2 A120,120 0 0,1 -74.6,-91.9 Z" fill="#1a0d35"/>
    <path d="M0,0 L-37.3,-114.1 A120,120 0 0,1 0,-120 Z" fill="#1a0d35"/>
    <!-- Zero — deep gold -->
    <path d="M0,0 L-37.3,-114.1 A120,120 0 0,1 0,-120 Z" fill="#a07830"/>
  </g>
  <!-- Spoke lines -->
  <g transform="translate(200,150)" stroke="#d4a843" stroke-width="1" opacity="0.5">
    <line x1="0" y1="-120" x2="0" y2="-60"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(30)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(60)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(90)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(120)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(150)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(180)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(210)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(240)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(270)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(300)"/>
    <line x1="103.9" y1="-60" x2="51.9" y2="-30" transform="rotate(330)"/>
  </g>
  <!-- Center hub -->
  <circle cx="200" cy="150" r="22" fill="#d4a843"/>
  <circle cx="200" cy="150" r="14" fill="#a07830"/>
  <circle cx="200" cy="150" r="7" fill="#d4a843"/>
  <!-- Ball — gold instead of white -->
  <circle cx="200" cy="45" r="7" fill="#e8c76a" filter="url(#glow)"/>
  <!-- Title -->
  <text x="200" y="293" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="2">ROULETTE ROYALE</text>
</svg>`);

const BACCARAT_CLASSIC =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1b69"/>
      <stop offset="100%" stop-color="#1a0e3d"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#1a0e3d" flood-opacity="0.8"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table oval border -->
  <ellipse cx="200" cy="150" rx="185" ry="130" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.6"/>
  <ellipse cx="200" cy="150" rx="175" ry="120" fill="none" stroke="#d4a843" stroke-width="1" opacity="0.3"/>
  <!-- Table label -->
  <text x="200" y="45" font-family="Georgia,serif" font-size="11" fill="#d4a843" text-anchor="middle" opacity="0.6" letter-spacing="8">BACCARAT</text>
  <!-- Player / Banker labels -->
  <text x="110" y="255" font-family="Georgia,serif" font-size="12" fill="#d4a843" text-anchor="middle" opacity="0.7">PLAYER</text>
  <text x="290" y="255" font-family="Georgia,serif" font-size="12" fill="#d4a843" text-anchor="middle" opacity="0.7">BANKER</text>
  <!-- Player cards -->
  <rect x="60" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(-8,92,175)"/>
  <!-- Card suits — royal purple -->
  <text x="73" y="155" font-family="Georgia,serif" font-size="22" fill="#9060d0" transform="rotate(-8,92,175)">A</text>
  <text x="73" y="170" font-family="Georgia,serif" font-size="14" fill="#9060d0" transform="rotate(-8,92,175)">♥</text>
  <rect x="90" y="135" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(5,122,180)"/>
  <text x="100" y="160" font-family="Georgia,serif" font-size="22" fill="#d4a843" transform="rotate(5,122,180)">K</text>
  <text x="100" y="175" font-family="Georgia,serif" font-size="14" fill="#d4a843" transform="rotate(5,122,180)">♠</text>
  <!-- Banker cards -->
  <rect x="245" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(-5,277,175)"/>
  <text x="255" y="155" font-family="Georgia,serif" font-size="22" fill="#9060d0" transform="rotate(-5,277,175)">Q</text>
  <text x="255" y="170" font-family="Georgia,serif" font-size="14" fill="#9060d0" transform="rotate(-5,277,175)">♦</text>
  <rect x="270" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(8,302,175)"/>
  <text x="278" y="155" font-family="Georgia,serif" font-size="22" fill="#d4a843" transform="rotate(8,302,175)">J</text>
  <text x="278" y="170" font-family="Georgia,serif" font-size="14" fill="#d4a843" transform="rotate(8,302,175)">♣</text>
  <!-- Center TIE area -->
  <rect x="170" y="140" width="60" height="40" rx="4" fill="#2d1450" stroke="#d4a843" stroke-width="1" opacity="0.8"/>
  <text x="200" y="164" font-family="Georgia,serif" font-size="11" fill="#d4a843" text-anchor="middle" font-weight="bold">TIE</text>
  <!-- Title -->
  <text x="200" y="292" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="2">BACCARAT CLASSIC</text>
</svg>`);

const CRAPS_DELUXE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
    <linearGradient id="dice" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2d1b69"/>
      <stop offset="100%" stop-color="#1a0e3d"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#1a0e3d" flood-opacity="0.9"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table outline -->
  <rect x="20" y="30" width="360" height="240" rx="20" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.4"/>
  <!-- Pass/Don't Pass line -->
  <rect x="40" y="220" width="320" height="28" rx="4" fill="#2d1450" stroke="#d4a843" stroke-width="1.5" opacity="0.7"/>
  <text x="200" y="238" font-family="Georgia,serif" font-size="11" fill="#d4a843" text-anchor="middle" letter-spacing="3">PASS LINE</text>
  <!-- Come area -->
  <rect x="40" y="55" width="320" height="40" rx="4" fill="#2d1450" stroke="#d4a843" stroke-width="1" opacity="0.5"/>
  <text x="200" y="80" font-family="Georgia,serif" font-size="11" fill="#d4a843" text-anchor="middle" letter-spacing="5">COME</text>
  <!-- Number boxes -->
  <rect x="55" y="105" width="42" height="36" rx="3" fill="#1a0d35" stroke="#d4a843" stroke-width="1" opacity="0.7"/>
  <text x="76" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">4</text>
  <rect x="105" y="105" width="42" height="36" rx="3" fill="#1a0d35" stroke="#d4a843" stroke-width="1" opacity="0.7"/>
  <text x="126" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">5</text>
  <rect x="155" y="105" width="42" height="36" rx="3" fill="#3d2070" stroke="#d4a843" stroke-width="1.5" opacity="0.9"/>
  <text x="176" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">6</text>
  <rect x="205" y="105" width="42" height="36" rx="3" fill="#3d2070" stroke="#d4a843" stroke-width="1.5" opacity="0.9"/>
  <text x="226" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">8</text>
  <rect x="255" y="105" width="42" height="36" rx="3" fill="#1a0d35" stroke="#d4a843" stroke-width="1" opacity="0.7"/>
  <text x="276" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">9</text>
  <rect x="305" y="105" width="42" height="36" rx="3" fill="#1a0d35" stroke="#d4a843" stroke-width="1" opacity="0.7"/>
  <text x="326" y="128" font-family="Georgia,serif" font-size="14" fill="#d4a843" text-anchor="middle">10</text>
  <!-- Dice pair (showing 3 + 4 = 7) — dark purple with gold pips -->
  <rect x="125" y="150" width="65" height="65" rx="10" fill="url(#dice)" filter="url(#shadow)"/>
  <circle cx="143" cy="168" r="5" fill="#d4a843"/>
  <circle cx="157.5" cy="182.5" r="5" fill="#d4a843"/>
  <circle cx="172" cy="197" r="5" fill="#d4a843"/>
  <rect x="210" y="150" width="65" height="65" rx="10" fill="url(#dice)" filter="url(#shadow)" transform="rotate(8,242,182)"/>
  <circle cx="223" cy="163" r="5" fill="#d4a843" transform="rotate(8,242,182)"/>
  <circle cx="242" cy="182" r="5" fill="#d4a843" transform="rotate(8,242,182)"/>
  <circle cx="261" cy="163" r="5" fill="#d4a843" transform="rotate(8,242,182)"/>
  <circle cx="242" cy="201" r="5" fill="#d4a843" transform="rotate(8,242,182)"/>
  <!-- Title -->
  <text x="200" y="292" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="2">CRAPS DELUXE</text>
</svg>`);

const BLACKJACK_PRO =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1b69"/>
      <stop offset="100%" stop-color="#1a0e3d"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#1a0e3d" flood-opacity="0.9"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Semicircle table edge -->
  <path d="M20,280 A200,180 0 0,1 380,280" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.5"/>
  <!-- Blackjack pays label -->
  <text x="200" y="45" font-family="Georgia,serif" font-size="10" fill="#d4a843" text-anchor="middle" opacity="0.6" letter-spacing="2">BLACKJACK PAYS 3 TO 2</text>
  <!-- Insurance label -->
  <text x="200" y="65" font-family="Georgia,serif" font-size="10" fill="#d4a843" text-anchor="middle" opacity="0.5" letter-spacing="2">INSURANCE PAYS 2 TO 1</text>
  <!-- Ace of Spades card — dark purple face -->
  <rect x="90" y="90" width="90" height="130" rx="8" fill="url(#card)" filter="url(#shadow)"/>
  <!-- Large spade — gold -->
  <path d="M135,125 C135,125 115,108 115,98 C115,90 125,86 130,91 C125,82 120,76 135,72 C150,76 145,82 140,91 C145,86 155,90 155,98 C155,108 135,125 135,125 Z" fill="#d4a843"/>
  <rect x="132" y="120" width="6" height="12" fill="#d4a843"/>
  <path d="M126,132 L144,132 L140,128 L130,128 Z" fill="#d4a843"/>
  <text x="97" y="112" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="#e8c76a">A</text>
  <text x="97" y="127" font-family="Georgia,serif" font-size="14" fill="#e8c76a">♠</text>
  <!-- King of Hearts card — purple suits -->
  <rect x="155" y="90" width="90" height="130" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(5,200,155)"/>
  <text x="163" y="112" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="#9060d0" transform="rotate(5,200,155)">K</text>
  <text x="163" y="127" font-family="Georgia,serif" font-size="14" fill="#9060d0" transform="rotate(5,200,155)">♥</text>
  <!-- Crown for King — purple crown, gold jewels -->
  <path d="M185,145 L190,135 L200,148 L210,135 L215,145 L215,160 L185,160 Z" fill="#6b3fa0" transform="rotate(5,200,155)"/>
  <circle cx="190" cy="135" r="3" fill="#d4a843" transform="rotate(5,200,155)"/>
  <circle cx="200" cy="148" r="3" fill="#d4a843" transform="rotate(5,200,155)"/>
  <circle cx="210" cy="135" r="3" fill="#d4a843" transform="rotate(5,200,155)"/>
  <!-- 21 badge -->
  <circle cx="300" cy="150" r="50" fill="#0d0820" stroke="#d4a843" stroke-width="2.5" filter="url(#glow)" opacity="0.9"/>
  <text x="300" y="165" font-family="Georgia,serif" font-size="40" font-weight="bold" fill="#d4a843" text-anchor="middle" filter="url(#glow)">21</text>
  <!-- Title -->
  <text x="200" y="290" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="2">BLACKJACK PRO</text>
</svg>`);

const TEXAS_HOLDEM =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0d35"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1b69"/>
      <stop offset="100%" stop-color="#1a0e3d"/>
    </linearGradient>
    <radialGradient id="chip-purple" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#9060d0"/>
      <stop offset="100%" stop-color="#4a2680"/>
    </radialGradient>
    <radialGradient id="chip-gold" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="100%" stop-color="#a07830"/>
    </radialGradient>
    <radialGradient id="chip-dark" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#2d1450"/>
      <stop offset="100%" stop-color="#0d0820"/>
    </radialGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#1a0e3d" flood-opacity="0.9"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table oval -->
  <ellipse cx="200" cy="155" rx="175" ry="120" fill="#1a0d35" stroke="#d4a843" stroke-width="1.5" opacity="0.7"/>
  <!-- Texas star — gold -->
  <path d="M200,30 L207,52 L230,52 L212,65 L219,88 L200,75 L181,88 L188,65 L170,52 L193,52 Z" fill="#d4a843" opacity="0.7"/>
  <!-- Community cards — dark purple face -->
  <rect x="110" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <text x="120" y="132" font-family="Georgia,serif" font-size="15" fill="#e8c76a">A</text>
  <text x="118" y="148" font-family="Georgia,serif" font-size="12" fill="#e8c76a">♠</text>
  <rect x="162" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <!-- Card suits — purple -->
  <text x="172" y="132" font-family="Georgia,serif" font-size="15" fill="#9060d0">K</text>
  <text x="170" y="148" font-family="Georgia,serif" font-size="12" fill="#9060d0">♥</text>
  <rect x="214" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <text x="224" y="132" font-family="Georgia,serif" font-size="15" fill="#9060d0">Q</text>
  <text x="222" y="148" font-family="Georgia,serif" font-size="12" fill="#9060d0">♦</text>
  <rect x="266" y="112" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)" transform="rotate(4,288,144)"/>
  <text x="274" y="134" font-family="Georgia,serif" font-size="15" fill="#e8c76a" transform="rotate(4,288,144)">J</text>
  <text x="272" y="150" font-family="Georgia,serif" font-size="12" fill="#e8c76a" transform="rotate(4,288,144)">♣</text>
  <!-- Poker chip stacks — purple/gold/dark palette -->
  <ellipse cx="100" cy="235" rx="28" ry="10" fill="url(#chip-dark)"/>
  <ellipse cx="100" cy="228" rx="28" ry="10" fill="url(#chip-gold)" stroke="#d4a843" stroke-width="1" opacity="0.8"/>
  <ellipse cx="100" cy="221" rx="28" ry="10" fill="url(#chip-purple)" stroke="#9060d0" stroke-width="1" opacity="0.9"/>
  <ellipse cx="300" cy="235" rx="28" ry="10" fill="url(#chip-dark)"/>
  <ellipse cx="300" cy="228" rx="28" ry="10" fill="url(#chip-purple)" stroke="#9060d0" stroke-width="1" opacity="0.8"/>
  <ellipse cx="300" cy="221" rx="28" ry="10" fill="url(#chip-gold)" stroke="#d4a843" stroke-width="1" opacity="0.9"/>
  <ellipse cx="300" cy="214" rx="28" ry="10" fill="url(#chip-dark)" stroke="#6b3fa0" stroke-width="1" opacity="0.7"/>
  <!-- Hole cards face down — purple back -->
  <rect x="163" y="200" width="35" height="50" rx="4" fill="#4a2680" stroke="#d4a843" stroke-width="1.5" transform="rotate(-6,180,225)"/>
  <rect x="185" y="200" width="35" height="50" rx="4" fill="#4a2680" stroke="#d4a843" stroke-width="1.5" transform="rotate(6,202,225)"/>
  <!-- Title -->
  <text x="200" y="291" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#d4a843" text-anchor="middle" letter-spacing="2">TEXAS HOLD'EM</text>
</svg>`);

const THREE_CARD_POKER =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#1a0d35"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1b69"/>
      <stop offset="100%" stop-color="#1a0e3d"/>
    </linearGradient>
    <radialGradient id="chip-gold" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#e8c76a"/>
      <stop offset="100%" stop-color="#a07830"/>
    </radialGradient>
    <radialGradient id="chip-purple" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#9060d0"/>
      <stop offset="100%" stop-color="#4a2680"/>
    </radialGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#1a0e3d" flood-opacity="0.9"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Glow behind cards -->
  <ellipse cx="200" cy="165" rx="150" ry="80" fill="#6b3fa0" opacity="0.1" filter="url(#glow)"/>
  <!-- Three cards fanned out — dark purple face -->
  <!-- Left card -->
  <rect x="70" y="100" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(-18,110,157)"/>
  <!-- Card suits — purple -->
  <text x="80" y="122" font-family="Georgia,serif" font-size="20" fill="#9060d0" transform="rotate(-18,110,157)">A</text>
  <text x="78" y="140" font-family="Georgia,serif" font-size="15" fill="#9060d0" transform="rotate(-18,110,157)">♦</text>
  <!-- Center card -->
  <rect x="160" y="90" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)"/>
  <text x="170" y="112" font-family="Georgia,serif" font-size="20" fill="#e8c76a">K</text>
  <text x="168" y="130" font-family="Georgia,serif" font-size="15" fill="#e8c76a">♠</text>
  <!-- Right card -->
  <rect x="250" y="100" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(18,290,157)"/>
  <text x="256" y="122" font-family="Georgia,serif" font-size="20" fill="#9060d0" transform="rotate(18,290,157)">Q</text>
  <text x="254" y="140" font-family="Georgia,serif" font-size="15" fill="#9060d0" transform="rotate(18,290,157)">♥</text>
  <!-- Chip stacks -->
  <ellipse cx="90" cy="240" rx="25" ry="9" fill="url(#chip-purple)"/>
  <text x="90" y="243" font-family="Arial" font-size="7" fill="#d4a843" text-anchor="middle" font-weight="bold">100</text>
  <ellipse cx="90" cy="232" rx="25" ry="9" fill="url(#chip-gold)" stroke="#d4a843" stroke-width="0.5"/>
  <text x="90" y="235" font-family="Arial" font-size="7" fill="#4a2680" text-anchor="middle" font-weight="bold">25</text>
  <ellipse cx="310" cy="240" rx="25" ry="9" fill="url(#chip-gold)"/>
  <text x="310" y="243" font-family="Arial" font-size="7" fill="#4a2680" text-anchor="middle" font-weight="bold">25</text>
  <ellipse cx="310" cy="232" rx="25" ry="9" fill="url(#chip-purple)" stroke="#9060d0" stroke-width="0.5"/>
  <text x="310" y="235" font-family="Arial" font-size="7" fill="#d4a843" text-anchor="middle" font-weight="bold">100</text>
  <ellipse cx="310" cy="224" rx="25" ry="9" fill="url(#chip-gold)" stroke="#d4a843" stroke-width="0.5"/>
  <!-- Title -->
  <text x="200" y="52" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9060d0" text-anchor="middle" letter-spacing="2" filter="url(#glow)" opacity="0.6">THREE CARD POKER</text>
  <text x="200" y="52" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9060d0" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
  <text x="200" y="287" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9060d0" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
</svg>`);

// ── Midnight Dragons thumbnail ───────────────────────────────────────────────

const MIDNIGHT_DRAGONS =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="md-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030a18"/>
      <stop offset="100%" stop-color="#040d22"/>
    </linearGradient>
    <linearGradient id="md-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#a07830"/>
    </linearGradient>
    <linearGradient id="md-blue" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a7ae8"/>
      <stop offset="100%" stop-color="#2952c4"/>
    </linearGradient>
    <linearGradient id="md-title" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4a7ae8"/>
      <stop offset="50%" stop-color="#8aadff"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
    <filter id="md-glow"><feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="md-dragon-glow"><feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#md-bg)"/>
  <!-- Stars -->
  <circle cx="30" cy="20" r="1.5" fill="#4a7ae8" opacity="0.7"/>
  <circle cx="80" cy="12" r="1" fill="#D4AF37" opacity="0.6"/>
  <circle cx="200" cy="8" r="1.5" fill="#4a7ae8" opacity="0.8"/>
  <circle cx="320" cy="15" r="1" fill="#D4AF37" opacity="0.7"/>
  <circle cx="370" cy="30" r="1.5" fill="#4a7ae8" opacity="0.6"/>
  <circle cx="50" cy="270" r="1" fill="#4a7ae8" opacity="0.5"/>
  <circle cx="350" cy="265" r="1.5" fill="#D4AF37" opacity="0.5"/>
  <!-- 8x8 reel grid background -->
  <rect x="80" y="50" width="240" height="180" rx="6" fill="#060e20" stroke="#2952c4" stroke-width="1.5"/>
  <!-- Grid lines (8 cols x 8 rows) -->
  <line x1="110" y1="50" x2="110" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="140" y1="50" x2="140" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="170" y1="50" x2="170" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="200" y1="50" x2="200" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="230" y1="50" x2="230" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="260" y1="50" x2="260" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="290" y1="50" x2="290" y2="230" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="72.5" x2="320" y2="72.5" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="95" x2="320" y2="95" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="117.5" x2="320" y2="117.5" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="140" x2="320" y2="140" stroke="#D4AF37" stroke-width="1" opacity="0.5"/>
  <line x1="80" y1="162.5" x2="320" y2="162.5" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="185" x2="320" y2="185" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <line x1="80" y1="207.5" x2="320" y2="207.5" stroke="#2952c4" stroke-width="0.5" opacity="0.4"/>
  <!-- Win row highlight (row 4) -->
  <rect x="80" y="128" width="240" height="22.5" fill="#D4AF37" opacity="0.12"/>
  <rect x="80" y="128" width="240" height="22.5" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.5"/>
  <!-- Flame symbols in grid (scattered) -->
  <text x="95" y="68" font-family="serif" font-size="14">🔥</text>
  <text x="155" y="90" font-family="serif" font-size="12">💎</text>
  <text x="215" y="68" font-family="serif" font-size="14">👑</text>
  <text x="245" y="112" font-family="serif" font-size="12">🌙</text>
  <text x="275" y="88" font-family="serif" font-size="14">🔥</text>
  <text x="125" y="156" font-family="serif" font-size="16">💎</text>
  <text x="155" y="136" font-family="serif" font-size="16">💎</text>
  <text x="185" y="136" font-family="serif" font-size="16">💎</text>
  <text x="215" y="136" font-family="serif" font-size="16">💎</text>
  <text x="245" y="156" font-family="serif" font-size="16">👁</text>
  <!-- Ruby dragon (left, small) -->
  <g transform="translate(35,140)" filter="url(#md-dragon-glow)">
    <path d="M0,0 C-10,-8 -18,-14 -16,-22 C-13,-30 -4,-30 0,-22 C4,-30 13,-30 16,-22 C18,-14 10,-8 0,0Z" fill="url(#md-ruby)"/>
    <ellipse cx="0" cy="-22" rx="9" ry="7" fill="#D4AF37"/>
    <circle cx="-4" cy="-24" r="2.5" fill="#7B2FBE"/>
    <circle cx="-4" cy="-24" r="1" fill="#1a0d3a"/>
    <path d="M-16,-14 C-28,-10 -32,2 -26,5 C-22,7 -18,2 -14,-3Z" fill="#a07830" opacity="0.85"/>
  </g>
  <!-- Blue dragon (right, small) -->
  <g transform="translate(365,140) scale(-1,1)" filter="url(#md-dragon-glow)">
    <path d="M0,0 C-10,-8 -18,-14 -16,-22 C-13,-30 -4,-30 0,-22 C4,-30 13,-30 16,-22 C18,-14 10,-8 0,0Z" fill="url(#md-blue)"/>
    <ellipse cx="0" cy="-22" rx="9" ry="7" fill="#2952c4"/>
    <circle cx="-4" cy="-24" r="2.5" fill="#D4AF37"/>
    <circle cx="-4" cy="-24" r="1" fill="#00050a"/>
    <path d="M-16,-14 C-28,-10 -32,2 -26,5 C-22,7 -18,2 -14,-3Z" fill="#0d1f7a" opacity="0.85"/>
  </g>
  <!-- Title glow -->
  <text x="200" y="268" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="url(#md-title)" text-anchor="middle" letter-spacing="3" filter="url(#md-glow)" opacity="0.5">MIDNIGHT DRAGONS</text>
  <text x="200" y="268" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="url(#md-title)" text-anchor="middle" letter-spacing="3">MIDNIGHT DRAGONS</text>
  <!-- 8x8 badge -->
  <rect x="163" y="276" width="74" height="18" rx="4" fill="#D4AF37" opacity="0.15" stroke="#D4AF37" stroke-width="0.8"/>
  <text x="200" y="288" font-family="Georgia,serif" font-size="9" fill="#D4AF37" text-anchor="middle" letter-spacing="2">8×8 REELS</text>
</svg>`);

// ── Lookup maps ──────────────────────────────────────────────────────────────

const GAME_IMAGES_BY_ID: Record<number, string> = {
  1: LUCKY_SEVENS,
  2: GOLDEN_FORTUNE,
  3: NEON_NIGHTS,
  4: DIAMOND_RUSH,
  5: WILD_SAFARI,
  6: SPACE_ODYSSEY,
  7: ROULETTE_ROYALE,
  8: BACCARAT_CLASSIC,
  9: CRAPS_DELUXE,
  10: BLACKJACK_PRO,
  11: TEXAS_HOLDEM,
  12: THREE_CARD_POKER,
  13: MIDNIGHT_DRAGONS,
};

const GAME_GRADIENTS_BY_ID: Record<number, string> = {
  1: "from-purple-950 via-purple-950 to-purple-950",
  2: "from-purple-950 via-purple-900 to-purple-950",
  3: "from-purple-950 via-purple-900 to-purple-950",
  4: "from-purple-950 via-purple-900 to-zinc-950",
  5: "from-purple-950 via-zinc-950 to-purple-900",
  6: "from-purple-950 via-purple-900 to-zinc-950",
  7: "from-purple-950 via-zinc-950 to-purple-950",
  8: "from-purple-950 via-purple-900 to-zinc-950",
  9: "from-zinc-950 via-purple-950 to-zinc-950",
  10: "from-purple-950 via-zinc-950 to-purple-900",
  11: "from-zinc-950 via-purple-950 to-zinc-950",
  12: "from-purple-950 via-purple-900 to-purple-950",
};

/**
 * Returns an SVG data URI for the given game.
 * Falls back to a gradient class string if no SVG is found.
 */
export function getGameImage(gameId: number): string | null {
  const id = Number(gameId);
  return GAME_IMAGES_BY_ID[id] ?? null;
}

/**
 * Returns a Tailwind gradient string for fallback backgrounds.
 */
export function getGameGradient(gameId: number): string {
  const id = Number(gameId);
  return GAME_GRADIENTS_BY_ID[id] ?? "from-muted to-secondary";
}

/**
 * Returns the Midnight Dragons SVG thumbnail data URI.
 */
export function getMidnightDragonsImage(): string {
  return MIDNIGHT_DRAGONS;
}
