/**
 * Game-specific SVG illustrations as data URIs.
 * Each SVG is themed for its game with a dark casino aesthetic.
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
      <stop offset="0%" stop-color="#1a0505"/>
      <stop offset="100%" stop-color="#2d0a0a"/>
    </linearGradient>
    <linearGradient id="reel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2a1a00"/>
      <stop offset="100%" stop-color="#1a1000"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="50%" stop-color="#ffaa00"/>
      <stop offset="100%" stop-color="#cc7700"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Stars -->
  <circle cx="30" cy="20" r="1.5" fill="#ffd700" opacity="0.6"/>
  <circle cx="370" cy="40" r="1" fill="#ffd700" opacity="0.5"/>
  <circle cx="60" cy="260" r="1" fill="#ffd700" opacity="0.4"/>
  <circle cx="340" cy="250" r="1.5" fill="#ffd700" opacity="0.6"/>
  <!-- Slot machine frame -->
  <rect x="60" y="50" width="280" height="200" rx="16" fill="#1c0800" stroke="#ffd700" stroke-width="2.5"/>
  <rect x="70" y="60" width="260" height="180" rx="10" fill="#111"/>
  <!-- Reel windows -->
  <rect x="85" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#ffd700" stroke-width="1.5"/>
  <rect x="165" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#ffd700" stroke-width="1.5"/>
  <rect x="245" y="80" width="70" height="140" rx="8" fill="url(#reel)" stroke="#ffd700" stroke-width="1.5"/>
  <!-- 7 in each reel -->
  <text x="120" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="200" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="280" y="162" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#glow)">7</text>
  <!-- Win line -->
  <line x1="80" y1="150" x2="320" y2="150" stroke="#ff4444" stroke-width="2.5" stroke-dasharray="4,3" opacity="0.8"/>
  <!-- Title bar -->
  <rect x="60" y="245" width="280" height="30" rx="0" fill="#1c0800"/>
  <text x="200" y="265" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="4">LUCKY SEVENS</text>
</svg>`);

const GOLDEN_FORTUNE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0a00"/>
      <stop offset="100%" stop-color="#1a1200"/>
    </linearGradient>
    <linearGradient id="chest" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b4513"/>
      <stop offset="100%" stop-color="#4a2000"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="50%" stop-color="#ffaa00"/>
      <stop offset="100%" stop-color="#cc7700"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Glow behind chest -->
  <ellipse cx="200" cy="220" rx="120" ry="40" fill="#ffd700" opacity="0.08"/>
  <!-- Floating coins -->
  <ellipse cx="90" cy="100" rx="22" ry="10" fill="url(#gold)" opacity="0.9"/>
  <text x="90" y="104" font-family="Arial" font-size="10" fill="#7a4500" text-anchor="middle" font-weight="bold">¥</text>
  <ellipse cx="310" cy="85" rx="22" ry="10" fill="url(#gold)" opacity="0.9"/>
  <text x="310" y="89" font-family="Arial" font-size="10" fill="#7a4500" text-anchor="middle" font-weight="bold">$</text>
  <ellipse cx="60" cy="170" rx="18" ry="8" fill="url(#gold)" opacity="0.7"/>
  <ellipse cx="340" cy="155" rx="18" ry="8" fill="url(#gold)" opacity="0.7"/>
  <ellipse cx="130" cy="55" rx="20" ry="9" fill="url(#gold)" opacity="0.8"/>
  <ellipse cx="270" cy="50" rx="20" ry="9" fill="url(#gold)" opacity="0.8"/>
  <!-- Treasure chest body -->
  <rect x="110" y="170" width="180" height="100" rx="8" fill="url(#chest)" stroke="#ffd700" stroke-width="2"/>
  <!-- Chest lid -->
  <path d="M110,170 Q110,120 200,120 Q290,120 290,170 Z" fill="#6b3410" stroke="#ffd700" stroke-width="2"/>
  <!-- Chest lock -->
  <rect x="182" y="155" width="36" height="28" rx="4" fill="#ffd700"/>
  <circle cx="200" cy="162" r="8" fill="#cc7700"/>
  <rect x="196" y="165" width="8" height="10" rx="2" fill="#cc7700"/>
  <!-- Coins spilling -->
  <ellipse cx="155" cy="172" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="185" cy="168" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="215" cy="168" rx="16" ry="7" fill="url(#gold)"/>
  <ellipse cx="245" cy="172" rx="16" ry="7" fill="url(#gold)"/>
  <!-- Title -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="3">GOLDEN FORTUNE</text>
</svg>`);

const NEON_NIGHTS =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0015"/>
      <stop offset="100%" stop-color="#15002a"/>
    </linearGradient>
    <filter id="neon-cyan"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="neon-pink"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Moon -->
  <circle cx="340" cy="45" r="25" fill="#1a003a"/>
  <circle cx="348" cy="38" r="22" fill="#0a0015"/>
  <!-- Stars -->
  <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
  <circle cx="80" cy="15" r="1" fill="#fff" opacity="0.6"/>
  <circle cx="160" cy="25" r="1.5" fill="#fff" opacity="0.7"/>
  <circle cx="250" cy="10" r="1" fill="#fff" opacity="0.5"/>
  <circle cx="50" cy="70" r="1" fill="#00ffff" opacity="0.8"/>
  <circle cx="200" cy="35" r="1" fill="#ff00ff" opacity="0.7"/>
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
  <!-- Neon signs -->
  <text x="60" y="175" font-family="Arial" font-size="11" font-weight="bold" fill="#00ffff" filter="url(#neon-cyan)" opacity="0.9">BAR</text>
  <text x="165" y="165" font-family="Arial" font-size="9" font-weight="bold" fill="#ff00ff" filter="url(#neon-pink)" opacity="0.9">CASINO</text>
  <text x="268" y="148" font-family="Arial" font-size="10" font-weight="bold" fill="#00ffff" filter="url(#neon-cyan)" opacity="0.9">HOTEL</text>
  <!-- Neon grid floor reflection -->
  <line x1="200" y1="220" x2="0" y2="300" stroke="#ff00ff" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="220" x2="400" y2="300" stroke="#ff00ff" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="230" x2="0" y2="300" stroke="#00ffff" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="230" x2="400" y2="300" stroke="#00ffff" stroke-width="0.5" opacity="0.3"/>
  <!-- Title with neon glow -->
  <text x="200" y="102" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#ff00ff" text-anchor="middle" filter="url(#neon-pink)" opacity="0.5">NEON NIGHTS</text>
  <text x="200" y="102" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#ff00ff" text-anchor="middle">NEON NIGHTS</text>
</svg>`);

const DIAMOND_RUSH =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#000a1a"/>
      <stop offset="100%" stop-color="#001030"/>
    </linearGradient>
    <linearGradient id="diamond1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a8e8ff"/>
      <stop offset="40%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#0080cc"/>
    </linearGradient>
    <linearGradient id="diamond2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#88ccff"/>
      <stop offset="100%" stop-color="#4499dd"/>
    </linearGradient>
    <filter id="sparkle"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Background sparkles -->
  <circle cx="50" cy="40" r="2" fill="#00d4ff" opacity="0.6" filter="url(#sparkle)"/>
  <circle cx="350" cy="60" r="2.5" fill="#ffffff" opacity="0.8" filter="url(#sparkle)"/>
  <circle cx="30" cy="200" r="1.5" fill="#00d4ff" opacity="0.5"/>
  <circle cx="370" cy="220" r="2" fill="#88ccff" opacity="0.6"/>
  <circle cx="100" cy="260" r="1.5" fill="#ffffff" opacity="0.4"/>
  <circle cx="300" cy="250" r="2" fill="#00d4ff" opacity="0.5"/>
  <!-- Star sparkles -->
  <path d="M60,80 L62,74 L64,80 L70,82 L64,84 L62,90 L60,84 L54,82 Z" fill="#00d4ff" filter="url(#sparkle)" opacity="0.8"/>
  <path d="M330,100 L332,94 L334,100 L340,102 L334,104 L332,110 L330,104 L324,102 Z" fill="#ffffff" filter="url(#sparkle)" opacity="0.9"/>
  <path d="M80,230 L81,227 L82,230 L85,231 L82,232 L81,235 L80,232 L77,231 Z" fill="#88ccff" opacity="0.7"/>
  <path d="M320,240 L321,237 L322,240 L325,241 L322,242 L321,245 L320,242 L317,241 Z" fill="#00d4ff" opacity="0.7"/>
  <!-- Large central diamond -->
  <polygon points="200,60 250,150 200,210 150,150" fill="url(#diamond1)" stroke="#a8e8ff" stroke-width="1.5"/>
  <polygon points="200,60 250,150 200,100" fill="#e8f8ff" opacity="0.5"/>
  <polygon points="200,60 150,150 200,100" fill="#88ccff" opacity="0.3"/>
  <line x1="200" y1="60" x2="200" y2="210" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
  <line x1="150" y1="150" x2="250" y2="150" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
  <!-- Small diamonds -->
  <polygon points="90,100 110,140 90,165 70,140" fill="url(#diamond2)" stroke="#88ccff" stroke-width="1" opacity="0.8"/>
  <polygon points="310,90 330,130 310,155 290,130" fill="url(#diamond2)" stroke="#88ccff" stroke-width="1" opacity="0.8"/>
  <polygon points="120,210 135,240 120,260 105,240" fill="url(#diamond2)" stroke="#88ccff" stroke-width="1" opacity="0.6"/>
  <polygon points="280,200 295,230 280,250 265,230" fill="url(#diamond2)" stroke="#88ccff" stroke-width="1" opacity="0.6"/>
  <!-- Title -->
  <text x="200" y="285" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#00d4ff" text-anchor="middle" letter-spacing="3" filter="url(#sparkle)">DIAMOND RUSH</text>
</svg>`);

const WILD_SAFARI =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a0a00"/>
      <stop offset="40%" stop-color="#cc4400"/>
      <stop offset="70%" stop-color="#ff8800"/>
      <stop offset="100%" stop-color="#ffbb44"/>
    </linearGradient>
    <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d2200"/>
      <stop offset="100%" stop-color="#2a1500"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Sun -->
  <circle cx="200" cy="80" r="45" fill="#ffcc00" opacity="0.9"/>
  <circle cx="200" cy="80" r="38" fill="#ffaa00"/>
  <!-- Ground -->
  <rect x="0" y="210" width="400" height="90" fill="url(#ground)"/>
  <rect x="0" y="200" width="400" height="20" fill="#4a2800"/>
  <!-- Acacia tree left -->
  <rect x="55" y="130" width="12" height="85" fill="#3d2000"/>
  <ellipse cx="61" cy="125" rx="38" ry="20" fill="#1a4000"/>
  <ellipse cx="45" cy="118" rx="22" ry="14" fill="#1a4000"/>
  <ellipse cx="80" cy="120" rx="22" ry="14" fill="#154000"/>
  <!-- Acacia tree right -->
  <rect x="320" y="140" width="10" height="75" fill="#3d2000"/>
  <ellipse cx="325" cy="134" rx="32" ry="18" fill="#1a4000"/>
  <ellipse cx="308" cy="128" rx="20" ry="12" fill="#154000"/>
  <ellipse cx="342" cy="130" rx="20" ry="12" fill="#1a4000"/>
  <!-- Lion silhouette -->
  <ellipse cx="140" cy="205" rx="45" ry="22" fill="#1a0a00"/>
  <circle cx="175" cy="192" r="20" fill="#1a0a00"/>
  <circle cx="175" cy="192" r="15" fill="#250d00"/>
  <!-- Mane -->
  <circle cx="175" cy="188" r="22" fill="#1a0a00" opacity="0.8"/>
  <!-- Legs -->
  <rect x="110" y="215" width="10" height="20" fill="#1a0a00"/>
  <rect x="130" y="215" width="10" height="20" fill="#1a0a00"/>
  <rect x="155" y="215" width="10" height="20" fill="#1a0a00"/>
  <rect x="170" y="215" width="10" height="20" fill="#1a0a00"/>
  <!-- Elephant silhouette far right -->
  <ellipse cx="300" cy="205" rx="50" ry="28" fill="#1a0a00"/>
  <rect x="275" y="200" width="50" height="35" fill="#1a0a00"/>
  <!-- Trunk -->
  <path d="M255,200 Q235,210 240,230" stroke="#1a0a00" stroke-width="10" fill="none" stroke-linecap="round"/>
  <!-- Tusks -->
  <path d="M258,208 Q245,220 250,232" stroke="#f5f0e0" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
  <!-- Elephant head -->
  <circle cx="265" cy="192" r="28" fill="#1a0a00"/>
  <!-- Ear -->
  <ellipse cx="248" cy="193" rx="16" ry="22" fill="#150800"/>
  <!-- Elephant legs -->
  <rect x="285" y="225" width="15" height="25" fill="#1a0a00"/>
  <rect x="305" y="225" width="15" height="25" fill="#1a0a00"/>
  <!-- Birds in sky -->
  <path d="M100,55 Q110,48 120,55" stroke="#1a0a00" stroke-width="2" fill="none"/>
  <path d="M130,40 Q140,33 150,40" stroke="#1a0a00" stroke-width="2" fill="none"/>
  <path d="M250,65 Q260,58 270,65" stroke="#1a0a00" stroke-width="2" fill="none"/>
  <!-- Title -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffbb44" text-anchor="middle" letter-spacing="3">WILD SAFARI</text>
</svg>`);

const SPACE_ODYSSEY =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="space" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0d0030"/>
      <stop offset="100%" stop-color="#000010"/>
    </radialGradient>
    <radialGradient id="planet1" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#6644cc"/>
      <stop offset="100%" stop-color="#220066"/>
    </radialGradient>
    <radialGradient id="planet2" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#4466ff"/>
      <stop offset="100%" stop-color="#001166"/>
    </radialGradient>
    <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#cc00ff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#4400cc" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#space)"/>
  <!-- Nebula -->
  <ellipse cx="200" cy="150" rx="200" ry="120" fill="url(#nebula)"/>
  <!-- Stars -->
  <circle cx="20" cy="15" r="1" fill="white" opacity="0.9"/>
  <circle cx="55" cy="35" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="90" cy="10" r="1" fill="white" opacity="0.8"/>
  <circle cx="150" cy="25" r="1" fill="white" opacity="0.6"/>
  <circle cx="220" cy="8" r="1.5" fill="white" opacity="0.9"/>
  <circle cx="280" cy="30" r="1" fill="white" opacity="0.7"/>
  <circle cx="340" cy="15" r="1.5" fill="white" opacity="0.8"/>
  <circle cx="380" cy="45" r="1" fill="white" opacity="0.5"/>
  <circle cx="30" cy="100" r="1" fill="white" opacity="0.6"/>
  <circle cx="375" cy="120" r="1.5" fill="white" opacity="0.8"/>
  <circle cx="15" cy="200" r="1" fill="white" opacity="0.7"/>
  <circle cx="390" cy="200" r="1" fill="white" opacity="0.6"/>
  <circle cx="100" cy="270" r="1.5" fill="white" opacity="0.5"/>
  <circle cx="290" cy="260" r="1" fill="white" opacity="0.7"/>
  <circle cx="360" cy="280" r="1.5" fill="#aaaaff" opacity="0.8"/>
  <!-- Large planet with rings -->
  <circle cx="130" cy="110" r="55" fill="url(#planet1)"/>
  <ellipse cx="130" cy="110" rx="80" ry="14" fill="none" stroke="#9966ff" stroke-width="5" opacity="0.6"/>
  <ellipse cx="130" cy="110" rx="80" ry="14" fill="none" stroke="#ccaaff" stroke-width="2" opacity="0.5"/>
  <!-- Planet surface lines -->
  <ellipse cx="130" cy="100" rx="50" ry="10" fill="none" stroke="#8844aa" stroke-width="1.5" opacity="0.4"/>
  <ellipse cx="130" cy="120" rx="50" ry="10" fill="none" stroke="#8844aa" stroke-width="1" opacity="0.3"/>
  <!-- Small blue planet -->
  <circle cx="310" cy="80" r="30" fill="url(#planet2)"/>
  <ellipse cx="310" cy="75" rx="28" ry="8" fill="none" stroke="#6688ff" stroke-width="1.5" opacity="0.5"/>
  <!-- Rocket -->
  <g transform="translate(220, 155) rotate(-30)">
    <rect x="-8" y="-30" width="16" height="45" rx="8" fill="#ddddee"/>
    <polygon points="-8,-30 8,-30 0,-50" fill="#cc3300"/>
    <rect x="-14" y="5" width="10" height="18" rx="3" fill="#aaaacc"/>
    <rect x="4" y="5" width="10" height="18" rx="3" fill="#aaaacc"/>
    <!-- Engine glow -->
    <ellipse cx="0" cy="15" rx="7" ry="14" fill="#ff6600" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="0" cy="15" rx="4" ry="10" fill="#ffff00" opacity="0.9"/>
    <circle cx="-2" cy="0" r="4" fill="#88bbff"/>
    <circle cx="2" cy="0" r="4" fill="#88bbff"/>
  </g>
  <!-- Title -->
  <text x="200" y="285" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9966ff" text-anchor="middle" letter-spacing="3" filter="url(#glow)">SPACE ODYSSEY</text>
</svg>`);

const ROULETTE_ROYALE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0d1a00"/>
      <stop offset="100%" stop-color="#050800"/>
    </radialGradient>
    <radialGradient id="wheel" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3d2200"/>
      <stop offset="100%" stop-color="#1a0e00"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Wheel outer ring -->
  <circle cx="200" cy="150" r="130" fill="#1a0800" stroke="#ffd700" stroke-width="3"/>
  <!-- Wheel sectors (alternating red/black) -->
  <g transform="translate(200,150)">
    <!-- 18 red sectors -->
    <path d="M0,0 L0,-120 A120,120 0 0,1 37.3,-114.1 Z" fill="#cc0000"/>
    <path d="M0,0 L74.6,-91.9 A120,120 0 0,1 102.4,-63.2 Z" fill="#cc0000"/>
    <path d="M0,0 L116.5,-34.1 A120,120 0 0,1 120,0 Z" fill="#cc0000"/>
    <path d="M0,0 L116.5,34.1 A120,120 0 0,1 102.4,63.2 Z" fill="#cc0000"/>
    <path d="M0,0 L74.6,91.9 A120,120 0 0,1 37.3,114.1 Z" fill="#cc0000"/>
    <path d="M0,0 L0,120 A120,120 0 0,1 -37.3,114.1 Z" fill="#cc0000"/>
    <path d="M0,0 L-74.6,91.9 A120,120 0 0,1 -102.4,63.2 Z" fill="#cc0000"/>
    <path d="M0,0 L-116.5,34.1 A120,120 0 0,1 -120,0 Z" fill="#cc0000"/>
    <path d="M0,0 L-116.5,-34.1 A120,120 0 0,1 -102.4,-63.2 Z" fill="#cc0000"/>
    <path d="M0,0 L-74.6,-91.9 A120,120 0 0,1 -37.3,-114.1 Z" fill="#cc0000"/>
    <!-- Black sectors fill remaining -->
    <path d="M0,0 L37.3,-114.1 A120,120 0 0,1 74.6,-91.9 Z" fill="#111111"/>
    <path d="M0,0 L102.4,-63.2 A120,120 0 0,1 116.5,-34.1 Z" fill="#111111"/>
    <path d="M0,0 L120,0 A120,120 0 0,1 116.5,34.1 Z" fill="#111111"/>
    <path d="M0,0 L102.4,63.2 A120,120 0 0,1 74.6,91.9 Z" fill="#111111"/>
    <path d="M0,0 L37.3,114.1 A120,120 0 0,1 0,120 Z" fill="#111111"/>
    <path d="M0,0 L-37.3,114.1 A120,120 0 0,1 -74.6,91.9 Z" fill="#111111"/>
    <path d="M0,0 L-102.4,63.2 A120,120 0 0,1 -116.5,34.1 Z" fill="#111111"/>
    <path d="M0,0 L-120,0 A120,120 0 0,1 -116.5,-34.1 Z" fill="#111111"/>
    <path d="M0,0 L-102.4,-63.2 A120,120 0 0,1 -74.6,-91.9 Z" fill="#111111"/>
    <path d="M0,0 L-37.3,-114.1 A120,120 0 0,1 0,-120 Z" fill="#111111"/>
    <!-- Zero -->
    <path d="M0,0 L-37.3,-114.1 A120,120 0 0,1 0,-120 Z" fill="#006600"/>
  </g>
  <!-- Spoke lines -->
  <g transform="translate(200,150)" stroke="#ffd700" stroke-width="1" opacity="0.5">
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
  <circle cx="200" cy="150" r="22" fill="#ffd700"/>
  <circle cx="200" cy="150" r="14" fill="#cc7700"/>
  <circle cx="200" cy="150" r="7" fill="#ffd700"/>
  <!-- Ball -->
  <circle cx="200" cy="45" r="7" fill="#ffffff" filter="url(#glow)"/>
  <!-- Title -->
  <text x="200" y="293" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="2">ROULETTE ROYALE</text>
</svg>`);

const BACCARAT_CLASSIC =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003300"/>
      <stop offset="100%" stop-color="#001800"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffdf0"/>
      <stop offset="100%" stop-color="#f5f0e0"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table oval border -->
  <ellipse cx="200" cy="150" rx="185" ry="130" fill="none" stroke="#ffd700" stroke-width="2" opacity="0.6"/>
  <ellipse cx="200" cy="150" rx="175" ry="120" fill="none" stroke="#ffd700" stroke-width="1" opacity="0.3"/>
  <!-- Table label -->
  <text x="200" y="45" font-family="Georgia,serif" font-size="11" fill="#ffd700" text-anchor="middle" opacity="0.6" letter-spacing="8">BACCARAT</text>
  <!-- Player / Banker labels -->
  <text x="110" y="255" font-family="Georgia,serif" font-size="12" fill="#ffd700" text-anchor="middle" opacity="0.7">PLAYER</text>
  <text x="290" y="255" font-family="Georgia,serif" font-size="12" fill="#ffd700" text-anchor="middle" opacity="0.7">BANKER</text>
  <!-- Player cards -->
  <rect x="60" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(-8,92,175)"/>
  <text x="73" y="155" font-family="Georgia,serif" font-size="22" fill="#cc0000" transform="rotate(-8,92,175)">A</text>
  <text x="73" y="170" font-family="Georgia,serif" font-size="14" fill="#cc0000" transform="rotate(-8,92,175)">♥</text>
  <rect x="90" y="135" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(5,122,180)"/>
  <text x="100" y="160" font-family="Georgia,serif" font-size="22" fill="#000000" transform="rotate(5,122,180)">K</text>
  <text x="100" y="175" font-family="Georgia,serif" font-size="14" fill="#000000" transform="rotate(5,122,180)">♠</text>
  <!-- Banker cards -->
  <rect x="245" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(-5,277,175)"/>
  <text x="255" y="155" font-family="Georgia,serif" font-size="22" fill="#cc0000" transform="rotate(-5,277,175)">Q</text>
  <text x="255" y="170" font-family="Georgia,serif" font-size="14" fill="#cc0000" transform="rotate(-5,277,175)">♦</text>
  <rect x="270" y="130" width="65" height="90" rx="6" fill="url(#card)" filter="url(#shadow)" transform="rotate(8,302,175)"/>
  <text x="278" y="155" font-family="Georgia,serif" font-size="22" fill="#000000" transform="rotate(8,302,175)">J</text>
  <text x="278" y="170" font-family="Georgia,serif" font-size="14" fill="#000000" transform="rotate(8,302,175)">♣</text>
  <!-- Center TIE area -->
  <rect x="170" y="140" width="60" height="40" rx="4" fill="#004400" stroke="#ffd700" stroke-width="1" opacity="0.8"/>
  <text x="200" y="164" font-family="Georgia,serif" font-size="11" fill="#ffd700" text-anchor="middle" font-weight="bold">TIE</text>
  <!-- Title -->
  <text x="200" y="292" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="2">BACCARAT CLASSIC</text>
</svg>`);

const CRAPS_DELUXE =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003a00"/>
      <stop offset="100%" stop-color="#001d00"/>
    </linearGradient>
    <linearGradient id="dice" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e0e0e8"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.6"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table outline -->
  <rect x="20" y="30" width="360" height="240" rx="20" fill="none" stroke="#ffd700" stroke-width="2" opacity="0.4"/>
  <!-- Pass/Don't Pass line -->
  <rect x="40" y="220" width="320" height="28" rx="4" fill="#004a00" stroke="#ffd700" stroke-width="1.5" opacity="0.7"/>
  <text x="200" y="238" font-family="Georgia,serif" font-size="11" fill="#ffd700" text-anchor="middle" letter-spacing="3">PASS LINE</text>
  <!-- Come area -->
  <rect x="40" y="55" width="320" height="40" rx="4" fill="#004a00" stroke="#ffd700" stroke-width="1" opacity="0.5"/>
  <text x="200" y="80" font-family="Georgia,serif" font-size="11" fill="#ffd700" text-anchor="middle" letter-spacing="5">COME</text>
  <!-- Number boxes -->
  <rect x="55" y="105" width="42" height="36" rx="3" fill="#003300" stroke="#ffd700" stroke-width="1" opacity="0.7"/>
  <text x="76" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">4</text>
  <rect x="105" y="105" width="42" height="36" rx="3" fill="#003300" stroke="#ffd700" stroke-width="1" opacity="0.7"/>
  <text x="126" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">5</text>
  <rect x="155" y="105" width="42" height="36" rx="3" fill="#555500" stroke="#ffd700" stroke-width="1.5" opacity="0.9"/>
  <text x="176" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">6</text>
  <rect x="205" y="105" width="42" height="36" rx="3" fill="#555500" stroke="#ffd700" stroke-width="1.5" opacity="0.9"/>
  <text x="226" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">8</text>
  <rect x="255" y="105" width="42" height="36" rx="3" fill="#003300" stroke="#ffd700" stroke-width="1" opacity="0.7"/>
  <text x="276" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">9</text>
  <rect x="305" y="105" width="42" height="36" rx="3" fill="#003300" stroke="#ffd700" stroke-width="1" opacity="0.7"/>
  <text x="326" y="128" font-family="Georgia,serif" font-size="14" fill="#ffd700" text-anchor="middle">10</text>
  <!-- Dice pair (showing 3 + 4 = 7) -->
  <rect x="125" y="150" width="65" height="65" rx="10" fill="url(#dice)" filter="url(#shadow)"/>
  <circle cx="143" cy="168" r="5" fill="#cc0000"/>
  <circle cx="157.5" cy="182.5" r="5" fill="#cc0000"/>
  <circle cx="172" cy="197" r="5" fill="#cc0000"/>
  <rect x="210" y="150" width="65" height="65" rx="10" fill="url(#dice)" filter="url(#shadow)" transform="rotate(8,242,182)"/>
  <circle cx="223" cy="163" r="5" fill="#cc0000" transform="rotate(8,242,182)"/>
  <circle cx="242" cy="182" r="5" fill="#cc0000" transform="rotate(8,242,182)"/>
  <circle cx="261" cy="163" r="5" fill="#cc0000" transform="rotate(8,242,182)"/>
  <circle cx="242" cy="201" r="5" fill="#cc0000" transform="rotate(8,242,182)"/>
  <!-- Title -->
  <text x="200" y="292" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="2">CRAPS DELUXE</text>
</svg>`);

const BLACKJACK_PRO =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#001f00"/>
      <stop offset="100%" stop-color="#000f00"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffdf0"/>
      <stop offset="100%" stop-color="#f5f0e0"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.7"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Semicircle table edge -->
  <path d="M20,280 A200,180 0 0,1 380,280" fill="none" stroke="#ffd700" stroke-width="2" opacity="0.5"/>
  <!-- Blackjack pays label -->
  <text x="200" y="45" font-family="Georgia,serif" font-size="10" fill="#ffd700" text-anchor="middle" opacity="0.6" letter-spacing="2">BLACKJACK PAYS 3 TO 2</text>
  <!-- Insurance label -->
  <text x="200" y="65" font-family="Georgia,serif" font-size="10" fill="#ffd700" text-anchor="middle" opacity="0.5" letter-spacing="2">INSURANCE PAYS 2 TO 1</text>
  <!-- Ace of Spades card -->
  <rect x="90" y="90" width="90" height="130" rx="8" fill="url(#card)" filter="url(#shadow)"/>
  <!-- Large spade -->
  <path d="M135,125 C135,125 115,108 115,98 C115,90 125,86 130,91 C125,82 120,76 135,72 C150,76 145,82 140,91 C145,86 155,90 155,98 C155,108 135,125 135,125 Z" fill="#000"/>
  <rect x="132" y="120" width="6" height="12" fill="#000"/>
  <path d="M126,132 L144,132 L140,128 L130,128 Z" fill="#000"/>
  <text x="97" y="112" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="#000">A</text>
  <text x="97" y="127" font-family="Georgia,serif" font-size="14" fill="#000">♠</text>
  <!-- King of Hearts card -->
  <rect x="155" y="90" width="90" height="130" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(5,200,155)"/>
  <text x="163" y="112" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="#cc0000" transform="rotate(5,200,155)">K</text>
  <text x="163" y="127" font-family="Georgia,serif" font-size="14" fill="#cc0000" transform="rotate(5,200,155)">♥</text>
  <!-- Crown for King -->
  <path d="M185,145 L190,135 L200,148 L210,135 L215,145 L215,160 L185,160 Z" fill="#cc0000" transform="rotate(5,200,155)"/>
  <circle cx="190" cy="135" r="3" fill="#ffd700" transform="rotate(5,200,155)"/>
  <circle cx="200" cy="148" r="3" fill="#ffd700" transform="rotate(5,200,155)"/>
  <circle cx="210" cy="135" r="3" fill="#ffd700" transform="rotate(5,200,155)"/>
  <!-- 21 badge -->
  <circle cx="300" cy="150" r="50" fill="#001500" stroke="#ffd700" stroke-width="2.5" filter="url(#glow)" opacity="0.9"/>
  <text x="300" y="165" font-family="Georgia,serif" font-size="40" font-weight="bold" fill="#ffd700" text-anchor="middle" filter="url(#glow)">21</text>
  <!-- Title -->
  <text x="200" y="290" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="2">BLACKJACK PRO</text>
</svg>`);

const TEXAS_HOLDEM =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0f00"/>
      <stop offset="100%" stop-color="#0d0700"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffdf0"/>
      <stop offset="100%" stop-color="#f0ebe0"/>
    </linearGradient>
    <radialGradient id="chip-blue" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#4488ff"/>
      <stop offset="100%" stop-color="#0022aa"/>
    </radialGradient>
    <radialGradient id="chip-red" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ff4444"/>
      <stop offset="100%" stop-color="#aa0000"/>
    </radialGradient>
    <radialGradient id="chip-black" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#444444"/>
      <stop offset="100%" stop-color="#111111"/>
    </radialGradient>
    <filter id="shadow"><feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.6"/></filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table oval -->
  <ellipse cx="200" cy="155" rx="175" ry="120" fill="#0d2200" stroke="#ffd700" stroke-width="1.5" opacity="0.7"/>
  <!-- Texas star -->
  <path d="M200,30 L207,52 L230,52 L212,65 L219,88 L200,75 L181,88 L188,65 L170,52 L193,52 Z" fill="#ffd700" opacity="0.7"/>
  <!-- Community cards (the flop+turn+river) -->
  <rect x="110" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <text x="120" y="132" font-family="Georgia,serif" font-size="15" fill="#000">A</text>
  <text x="118" y="148" font-family="Georgia,serif" font-size="12" fill="#000">♠</text>
  <rect x="162" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <text x="172" y="132" font-family="Georgia,serif" font-size="15" fill="#cc0000">K</text>
  <text x="170" y="148" font-family="Georgia,serif" font-size="12" fill="#cc0000">♥</text>
  <rect x="214" y="110" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)"/>
  <text x="224" y="132" font-family="Georgia,serif" font-size="15" fill="#cc0000">Q</text>
  <text x="222" y="148" font-family="Georgia,serif" font-size="12" fill="#cc0000">♦</text>
  <rect x="266" y="112" width="45" height="65" rx="5" fill="url(#card)" filter="url(#shadow)" transform="rotate(4,288,144)"/>
  <text x="274" y="134" font-family="Georgia,serif" font-size="15" fill="#000" transform="rotate(4,288,144)">J</text>
  <text x="272" y="150" font-family="Georgia,serif" font-size="12" fill="#000" transform="rotate(4,288,144)">♣</text>
  <!-- Poker chip stack -->
  <ellipse cx="100" cy="235" rx="28" ry="10" fill="url(#chip-black)"/>
  <ellipse cx="100" cy="228" rx="28" ry="10" fill="url(#chip-red)" stroke="#fff" stroke-width="1" opacity="0.8"/>
  <ellipse cx="100" cy="221" rx="28" ry="10" fill="url(#chip-blue)" stroke="#fff" stroke-width="1" opacity="0.9"/>
  <ellipse cx="300" cy="235" rx="28" ry="10" fill="url(#chip-black)"/>
  <ellipse cx="300" cy="228" rx="28" ry="10" fill="url(#chip-blue)" stroke="#fff" stroke-width="1" opacity="0.8"/>
  <ellipse cx="300" cy="221" rx="28" ry="10" fill="url(#chip-red)" stroke="#fff" stroke-width="1" opacity="0.9"/>
  <ellipse cx="300" cy="214" rx="28" ry="10" fill="url(#chip-black)" stroke="#fff" stroke-width="1" opacity="0.7"/>
  <!-- Hole cards face down for player -->
  <rect x="163" y="200" width="35" height="50" rx="4" fill="#003366" stroke="#ffd700" stroke-width="1.5" transform="rotate(-6,180,225)"/>
  <rect x="185" y="200" width="35" height="50" rx="4" fill="#003366" stroke="#ffd700" stroke-width="1.5" transform="rotate(6,202,225)"/>
  <!-- Title -->
  <text x="200" y="291" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="2">TEXAS HOLD'EM</text>
</svg>`);

const THREE_CARD_POKER =
  svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0020"/>
      <stop offset="100%" stop-color="#05000f"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffdf0"/>
      <stop offset="100%" stop-color="#f0ebe0"/>
    </linearGradient>
    <radialGradient id="chip-gold" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#aa8800"/>
    </radialGradient>
    <radialGradient id="chip-purple" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#9944cc"/>
      <stop offset="100%" stop-color="#440066"/>
    </radialGradient>
    <filter id="shadow"><feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.7"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Glow behind cards -->
  <ellipse cx="200" cy="165" rx="150" ry="80" fill="#6600cc" opacity="0.1" filter="url(#glow)"/>
  <!-- Three cards fanned out -->
  <!-- Left card -->
  <rect x="70" y="100" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(-18,110,157)"/>
  <text x="80" y="122" font-family="Georgia,serif" font-size="20" fill="#cc0000" transform="rotate(-18,110,157)">A</text>
  <text x="78" y="140" font-family="Georgia,serif" font-size="15" fill="#cc0000" transform="rotate(-18,110,157)">♦</text>
  <!-- Center card -->
  <rect x="160" y="90" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)"/>
  <text x="170" y="112" font-family="Georgia,serif" font-size="20" fill="#000" transform="">K</text>
  <text x="168" y="130" font-family="Georgia,serif" font-size="15" fill="#000">♠</text>
  <!-- Right card -->
  <rect x="250" y="100" width="80" height="115" rx="8" fill="url(#card)" filter="url(#shadow)" transform="rotate(18,290,157)"/>
  <text x="256" y="122" font-family="Georgia,serif" font-size="20" fill="#cc0000" transform="rotate(18,290,157)">Q</text>
  <text x="254" y="140" font-family="Georgia,serif" font-size="15" fill="#cc0000" transform="rotate(18,290,157)">♥</text>
  <!-- Chip stacks -->
  <ellipse cx="90" cy="240" rx="25" ry="9" fill="url(#chip-purple)"/>
  <text x="90" y="243" font-family="Arial" font-size="7" fill="#ffd700" text-anchor="middle" font-weight="bold">100</text>
  <ellipse cx="90" cy="232" rx="25" ry="9" fill="url(#chip-gold)" stroke="#fff" stroke-width="0.5"/>
  <text x="90" y="235" font-family="Arial" font-size="7" fill="#000" text-anchor="middle" font-weight="bold">25</text>
  <ellipse cx="310" cy="240" rx="25" ry="9" fill="url(#chip-gold)"/>
  <text x="310" y="243" font-family="Arial" font-size="7" fill="#000" text-anchor="middle" font-weight="bold">25</text>
  <ellipse cx="310" cy="232" rx="25" ry="9" fill="url(#chip-purple)" stroke="#fff" stroke-width="0.5"/>
  <text x="310" y="235" font-family="Arial" font-size="7" fill="#ffd700" text-anchor="middle" font-weight="bold">100</text>
  <ellipse cx="310" cy="224" rx="25" ry="9" fill="url(#chip-gold)" stroke="#fff" stroke-width="0.5"/>
  <!-- Title -->
  <text x="200" y="52" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#cc88ff" text-anchor="middle" letter-spacing="2" filter="url(#glow)" opacity="0.6">THREE CARD POKER</text>
  <text x="200" y="52" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#cc88ff" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
  <text x="200" y="287" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#cc88ff" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
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
};

const GAME_GRADIENTS_BY_ID: Record<number, string> = {
  1: "from-red-900 via-yellow-900 to-red-950",
  2: "from-yellow-900 via-amber-900 to-yellow-950",
  3: "from-purple-950 via-indigo-950 to-purple-950",
  4: "from-cyan-950 via-blue-950 to-cyan-950",
  5: "from-orange-900 via-amber-950 to-orange-950",
  6: "from-indigo-950 via-purple-950 to-blue-950",
  7: "from-red-950 via-neutral-950 to-red-950",
  8: "from-green-950 via-emerald-950 to-green-950",
  9: "from-green-950 via-stone-950 to-green-950",
  10: "from-green-950 via-stone-950 to-emerald-950",
  11: "from-stone-900 via-amber-950 to-stone-950",
  12: "from-purple-950 via-indigo-950 to-purple-950",
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
