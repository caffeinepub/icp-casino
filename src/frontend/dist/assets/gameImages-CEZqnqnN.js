import { g as createLucideIcon } from "./index-DgnOmZcO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function isPicsumUrl(url) {
  return url.includes("picsum.photos");
}
const LUCKY_SEVENS = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E0720"/>
      <stop offset="100%" stop-color="#1A0D2E"/>
    </linearGradient>
    <linearGradient id="frame" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="40%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <linearGradient id="reel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2A1545"/>
      <stop offset="50%" stop-color="#1E0E38"/>
      <stop offset="100%" stop-color="#130828"/>
    </linearGradient>
    <linearGradient id="seven" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <radialGradient id="shine" cx="30%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#F5D78A" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Background stars -->
  <circle cx="25" cy="25" r="1.5" fill="#C9A84C" opacity="0.5"/>
  <circle cx="375" cy="35" r="1" fill="#9B6DD0" opacity="0.6"/>
  <circle cx="45" cy="270" r="1.5" fill="#C9A84C" opacity="0.4"/>
  <circle cx="355" cy="260" r="1" fill="#9B6DD0" opacity="0.5"/>
  <circle cx="360" cy="80" r="1" fill="#C9A84C" opacity="0.4"/>
  <circle cx="20" cy="180" r="1.5" fill="#9B6DD0" opacity="0.5"/>
  <!-- Outer machine frame (bevel effect) -->
  <rect x="50" y="35" width="300" height="230" rx="18" fill="#8B6914"/>
  <rect x="52" y="37" width="296" height="226" rx="17" fill="url(#frame)"/>
  <rect x="56" y="41" width="288" height="218" rx="15" fill="#1A0D2E"/>
  <!-- Inner chrome ring -->
  <rect x="62" y="47" width="276" height="206" rx="12" fill="#0E0720" stroke="#C9A84C" stroke-width="1.5"/>
  <!-- Neon glow behind reels -->
  <rect x="72" y="58" width="256" height="172" rx="8" fill="#3D1F6B" opacity="0.3"/>
  <!-- Reel slots (3 windows) -->
  <!-- Reel 1 -->
  <rect x="78" y="62" width="74" height="160" rx="6" fill="#8B6914"/>
  <rect x="80" y="64" width="70" height="156" rx="5" fill="url(#reel)"/>
  <rect x="80" y="64" width="70" height="156" rx="5" fill="url(#shine)"/>
  <!-- Reel 2 -->
  <rect x="163" y="62" width="74" height="160" rx="6" fill="#8B6914"/>
  <rect x="165" y="64" width="70" height="156" rx="5" fill="url(#reel)"/>
  <rect x="165" y="64" width="70" height="156" rx="5" fill="url(#shine)"/>
  <!-- Reel 3 -->
  <rect x="248" y="62" width="74" height="160" rx="6" fill="#8B6914"/>
  <rect x="250" y="64" width="70" height="156" rx="5" fill="url(#reel)"/>
  <rect x="250" y="64" width="70" height="156" rx="5" fill="url(#shine)"/>
  <!-- 7 symbols — large, glowing -->
  <text x="115" y="162" font-family="Georgia,serif" font-size="80" font-weight="bold" fill="url(#seven)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="200" y="162" font-family="Georgia,serif" font-size="80" font-weight="bold" fill="url(#seven)" text-anchor="middle" filter="url(#glow)">7</text>
  <text x="285" y="162" font-family="Georgia,serif" font-size="80" font-weight="bold" fill="url(#seven)" text-anchor="middle" filter="url(#glow)">7</text>
  <!-- Win line — gold neon glow -->
  <line x1="72" y1="147" x2="328" y2="147" stroke="#F5D78A" stroke-width="2" opacity="0.9" filter="url(#glow)"/>
  <line x1="72" y1="147" x2="328" y2="147" stroke="#C9A84C" stroke-width="1" stroke-dasharray="6,4" opacity="0.6"/>
  <!-- Title plate -->
  <rect x="50" y="256" width="300" height="32" rx="0" fill="#8B6914"/>
  <rect x="52" y="257" width="296" height="30" rx="0" fill="#1A0D2E"/>
  <text x="200" y="277" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="5">LUCKY SEVENS</text>
</svg>`);
const GOLDEN_FORTUNE = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E0720"/>
      <stop offset="100%" stop-color="#1A0D2E"/>
    </linearGradient>
    <linearGradient id="coin-top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="35%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <linearGradient id="coin-side" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#6B4410"/>
    </linearGradient>
    <radialGradient id="coin-shine" cx="35%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#F5D78A" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#C9A84C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-bg" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#C9A84C" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.7"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <ellipse cx="200" cy="230" rx="140" ry="50" fill="url(#glow-bg)"/>
  <!-- Floating coin particles -->
  <circle cx="60" cy="50" r="4" fill="#C9A84C" opacity="0.5"/>
  <circle cx="340" cy="40" r="3" fill="#C9A84C" opacity="0.4"/>
  <circle cx="80" cy="240" r="3" fill="#C9A84C" opacity="0.35"/>
  <circle cx="330" cy="250" r="4" fill="#C9A84C" opacity="0.4"/>
  <circle cx="150" cy="30" r="2.5" fill="#F5D78A" opacity="0.45"/>
  <circle cx="280" cy="25" r="2" fill="#9B6DD0" opacity="0.5"/>
  <!-- Coin stack back row (perspective) -->
  <!-- Stack left-back -->
  <ellipse cx="120" cy="215" rx="34" ry="12" fill="#6B4410"/>
  <rect x="86" y="175" width="68" height="40" fill="#8B6914"/>
  <ellipse cx="120" cy="175" rx="34" ry="12" fill="url(#coin-top)"/>
  <ellipse cx="120" cy="175" rx="34" ry="12" fill="url(#coin-shine)"/>
  <text x="120" y="179" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#3D1F6B" text-anchor="middle">$</text>
  <!-- Coin stack - edges visible -->
  <ellipse cx="120" cy="190" rx="34" ry="12" fill="#C9A84C" opacity="0.6"/>
  <ellipse cx="120" cy="200" rx="34" ry="12" fill="#C9A84C" opacity="0.5"/>
  <!-- Stack center -->
  <ellipse cx="200" cy="225" rx="40" ry="14" fill="#6B4410"/>
  <rect x="160" y="165" width="80" height="60" fill="#8B6914"/>
  <ellipse cx="200" cy="165" rx="40" ry="14" fill="url(#coin-top)"/>
  <ellipse cx="200" cy="165" rx="40" ry="14" fill="url(#coin-shine)"/>
  <text x="200" y="169" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#3D1F6B" text-anchor="middle">$</text>
  <ellipse cx="200" cy="180" rx="40" ry="14" fill="#C9A84C" opacity="0.55"/>
  <ellipse cx="200" cy="193" rx="40" ry="14" fill="#C9A84C" opacity="0.45"/>
  <ellipse cx="200" cy="206" rx="40" ry="14" fill="#C9A84C" opacity="0.4"/>
  <!-- Stack right -->
  <ellipse cx="285" cy="218" rx="34" ry="12" fill="#6B4410"/>
  <rect x="251" y="178" width="68" height="40" fill="#8B6914"/>
  <ellipse cx="285" cy="178" rx="34" ry="12" fill="url(#coin-top)"/>
  <ellipse cx="285" cy="178" rx="34" ry="12" fill="url(#coin-shine)"/>
  <text x="285" y="182" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#3D1F6B" text-anchor="middle">$</text>
  <ellipse cx="285" cy="193" rx="34" ry="12" fill="#C9A84C" opacity="0.55"/>
  <!-- Scattered coins on surface -->
  <ellipse cx="150" cy="248" rx="20" ry="7" fill="url(#coin-top)"/>
  <text x="150" y="252" font-family="Georgia,serif" font-size="9" fill="#3D1F6B" text-anchor="middle" font-weight="bold">¥</text>
  <ellipse cx="255" cy="252" rx="18" ry="6" fill="url(#coin-top)"/>
  <text x="255" y="256" font-family="Georgia,serif" font-size="9" fill="#3D1F6B" text-anchor="middle" font-weight="bold">$</text>
  <ellipse cx="95" cy="145" rx="16" ry="6" fill="url(#coin-top)" opacity="0.8"/>
  <ellipse cx="310" cy="138" rx="14" ry="5" fill="url(#coin-top)" opacity="0.7"/>
  <!-- Title -->
  <text x="200" y="290" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">GOLDEN FORTUNE</text>
</svg>`);
const NEON_NIGHTS = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06031A"/>
      <stop offset="60%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#3D1F6B"/>
    </linearGradient>
    <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E0720"/>
      <stop offset="100%" stop-color="#080415"/>
    </linearGradient>
    <filter id="neon-gold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="neon-purple" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Stars -->
  <circle cx="30" cy="25" r="1.5" fill="#C9A84C" opacity="0.7"/>
  <circle cx="85" cy="12" r="1" fill="#9B6DD0" opacity="0.8"/>
  <circle cx="165" cy="20" r="1.5" fill="#C9A84C" opacity="0.6"/>
  <circle cx="255" cy="8" r="1" fill="#9B6DD0" opacity="0.7"/>
  <circle cx="55" cy="65" r="1" fill="#C9A84C" opacity="0.7"/>
  <circle cx="200" cy="30" r="1" fill="#9B6DD0" opacity="0.6"/>
  <circle cx="305" cy="18" r="1.5" fill="#C9A84C" opacity="0.5"/>
  <circle cx="380" cy="50" r="1" fill="#9B6DD0" opacity="0.4"/>
  <!-- Moon crescent -->
  <circle cx="345" cy="42" r="26" fill="#3D1F6B" opacity="0.9"/>
  <circle cx="353" cy="36" r="22" fill="#06031A"/>
  <!-- City ground -->
  <rect x="0" y="195" width="400" height="105" fill="url(#ground)"/>
  <!-- Building silhouettes - varied heights -->
  <rect x="0" y="148" width="28" height="152" fill="#0C0520"/>
  <rect x="4" y="132" width="18" height="22" fill="#0C0520"/>
  <rect x="32" y="158" width="42" height="142" fill="#0C0520"/>
  <rect x="38" y="140" width="12" height="24" fill="#0C0520"/>
  <rect x="78" y="135" width="38" height="165" fill="#0A041C"/>
  <rect x="82" y="115" width="10" height="28" fill="#0A041C"/>
  <rect x="120" y="150" width="48" height="150" fill="#0C0520"/>
  <rect x="172" y="142" width="44" height="158" fill="#0A041C"/>
  <rect x="220" y="130" width="50" height="170" fill="#0C0520"/>
  <rect x="224" y="108" width="14" height="30" fill="#0C0520"/>
  <rect x="274" y="148" width="40" height="152" fill="#0A041C"/>
  <rect x="318" y="155" width="46" height="145" fill="#0C0520"/>
  <rect x="366" y="165" width="34" height="135" fill="#0C0520"/>
  <!-- Building window lights - purple and gold dots -->
  <rect x="36" y="165" width="5" height="4" fill="#9B6DD0" opacity="0.7"/>
  <rect x="45" y="165" width="5" height="4" fill="#C9A84C" opacity="0.6"/>
  <rect x="36" y="176" width="5" height="4" fill="#C9A84C" opacity="0.5"/>
  <rect x="125" y="158" width="5" height="4" fill="#9B6DD0" opacity="0.6"/>
  <rect x="134" y="158" width="5" height="4" fill="#C9A84C" opacity="0.7"/>
  <rect x="125" y="170" width="5" height="4" fill="#C9A84C" opacity="0.5"/>
  <rect x="225" y="140" width="5" height="4" fill="#9B6DD0" opacity="0.7"/>
  <rect x="234" y="140" width="5" height="4" fill="#C9A84C" opacity="0.6"/>
  <rect x="243" y="140" width="5" height="4" fill="#9B6DD0" opacity="0.5"/>
  <!-- Neon sign - BAR -->
  <text x="58" y="178" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#C9A84C" filter="url(#neon-gold)" opacity="0.95">BAR</text>
  <!-- Neon sign - CASINO -->
  <text x="178" y="165" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#9B6DD0" filter="url(#neon-purple)" opacity="0.95">CASINO</text>
  <!-- Neon sign - HOTEL -->
  <text x="280" y="162" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#C9A84C" filter="url(#neon-gold)" opacity="0.9">HOTEL</text>
  <!-- Perspective grid floor reflection -->
  <line x1="200" y1="210" x2="0" y2="300" stroke="#9B6DD0" stroke-width="0.6" opacity="0.25"/>
  <line x1="200" y1="210" x2="400" y2="300" stroke="#9B6DD0" stroke-width="0.6" opacity="0.25"/>
  <line x1="200" y1="222" x2="0" y2="300" stroke="#C9A84C" stroke-width="0.5" opacity="0.2"/>
  <line x1="200" y1="222" x2="400" y2="300" stroke="#C9A84C" stroke-width="0.5" opacity="0.2"/>
  <line x1="200" y1="234" x2="0" y2="300" stroke="#9B6DD0" stroke-width="0.4" opacity="0.15"/>
  <line x1="200" y1="234" x2="400" y2="300" stroke="#9B6DD0" stroke-width="0.4" opacity="0.15"/>
  <!-- Art deco title frame -->
  <rect x="85" y="55" width="230" height="50" rx="3" fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.4"/>
  <rect x="90" y="59" width="220" height="42" rx="2" fill="none" stroke="#C9A84C" stroke-width="0.5" opacity="0.25"/>
  <!-- Title -->
  <text x="200" y="88" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="#9B6DD0" text-anchor="middle" filter="url(#neon-purple)" opacity="0.55">NEON NIGHTS</text>
  <text x="200" y="88" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="#9B6DD0" text-anchor="middle">NEON NIGHTS</text>
</svg>`);
const DIAMOND_RUSH = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E0720"/>
      <stop offset="100%" stop-color="#1A0D2E"/>
    </linearGradient>
    <linearGradient id="gem1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="30%" stop-color="#C9A84C"/>
      <stop offset="70%" stop-color="#6B3FA0"/>
      <stop offset="100%" stop-color="#3D1F6B"/>
    </linearGradient>
    <linearGradient id="gem2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="50%" stop-color="#9B6DD0"/>
      <stop offset="100%" stop-color="#3D1F6B"/>
    </linearGradient>
    <linearGradient id="gem3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B6914"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#F5D78A"/>
    </linearGradient>
    <filter id="sparkle" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="4" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Background glow -->
  <ellipse cx="200" cy="160" rx="160" ry="110" fill="#6B3FA0" opacity="0.06" filter="url(#sparkle)"/>
  <!-- Sparkle stars -->
  <path d="M58,72 L60,66 L62,72 L68,74 L62,76 L60,82 L58,76 L52,74 Z" fill="#C9A84C" filter="url(#sparkle)" opacity="0.8"/>
  <path d="M332,95 L334,89 L336,95 L342,97 L336,99 L334,105 L332,99 L326,97 Z" fill="#F5D78A" filter="url(#sparkle)" opacity="0.9"/>
  <path d="M78,228 L79,225 L80,228 L83,229 L80,230 L79,233 L78,230 L75,229 Z" fill="#9B6DD0" opacity="0.7"/>
  <path d="M322,238 L323,235 L324,238 L327,239 L324,240 L323,243 L322,240 L319,239 Z" fill="#C9A84C" opacity="0.8"/>
  <path d="M200,30 L201,27 L202,30 L205,31 L202,32 L201,35 L200,32 L197,31 Z" fill="#F5D78A" filter="url(#sparkle)" opacity="0.7"/>
  <circle cx="120" cy="45" r="2" fill="#C9A84C" opacity="0.5"/>
  <circle cx="280" cy="38" r="2.5" fill="#9B6DD0" opacity="0.55"/>
  <circle cx="40" cy="190" r="1.5" fill="#C9A84C" opacity="0.4"/>
  <circle cx="360" cy="200" r="2" fill="#9B6DD0" opacity="0.45"/>
  <!-- Large central diamond - 3D facets -->
  <polygon points="200,52 258,148 200,218 142,148" fill="url(#gem1)" stroke="#F5D78A" stroke-width="1.5" filter="url(#shadow)"/>
  <!-- Facet highlights -->
  <polygon points="200,52 258,148 200,110" fill="#F5D78A" opacity="0.45"/>
  <polygon points="200,52 142,148 200,110" fill="#C9A84C" opacity="0.25"/>
  <polygon points="200,218 258,148 200,175" fill="#8B6914" opacity="0.5"/>
  <polygon points="200,218 142,148 200,175" fill="#6B3FA0" opacity="0.35"/>
  <!-- Facet lines -->
  <line x1="200" y1="52" x2="200" y2="218" stroke="#F5D78A" stroke-width="0.6" opacity="0.35"/>
  <line x1="142" y1="148" x2="258" y2="148" stroke="#F5D78A" stroke-width="0.6" opacity="0.35"/>
  <line x1="200" y1="52" x2="142" y2="148" stroke="#F5D78A" stroke-width="0.4" opacity="0.2"/>
  <line x1="200" y1="52" x2="258" y2="148" stroke="#F5D78A" stroke-width="0.4" opacity="0.2"/>
  <!-- Left small diamond -->
  <polygon points="82,95 108,140 82,168 56,140" fill="url(#gem2)" stroke="#C9A84C" stroke-width="1" opacity="0.9" filter="url(#shadow)"/>
  <polygon points="82,95 108,140 82,125" fill="#F5D78A" opacity="0.4"/>
  <polygon points="82,168 108,140 82,155" fill="#3D1F6B" opacity="0.4"/>
  <!-- Right small diamond -->
  <polygon points="318,88 344,132 318,160 292,132" fill="url(#gem2)" stroke="#C9A84C" stroke-width="1" opacity="0.9" filter="url(#shadow)"/>
  <polygon points="318,88 344,132 318,118" fill="#F5D78A" opacity="0.4"/>
  <!-- Bottom-left tiny diamond -->
  <polygon points="112,220 126,246 112,262 98,246" fill="url(#gem3)" stroke="#C9A84C" stroke-width="1" opacity="0.65"/>
  <!-- Bottom-right tiny diamond -->
  <polygon points="288,215 302,240 288,256 274,240" fill="url(#gem3)" stroke="#C9A84C" stroke-width="1" opacity="0.65"/>
  <!-- Title -->
  <text x="200" y="287" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3" filter="url(#sparkle)">DIAMOND RUSH</text>
</svg>`);
const WILD_SAFARI = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0A0420"/>
      <stop offset="35%" stop-color="#2A1255"/>
      <stop offset="65%" stop-color="#6B3FA0"/>
      <stop offset="100%" stop-color="#C9A84C"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="45%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sky)"/>
  <!-- Atmospheric glow at horizon -->
  <ellipse cx="200" cy="195" rx="220" ry="60" fill="#C9A84C" opacity="0.12"/>
  <!-- Sun disc -->
  <circle cx="200" cy="85" r="55" fill="url(#sun)" opacity="0.9"/>
  <circle cx="200" cy="85" r="42" fill="#C9A84C" opacity="0.8"/>
  <circle cx="200" cy="85" r="30" fill="#F5D78A" opacity="0.7"/>
  <!-- Ground -->
  <rect x="0" y="215" width="400" height="85" fill="url(#ground)"/>
  <!-- Horizon line -->
  <rect x="0" y="210" width="400" height="10" fill="#1A0D2E" opacity="0.8"/>
  <!-- Acacia tree left — dark purple silhouette -->
  <rect x="52" y="138" width="13" height="82" fill="#2A1255"/>
  <!-- Top foliage layers -->
  <ellipse cx="58" cy="132" rx="42" ry="22" fill="#1A0D2E"/>
  <ellipse cx="40" cy="122" rx="26" ry="16" fill="#130828"/>
  <ellipse cx="78" cy="125" rx="26" ry="16" fill="#1A0D2E"/>
  <ellipse cx="58" cy="115" rx="18" ry="12" fill="#0E0720"/>
  <!-- Acacia tree right -->
  <rect x="328" y="148" width="11" height="72" fill="#2A1255"/>
  <ellipse cx="333" cy="142" rx="36" ry="20" fill="#1A0D2E"/>
  <ellipse cx="314" cy="134" rx="22" ry="14" fill="#130828"/>
  <ellipse cx="352" cy="136" rx="22" ry="14" fill="#1A0D2E"/>
  <!-- Cheetah/lion silhouette in gold outline -->
  <!-- Body -->
  <ellipse cx="145" cy="207" rx="52" ry="22" fill="#0E0720"/>
  <!-- Head -->
  <circle cx="188" cy="196" r="20" fill="#0E0720"/>
  <!-- Mane ring -->
  <circle cx="188" cy="193" r="26" fill="#130828"/>
  <circle cx="188" cy="193" r="19" fill="#0E0720"/>
  <!-- Ears -->
  <polygon points="177,177 172,164 183,172" fill="#0E0720"/>
  <polygon points="199,177 204,164 193,172" fill="#0E0720"/>
  <!-- Legs -->
  <rect x="115" y="220" width="11" height="22" rx="3" fill="#0E0720"/>
  <rect x="133" y="220" width="11" height="22" rx="3" fill="#0E0720"/>
  <rect x="158" y="220" width="11" height="22" rx="3" fill="#0E0720"/>
  <rect x="174" y="218" width="11" height="24" rx="3" fill="#0E0720"/>
  <!-- Tail curve -->
  <path d="M96,208 Q75,195 72,178" stroke="#0E0720" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Gold outline accent on lion -->
  <circle cx="188" cy="196" r="20" fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.4"/>
  <!-- Elephant far right silhouette -->
  <ellipse cx="308" cy="204" rx="52" ry="26" fill="#0E0720"/>
  <rect x="277" y="196" width="52" height="34" fill="#0E0720"/>
  <!-- Trunk -->
  <path d="M262,200 Q244,215 248,235" stroke="#0E0720" stroke-width="12" fill="none" stroke-linecap="round"/>
  <!-- Tusk in gold -->
  <path d="M264,210 Q249,224 254,238" stroke="#C9A84C" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.75"/>
  <!-- Head -->
  <circle cx="272" cy="190" r="30" fill="#0E0720"/>
  <!-- Ear -->
  <ellipse cx="253" cy="191" rx="18" ry="25" fill="#0A0418"/>
  <!-- Elephant legs -->
  <rect x="287" y="225" width="15" height="25" rx="3" fill="#0E0720"/>
  <rect x="308" y="225" width="15" height="25" rx="3" fill="#0E0720"/>
  <!-- Birds in sky — gold accents -->
  <path d="M105,58 Q115,51 125,58" stroke="#C9A84C" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M135,42 Q145,35 155,42" stroke="#C9A84C" stroke-width="1.5" fill="none" opacity="0.5"/>
  <path d="M255,65 Q265,58 275,65" stroke="#C9A84C" stroke-width="2" fill="none" opacity="0.55"/>
  <!-- Title -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="4">WILD SAFARI</text>
</svg>`);
const SPACE_ODYSSEY = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="space-bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#06031A"/>
    </radialGradient>
    <radialGradient id="nebula" cx="60%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#6B3FA0" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#3D1F6B" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#1A0D2E" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="planet-main" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#9B6DD0"/>
      <stop offset="55%" stop-color="#6B3FA0"/>
      <stop offset="100%" stop-color="#2A1255"/>
    </radialGradient>
    <radialGradient id="planet-small" cx="40%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="45%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </radialGradient>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#space-bg)"/>
  <!-- Nebula cloud -->
  <ellipse cx="220" cy="140" rx="210" ry="130" fill="url(#nebula)"/>
  <!-- Stars scattered -->
  <circle cx="20" cy="15" r="1.2" fill="#C9A84C" opacity="0.9"/>
  <circle cx="55" cy="35" r="1.5" fill="#9B6DD0" opacity="0.8"/>
  <circle cx="92" cy="10" r="1" fill="#C9A84C" opacity="0.8"/>
  <circle cx="152" cy="25" r="1" fill="#9B6DD0" opacity="0.7"/>
  <circle cx="222" cy="8" r="1.5" fill="#C9A84C" opacity="0.9"/>
  <circle cx="282" cy="30" r="1" fill="#9B6DD0" opacity="0.7"/>
  <circle cx="342" cy="14" r="1.5" fill="#C9A84C" opacity="0.8"/>
  <circle cx="382" cy="45" r="1" fill="#9B6DD0" opacity="0.6"/>
  <circle cx="28" cy="100" r="1" fill="#C9A84C" opacity="0.6"/>
  <circle cx="378" cy="118" r="1.5" fill="#9B6DD0" opacity="0.8"/>
  <circle cx="15" cy="200" r="1" fill="#C9A84C" opacity="0.7"/>
  <circle cx="392" cy="198" r="1" fill="#9B6DD0" opacity="0.6"/>
  <circle cx="98" cy="270" r="1.5" fill="#C9A84C" opacity="0.5"/>
  <circle cx="295" cy="262" r="1" fill="#9B6DD0" opacity="0.7"/>
  <circle cx="362" cy="282" r="1.5" fill="#C9A84C" opacity="0.8"/>
  <circle cx="178" cy="280" r="1" fill="#9B6DD0" opacity="0.5"/>
  <!-- Large purple planet with ring -->
  <circle cx="125" cy="115" r="62" fill="url(#planet-main)" filter="url(#glow)"/>
  <!-- Planet bands -->
  <ellipse cx="125" cy="105" rx="56" ry="11" fill="none" stroke="#6B3FA0" stroke-width="2" opacity="0.4"/>
  <ellipse cx="125" cy="125" rx="56" ry="11" fill="none" stroke="#3D1F6B" stroke-width="1.5" opacity="0.35"/>
  <!-- Planet ring system -->
  <ellipse cx="125" cy="115" rx="95" ry="18" fill="none" stroke="#9B6DD0" stroke-width="6" opacity="0.5"/>
  <ellipse cx="125" cy="115" rx="95" ry="18" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.4"/>
  <!-- Clip planet in front of ring (bottom half) -->
  <path d="M63,115 A62,62 0 0,0 187,115 Z" fill="url(#planet-main)"/>
  <!-- Small gold planet upper right -->
  <circle cx="318" cy="75" r="32" fill="url(#planet-small)" filter="url(#glow)"/>
  <!-- Small planet ring -->
  <ellipse cx="318" cy="75" rx="48" ry="10" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.5"/>
  <!-- Spaceship / rocket -->
  <g transform="translate(230,165) rotate(-28)">
    <!-- Body -->
    <rect x="-9" y="-32" width="18" height="50" rx="9" fill="#9B6DD0"/>
    <!-- Nose cone -->
    <polygon points="-9,-32 9,-32 0,-55" fill="#6B3FA0"/>
    <!-- Windows -->
    <circle cx="0" cy="-12" r="5" fill="#C9A84C" opacity="0.9"/>
    <circle cx="0" cy="-12" r="3" fill="#F5D78A" opacity="0.7"/>
    <!-- Wings -->
    <polygon points="-9,8 -22,26 -9,22" fill="#6B3FA0"/>
    <polygon points="9,8 22,26 9,22" fill="#6B3FA0"/>
    <!-- Engine glow -->
    <ellipse cx="0" cy="18" rx="8" ry="16" fill="#C9A84C" opacity="0.7" filter="url(#glow)"/>
    <ellipse cx="0" cy="18" rx="5" ry="11" fill="#F5D78A" opacity="0.85"/>
  </g>
  <!-- Title -->
  <text x="200" y="288" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9B6DD0" text-anchor="middle" letter-spacing="3" filter="url(#glow)">SPACE ODYSSEY</text>
</svg>`);
const ROULETTE_ROYALE = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0A0418"/>
    </radialGradient>
    <radialGradient id="wheel-center" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3D1F6B"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </radialGradient>
    <linearGradient id="hub" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <radialGradient id="hub-shine" cx="30%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#F5D78A" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Outer glow ring -->
  <circle cx="200" cy="148" r="138" fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.25" filter="url(#glow)"/>
  <!-- Wheel outer rim - chrome bevel -->
  <circle cx="200" cy="148" r="135" fill="#8B6914"/>
  <circle cx="200" cy="148" r="132" fill="#C9A84C"/>
  <circle cx="200" cy="148" r="128" fill="#8B6914"/>
  <!-- Wheel face -->
  <circle cx="200" cy="148" r="125" fill="url(#wheel-center)"/>
  <!-- Alternating sectors - purple and deep -->
  <g transform="translate(200,148)">
    <path d="M0,0 L0,-118 A118,118 0 0,1 36.7,-112.3 Z" fill="#6B3FA0"/>
    <path d="M0,0 L36.7,-112.3 A118,118 0 0,1 69.4,-94.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L69.4,-94.2 A118,118 0 0,1 97.1,-66.5 Z" fill="#6B3FA0"/>
    <path d="M0,0 L97.1,-66.5 A118,118 0 0,1 112.8,-33.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L112.8,-33.2 A118,118 0 0,1 118,0 Z" fill="#6B3FA0"/>
    <path d="M0,0 L118,0 A118,118 0 0,1 112.8,33.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L112.8,33.2 A118,118 0 0,1 97.1,66.5 Z" fill="#6B3FA0"/>
    <path d="M0,0 L97.1,66.5 A118,118 0 0,1 69.4,94.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L69.4,94.2 A118,118 0 0,1 36.7,112.3 Z" fill="#6B3FA0"/>
    <path d="M0,0 L36.7,112.3 A118,118 0 0,1 0,118 Z" fill="#1A0D2E"/>
    <path d="M0,0 L0,118 A118,118 0 0,1 -36.7,112.3 Z" fill="#6B3FA0"/>
    <path d="M0,0 L-36.7,112.3 A118,118 0 0,1 -69.4,94.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L-69.4,94.2 A118,118 0 0,1 -97.1,66.5 Z" fill="#6B3FA0"/>
    <path d="M0,0 L-97.1,66.5 A118,118 0 0,1 -112.8,33.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L-112.8,33.2 A118,118 0 0,1 -118,0 Z" fill="#6B3FA0"/>
    <path d="M0,0 L-118,0 A118,118 0 0,1 -112.8,-33.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L-112.8,-33.2 A118,118 0 0,1 -97.1,-66.5 Z" fill="#6B3FA0"/>
    <path d="M0,0 L-97.1,-66.5 A118,118 0 0,1 -69.4,-94.2 Z" fill="#1A0D2E"/>
    <path d="M0,0 L-69.4,-94.2 A118,118 0 0,1 -36.7,-112.3 Z" fill="#6B3FA0"/>
    <!-- Zero sector - gold -->
    <path d="M0,0 L-36.7,-112.3 A118,118 0 0,1 0,-118 Z" fill="#8B6914"/>
  </g>
  <!-- Spoke dividers -->
  <g transform="translate(200,148)" stroke="#C9A84C" stroke-width="0.8" opacity="0.45">
    <line x1="0" y1="-118" x2="0" y2="118"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(18)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(36)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(54)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(72)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(90)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(108)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(126)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(144)"/>
    <line x1="0" y1="-118" x2="0" y2="118" transform="rotate(162)"/>
  </g>
  <!-- Inner ring border -->
  <circle cx="200" cy="148" r="40" fill="url(#hub)"/>
  <circle cx="200" cy="148" r="36" fill="#8B6914"/>
  <circle cx="200" cy="148" r="32" fill="url(#hub)"/>
  <circle cx="200" cy="148" r="32" fill="url(#hub-shine)"/>
  <circle cx="200" cy="148" r="16" fill="#8B6914"/>
  <circle cx="200" cy="148" r="12" fill="#C9A84C"/>
  <circle cx="200" cy="148" r="8" fill="#F5D78A"/>
  <!-- Ball - bright gold on wheel -->
  <circle cx="200" cy="43" r="8" fill="#F5D78A" filter="url(#glow)"/>
  <circle cx="200" cy="43" r="5" fill="#F8F4E8"/>
  <!-- Title -->
  <text x="200" y="294" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">ROULETTE ROYALE</text>
</svg>`);
const BACCARAT_CLASSIC = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </linearGradient>
    <linearGradient id="card-face" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F8F4E8"/>
      <stop offset="100%" stop-color="#E8E0D0"/>
    </linearGradient>
    <linearGradient id="chip-gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <radialGradient id="chip-shine" cx="35%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#F5D78A" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="4" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.75"/>
    </filter>
    <filter id="card-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#C9A84C" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Felt table oval -->
  <ellipse cx="200" cy="148" rx="188" ry="130" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.5"/>
  <ellipse cx="200" cy="148" rx="178" ry="120" fill="none" stroke="#C9A84C" stroke-width="0.7" opacity="0.2"/>
  <!-- Table header labels -->
  <text x="200" y="42" font-family="Georgia,serif" font-size="12" fill="#C9A84C" text-anchor="middle" letter-spacing="8" opacity="0.6">BACCARAT</text>
  <text x="108" y="258" font-family="Georgia,serif" font-size="12" fill="#C9A84C" text-anchor="middle" opacity="0.65">PLAYER</text>
  <text x="292" y="258" font-family="Georgia,serif" font-size="12" fill="#C9A84C" text-anchor="middle" opacity="0.65">BANKER</text>
  <!-- Player hand cards (two, fanned) -->
  <!-- Card 1 back-tilted -->
  <rect x="52" y="118" width="72" height="100" rx="7" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(-10,88,168)"/>
  <text x="62" y="142" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#6B3FA0" transform="rotate(-10,88,168)">A</text>
  <text x="62" y="158" font-family="Georgia,serif" font-size="16" fill="#6B3FA0" transform="rotate(-10,88,168)">♥</text>
  <text x="128" y="215" font-family="Georgia,serif" font-size="10" fill="#6B3FA0" transform="rotate(170,88,168)">A</text>
  <!-- Card 2 front-tilted -->
  <rect x="80" y="122" width="72" height="100" rx="7" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(4,116,172)"/>
  <text x="90" y="148" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#C9A84C" transform="rotate(4,116,172)">K</text>
  <text x="90" y="164" font-family="Georgia,serif" font-size="16" fill="#C9A84C" transform="rotate(4,116,172)">♠</text>
  <!-- Banker hand cards -->
  <rect x="248" y="118" width="72" height="100" rx="7" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(-4,284,168)"/>
  <text x="258" y="142" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#6B3FA0" transform="rotate(-4,284,168)">Q</text>
  <text x="258" y="158" font-family="Georgia,serif" font-size="16" fill="#6B3FA0" transform="rotate(-4,284,168)">♦</text>
  <rect x="278" y="118" width="72" height="100" rx="7" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(10,314,168)"/>
  <text x="288" y="142" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#C9A84C" transform="rotate(10,314,168)">J</text>
  <text x="288" y="158" font-family="Georgia,serif" font-size="16" fill="#C9A84C" transform="rotate(10,314,168)">♣</text>
  <!-- Chip stacks — player side -->
  <ellipse cx="108" cy="242" rx="22" ry="8" fill="#8B6914"/>
  <ellipse cx="108" cy="237" rx="22" ry="8" fill="url(#chip-gold)"/>
  <ellipse cx="108" cy="237" rx="22" ry="8" fill="url(#chip-shine)"/>
  <ellipse cx="108" cy="231" rx="22" ry="8" fill="url(#chip-gold)"/>
  <!-- Chip stacks — banker side -->
  <ellipse cx="292" cy="242" rx="22" ry="8" fill="#8B6914"/>
  <ellipse cx="292" cy="237" rx="22" ry="8" fill="#6B3FA0" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="292" cy="231" rx="22" ry="8" fill="url(#chip-gold)"/>
  <ellipse cx="292" cy="231" rx="22" ry="8" fill="url(#chip-shine)"/>
  <!-- Center TIE box -->
  <rect x="168" y="135" width="64" height="44" rx="5" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.2" opacity="0.85"/>
  <text x="200" y="162" font-family="Georgia,serif" font-size="12" fill="#C9A84C" text-anchor="middle" font-weight="bold">TIE</text>
  <!-- Title -->
  <text x="200" y="293" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">BACCARAT CLASSIC</text>
</svg>`);
const CRAPS_DELUXE = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </linearGradient>
    <linearGradient id="dice-face" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A1545"/>
      <stop offset="100%" stop-color="#1A0D2E"/>
    </linearGradient>
    <linearGradient id="dice-top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3D1F6B"/>
      <stop offset="100%" stop-color="#2A1545"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="5" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.85"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table border -->
  <rect x="18" y="28" width="364" height="244" rx="22" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.4"/>
  <rect x="22" y="32" width="356" height="236" rx="20" fill="none" stroke="#C9A84C" stroke-width="0.7" opacity="0.2"/>
  <!-- COME area top -->
  <rect x="38" y="50" width="324" height="42" rx="5" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.2" opacity="0.6"/>
  <text x="200" y="76" font-family="Georgia,serif" font-size="12" fill="#C9A84C" text-anchor="middle" letter-spacing="6">COME</text>
  <!-- Number boxes row -->
  <rect x="48" y="102" width="46" height="38" rx="4" fill="#1A0D2E" stroke="#C9A84C" stroke-width="1" opacity="0.7"/>
  <text x="71" y="126" font-family="Georgia,serif" font-size="15" fill="#C9A84C" text-anchor="middle">4</text>
  <rect x="100" y="102" width="46" height="38" rx="4" fill="#1A0D2E" stroke="#C9A84C" stroke-width="1" opacity="0.7"/>
  <text x="123" y="126" font-family="Georgia,serif" font-size="15" fill="#C9A84C" text-anchor="middle">5</text>
  <rect x="152" y="102" width="46" height="38" rx="4" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.5" opacity="0.9"/>
  <text x="175" y="126" font-family="Georgia,serif" font-size="15" fill="#F5D78A" text-anchor="middle">6</text>
  <rect x="204" y="102" width="46" height="38" rx="4" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.5" opacity="0.9"/>
  <text x="227" y="126" font-family="Georgia,serif" font-size="15" fill="#F5D78A" text-anchor="middle">8</text>
  <rect x="256" y="102" width="46" height="38" rx="4" fill="#1A0D2E" stroke="#C9A84C" stroke-width="1" opacity="0.7"/>
  <text x="279" y="126" font-family="Georgia,serif" font-size="15" fill="#C9A84C" text-anchor="middle">9</text>
  <rect x="308" y="102" width="46" height="38" rx="4" fill="#1A0D2E" stroke="#C9A84C" stroke-width="1" opacity="0.7"/>
  <text x="331" y="126" font-family="Georgia,serif" font-size="15" fill="#C9A84C" text-anchor="middle">10</text>
  <!-- PASS LINE bottom -->
  <rect x="38" y="228" width="324" height="30" rx="5" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.5" opacity="0.75"/>
  <text x="200" y="248" font-family="Georgia,serif" font-size="12" fill="#F5D78A" text-anchor="middle" letter-spacing="5">PASS LINE</text>
  <!-- Dice 1 - showing 3 pips -->
  <rect x="112" y="155" width="72" height="72" rx="12" fill="url(#dice-top)" filter="url(#shadow)"/>
  <!-- 3D bevel effect -->
  <rect x="112" y="155" width="72" height="6" rx="5" fill="#3D1F6B" opacity="0.8"/>
  <rect x="112" y="155" width="6" height="72" rx="5" fill="#3D1F6B" opacity="0.6"/>
  <!-- Pips (showing 3) -->
  <circle cx="132" cy="175" r="6" fill="#C9A84C" filter="url(#glow)"/>
  <circle cx="148" cy="191" r="6" fill="#C9A84C" filter="url(#glow)"/>
  <circle cx="164" cy="207" r="6" fill="#C9A84C" filter="url(#glow)"/>
  <!-- Dice 2 - showing 4 pips (rotated slightly) -->
  <rect x="218" y="150" width="72" height="72" rx="12" fill="url(#dice-top)" filter="url(#shadow)" transform="rotate(8,254,186)"/>
  <rect x="218" y="150" width="72" height="6" rx="5" fill="#3D1F6B" opacity="0.8" transform="rotate(8,254,186)"/>
  <rect x="218" y="150" width="6" height="72" rx="5" fill="#3D1F6B" opacity="0.6" transform="rotate(8,254,186)"/>
  <!-- Pips (showing 4) -->
  <circle cx="234" cy="168" r="6" fill="#C9A84C" filter="url(#glow)" transform="rotate(8,254,186)"/>
  <circle cx="270" cy="168" r="6" fill="#C9A84C" filter="url(#glow)" transform="rotate(8,254,186)"/>
  <circle cx="234" cy="204" r="6" fill="#C9A84C" filter="url(#glow)" transform="rotate(8,254,186)"/>
  <circle cx="270" cy="204" r="6" fill="#C9A84C" filter="url(#glow)" transform="rotate(8,254,186)"/>
  <!-- Title -->
  <text x="200" y="293" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">CRAPS DELUXE</text>
</svg>`);
const BLACKJACK_PRO = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="felt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </linearGradient>
    <linearGradient id="card-face" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F8F4E8"/>
      <stop offset="100%" stop-color="#DDD5C0"/>
    </linearGradient>
    <linearGradient id="badge-ring" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <radialGradient id="badge-bg" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#3D1F6B"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="5" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.85"/>
    </filter>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Semicircle table edge -->
  <path d="M18,288 A210,185 0 0,1 382,288" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.45"/>
  <!-- Table info text -->
  <text x="200" y="42" font-family="Georgia,serif" font-size="10" fill="#C9A84C" text-anchor="middle" opacity="0.5" letter-spacing="3">BLACKJACK PAYS 3 TO 2</text>
  <text x="200" y="60" font-family="Georgia,serif" font-size="10" fill="#C9A84C" text-anchor="middle" opacity="0.4" letter-spacing="2">INSURANCE PAYS 2 TO 1</text>
  <!-- Ace of Spades card -->
  <rect x="78" y="85" width="98" height="140" rx="9" fill="url(#card-face)" filter="url(#shadow)"/>
  <!-- Spade suit large center -->
  <path d="M127,128 C127,128 105,108 105,96 C105,87 116,83 121,89 C116,79 110,72 127,68 C144,72 138,79 133,89 C138,83 149,87 149,96 C149,108 127,128 127,128 Z" fill="#1A0D2E"/>
  <rect x="124" y="122" width="6" height="14" fill="#1A0D2E"/>
  <path d="M117,136 L137,136 L133,130 L121,130 Z" fill="#1A0D2E"/>
  <!-- Corner labels -->
  <text x="86" y="107" font-family="Georgia,serif" font-size="19" font-weight="bold" fill="#1A0D2E">A</text>
  <text x="86" y="123" font-family="Georgia,serif" font-size="14" fill="#1A0D2E">♠</text>
  <!-- King of Hearts card - overlapping, tilted -->
  <rect x="148" y="85" width="98" height="140" rx="9" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(6,197,155)"/>
  <!-- Crown drawing -->
  <path d="M178,140 L184,128 L197,142 L210,128 L216,140 L216,158 L178,158 Z" fill="#6B3FA0" transform="rotate(6,197,155)"/>
  <circle cx="184" cy="128" r="4" fill="#C9A84C" transform="rotate(6,197,155)"/>
  <circle cx="197" cy="142" r="4" fill="#C9A84C" transform="rotate(6,197,155)"/>
  <circle cx="210" cy="128" r="4" fill="#C9A84C" transform="rotate(6,197,155)"/>
  <text x="156" y="107" font-family="Georgia,serif" font-size="19" font-weight="bold" fill="#6B3FA0" transform="rotate(6,197,155)">K</text>
  <text x="156" y="123" font-family="Georgia,serif" font-size="14" fill="#6B3FA0" transform="rotate(6,197,155)">♥</text>
  <!-- 21 badge - large glowing ring -->
  <circle cx="308" cy="152" r="58" fill="#8B6914"/>
  <circle cx="308" cy="152" r="54" fill="url(#badge-bg)"/>
  <circle cx="308" cy="152" r="54" fill="none" stroke="url(#badge-ring)" stroke-width="3"/>
  <text x="308" y="172" font-family="Georgia,serif" font-size="48" font-weight="bold" fill="#C9A84C" text-anchor="middle" filter="url(#glow)">21</text>
  <text x="308" y="172" font-family="Georgia,serif" font-size="48" font-weight="bold" fill="#F5D78A" text-anchor="middle">21</text>
  <!-- Title -->
  <text x="200" y="292" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">BLACKJACK PRO</text>
</svg>`);
const TEXAS_HOLDEM = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="felt" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2A1545"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </radialGradient>
    <linearGradient id="card-face" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F8F4E8"/>
      <stop offset="100%" stop-color="#E0D8C8"/>
    </linearGradient>
    <radialGradient id="chip-gold" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </radialGradient>
    <radialGradient id="chip-purple" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#9B6DD0"/>
      <stop offset="100%" stop-color="#3D1F6B"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.8"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#felt)"/>
  <!-- Table oval outline -->
  <ellipse cx="200" cy="152" rx="182" ry="125" fill="none" stroke="#C9A84C" stroke-width="2" opacity="0.6"/>
  <ellipse cx="200" cy="152" rx="172" ry="115" fill="none" stroke="#C9A84C" stroke-width="0.7" opacity="0.2"/>
  <!-- Texas star accent -->
  <path d="M200,28 L207,50 L230,50 L213,63 L220,86 L200,73 L180,86 L187,63 L170,50 L193,50 Z" fill="#C9A84C" opacity="0.65" filter="url(#glow)"/>
  <!-- Community cards face-up row -->
  <!-- Card 1 -->
  <rect x="100" y="108" width="46" height="66" rx="5" fill="url(#card-face)" filter="url(#shadow)"/>
  <text x="110" y="128" font-family="Georgia,serif" font-size="16" fill="#1A0D2E">A</text>
  <text x="108" y="144" font-family="Georgia,serif" font-size="13" fill="#1A0D2E">♠</text>
  <!-- Card 2 -->
  <rect x="152" y="108" width="46" height="66" rx="5" fill="url(#card-face)" filter="url(#shadow)"/>
  <text x="162" y="128" font-family="Georgia,serif" font-size="16" fill="#6B3FA0">K</text>
  <text x="160" y="144" font-family="Georgia,serif" font-size="13" fill="#6B3FA0">♥</text>
  <!-- Card 3 -->
  <rect x="204" y="108" width="46" height="66" rx="5" fill="url(#card-face)" filter="url(#shadow)"/>
  <text x="214" y="128" font-family="Georgia,serif" font-size="16" fill="#6B3FA0">Q</text>
  <text x="212" y="144" font-family="Georgia,serif" font-size="13" fill="#6B3FA0">♦</text>
  <!-- Card 4 (slightly tilted) -->
  <rect x="256" y="110" width="46" height="66" rx="5" fill="url(#card-face)" filter="url(#shadow)" transform="rotate(4,279,143)"/>
  <text x="264" y="130" font-family="Georgia,serif" font-size="16" fill="#1A0D2E" transform="rotate(4,279,143)">J</text>
  <text x="262" y="146" font-family="Georgia,serif" font-size="13" fill="#1A0D2E" transform="rotate(4,279,143)">♣</text>
  <!-- Left chip stack (3D perspective) -->
  <ellipse cx="92" cy="238" rx="30" ry="11" fill="#6B4410"/>
  <ellipse cx="92" cy="233" rx="30" ry="11" fill="url(#chip-gold)"/>
  <ellipse cx="92" cy="227" rx="30" ry="11" fill="url(#chip-purple)" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="92" cy="221" rx="30" ry="11" fill="url(#chip-gold)"/>
  <!-- Right chip stack -->
  <ellipse cx="308" cy="238" rx="30" ry="11" fill="#6B4410"/>
  <ellipse cx="308" cy="233" rx="30" ry="11" fill="url(#chip-purple)" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="308" cy="227" rx="30" ry="11" fill="url(#chip-gold)"/>
  <ellipse cx="308" cy="221" rx="30" ry="11" fill="url(#chip-purple)" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="308" cy="215" rx="30" ry="11" fill="url(#chip-gold)"/>
  <!-- Hole cards face-down -->
  <rect x="162" y="198" width="38" height="55" rx="5" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.5" transform="rotate(-7,181,225)"/>
  <rect x="190" y="198" width="38" height="55" rx="5" fill="#3D1F6B" stroke="#C9A84C" stroke-width="1.5" transform="rotate(7,209,225)"/>
  <!-- Title -->
  <text x="200" y="293" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="3">TEXAS HOLD'EM</text>
</svg>`);
const THREE_CARD_POKER = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#0E0720"/>
    </linearGradient>
    <linearGradient id="card-face" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F8F4E8"/>
      <stop offset="100%" stop-color="#DDD5C0"/>
    </linearGradient>
    <linearGradient id="card-gold-border" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <radialGradient id="chip-gold" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </radialGradient>
    <radialGradient id="chip-purple" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#9B6DD0"/>
      <stop offset="100%" stop-color="#3D1F6B"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="5" dy="7" stdDeviation="6" flood-color="#000" flood-opacity="0.85"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Felt oval -->
  <ellipse cx="200" cy="158" rx="175" ry="115" fill="#1A0D2E" opacity="0.5" stroke="#C9A84C" stroke-width="1.5" filter="url(#glow)"/>
  <!-- Three cards fanned in 3D perspective -->
  <!-- Left card (tilted back) -->
  <rect x="62" y="90" width="88" height="125" rx="9" fill="url(#card-face)" stroke="url(#card-gold-border)" stroke-width="2" filter="url(#shadow)" transform="rotate(-20,106,152)"/>
  <text x="73" y="114" font-family="Georgia,serif" font-size="22" fill="#6B3FA0" transform="rotate(-20,106,152)">A</text>
  <text x="71" y="132" font-family="Georgia,serif" font-size="16" fill="#6B3FA0" transform="rotate(-20,106,152)">♦</text>
  <!-- Large center suit -->
  <text x="91" y="165" font-family="Georgia,serif" font-size="42" fill="#6B3FA0" opacity="0.6" transform="rotate(-20,106,152)">♦</text>
  <!-- Center card (upright) -->
  <rect x="156" y="82" width="88" height="125" rx="9" fill="url(#card-face)" stroke="url(#card-gold-border)" stroke-width="2" filter="url(#shadow)"/>
  <text x="167" y="106" font-family="Georgia,serif" font-size="22" fill="#1A0D2E">K</text>
  <text x="167" y="122" font-family="Georgia,serif" font-size="16" fill="#1A0D2E">♠</text>
  <text x="186" y="162" font-family="Georgia,serif" font-size="42" fill="#1A0D2E" opacity="0.5">♠</text>
  <!-- Right card (tilted forward) -->
  <rect x="252" y="90" width="88" height="125" rx="9" fill="url(#card-face)" stroke="url(#card-gold-border)" stroke-width="2" filter="url(#shadow)" transform="rotate(20,296,152)"/>
  <text x="263" y="114" font-family="Georgia,serif" font-size="22" fill="#6B3FA0" transform="rotate(20,296,152)">Q</text>
  <text x="261" y="132" font-family="Georgia,serif" font-size="16" fill="#6B3FA0" transform="rotate(20,296,152)">♥</text>
  <text x="281" y="165" font-family="Georgia,serif" font-size="42" fill="#6B3FA0" opacity="0.6" transform="rotate(20,296,152)">♥</text>
  <!-- Chip stack left -->
  <ellipse cx="85" cy="248" rx="26" ry="9" fill="#6B4410"/>
  <ellipse cx="85" cy="242" rx="26" ry="9" fill="url(#chip-purple)" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="85" cy="236" rx="26" ry="9" fill="url(#chip-gold)"/>
  <!-- Chip stack right -->
  <ellipse cx="316" cy="248" rx="26" ry="9" fill="#6B4410"/>
  <ellipse cx="316" cy="242" rx="26" ry="9" fill="url(#chip-gold)"/>
  <ellipse cx="316" cy="236" rx="26" ry="9" fill="url(#chip-purple)" stroke="#9B6DD0" stroke-width="0.8"/>
  <ellipse cx="316" cy="230" rx="26" ry="9" fill="url(#chip-gold)"/>
  <!-- Title -->
  <text x="200" y="50" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9B6DD0" text-anchor="middle" letter-spacing="2" filter="url(#glow)" opacity="0.55">THREE CARD POKER</text>
  <text x="200" y="50" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#9B6DD0" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
  <text x="200" y="289" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#F5D78A" text-anchor="middle" letter-spacing="2">THREE CARD POKER</text>
</svg>`);
const MIDNIGHT_DRAGONS = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="sky-bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1A0D2E"/>
      <stop offset="100%" stop-color="#04020E"/>
    </radialGradient>
    <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="40%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="moon-face" cx="42%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#F5D78A"/>
      <stop offset="60%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </radialGradient>
    <linearGradient id="dragon-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A7AE8"/>
      <stop offset="50%" stop-color="#2952C4"/>
      <stop offset="100%" stop-color="#C9A84C"/>
    </linearGradient>
    <linearGradient id="wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2952C4" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#C9A84C" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="md-title" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4A7AE8"/>
      <stop offset="50%" stop-color="#9B6DD0"/>
      <stop offset="100%" stop-color="#C9A84C"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="dragon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="300" fill="url(#sky-bg)"/>
  <!-- Star field -->
  <circle cx="30" cy="18" r="1.5" fill="#4A7AE8" opacity="0.7"/>
  <circle cx="82" cy="10" r="1" fill="#C9A84C" opacity="0.65"/>
  <circle cx="145" cy="22" r="1.5" fill="#9B6DD0" opacity="0.7"/>
  <circle cx="198" cy="8" r="1.5" fill="#4A7AE8" opacity="0.8"/>
  <circle cx="265" cy="15" r="1" fill="#C9A84C" opacity="0.7"/>
  <circle cx="322" cy="12" r="1.5" fill="#9B6DD0" opacity="0.65"/>
  <circle cx="375" cy="28" r="1" fill="#4A7AE8" opacity="0.6"/>
  <circle cx="55" cy="268" r="1" fill="#9B6DD0" opacity="0.5"/>
  <circle cx="352" cy="262" r="1.5" fill="#C9A84C" opacity="0.5"/>
  <circle cx="18" cy="145" r="1" fill="#4A7AE8" opacity="0.55"/>
  <circle cx="388" cy="135" r="1" fill="#C9A84C" opacity="0.5"/>
  <!-- Full moon with purple halo glow -->
  <circle cx="200" cy="105" r="70" fill="#C9A84C" opacity="0.08" filter="url(#glow)"/>
  <circle cx="200" cy="105" r="55" fill="#8B6914" opacity="0.15" filter="url(#glow)"/>
  <circle cx="200" cy="105" r="44" fill="url(#moon-face)"/>
  <!-- Moon surface craters (subtle) -->
  <circle cx="188" cy="95" r="6" fill="#8B6914" opacity="0.25"/>
  <circle cx="210" cy="115" r="4" fill="#8B6914" opacity="0.2"/>
  <circle cx="198" cy="118" r="3" fill="#F5D78A" opacity="0.3"/>
  <!-- Dragon silhouette - large central figure -->
  <!-- Body -->
  <ellipse cx="200" cy="175" rx="65" ry="30" fill="#1A0D2E"/>
  <!-- Neck -->
  <path d="M200,148 Q215,130 228,118" stroke="#1A0D2E" stroke-width="22" fill="none" stroke-linecap="round"/>
  <!-- Head -->
  <ellipse cx="238" cy="108" rx="26" ry="18" fill="url(#dragon-body)" filter="url(#dragon-glow)"/>
  <!-- Snout -->
  <path d="M250,106 L268,102 L258,112 Z" fill="#2952C4"/>
  <!-- Eye -->
  <circle cx="242" cy="104" r="5" fill="#C9A84C"/>
  <circle cx="242" cy="104" r="3" fill="#1A0D2E"/>
  <circle cx="243" cy="103" r="1" fill="#F5D78A"/>
  <!-- Horns -->
  <path d="M232,96 L225,78 L238,90" fill="#C9A84C" opacity="0.85"/>
  <path d="M244,92 L242,74 L252,88" fill="#C9A84C" opacity="0.75"/>
  <!-- Wings -->
  <path d="M155,160 Q100,120 80,85 Q130,110 170,150 Z" fill="url(#wing-grad)" opacity="0.85"/>
  <path d="M155,160 Q90,130 72,78 Q85,95 100,108 Q130,125 162,155 Z" fill="#2952C4" opacity="0.4"/>
  <path d="M245,160 Q300,120 320,85 Q270,110 232,150 Z" fill="url(#wing-grad)" opacity="0.85"/>
  <!-- Wing membrane lines -->
  <line x1="155" y1="160" x2="80" y2="85" stroke="#4A7AE8" stroke-width="0.8" opacity="0.5"/>
  <line x1="155" y1="160" x2="92" y2="100" stroke="#4A7AE8" stroke-width="0.6" opacity="0.4"/>
  <line x1="245" y1="160" x2="320" y2="85" stroke="#4A7AE8" stroke-width="0.8" opacity="0.5"/>
  <line x1="245" y1="160" x2="308" y2="100" stroke="#4A7AE8" stroke-width="0.6" opacity="0.4"/>
  <!-- Dragon scales (layered small shapes) -->
  <ellipse cx="185" cy="170" rx="9" ry="5" fill="#2952C4" opacity="0.7"/>
  <ellipse cx="200" cy="168" rx="9" ry="5" fill="#2952C4" opacity="0.65"/>
  <ellipse cx="215" cy="170" rx="9" ry="5" fill="#2952C4" opacity="0.7"/>
  <ellipse cx="190" cy="178" rx="8" ry="4" fill="#4A7AE8" opacity="0.5"/>
  <ellipse cx="205" cy="177" rx="8" ry="4" fill="#4A7AE8" opacity="0.5"/>
  <!-- Tail -->
  <path d="M135,185 Q95,200 75,230 Q90,218 110,205 Q130,193 148,185" fill="#1A0D2E"/>
  <!-- Tail tip spikes -->
  <polygon points="75,230 68,242 82,238" fill="#C9A84C" opacity="0.75"/>
  <polygon points="80,235 72,248 86,243" fill="#C9A84C" opacity="0.6"/>
  <!-- Fire breath from snout -->
  <path d="M268,102 Q295,92 318,82 Q300,98 275,110 Z" fill="#C9A84C" opacity="0.5" filter="url(#dragon-glow)"/>
  <path d="M270,105 Q300,98 325,90 Q308,105 278,113 Z" fill="#F5D78A" opacity="0.35" filter="url(#dragon-glow)"/>
  <!-- Title with gradient glow -->
  <text x="200" y="266" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="url(#md-title)" text-anchor="middle" letter-spacing="3" filter="url(#glow)" opacity="0.5">MIDNIGHT DRAGONS</text>
  <text x="200" y="266" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="url(#md-title)" text-anchor="middle" letter-spacing="3">MIDNIGHT DRAGONS</text>
  <!-- 8x8 badge -->
  <rect x="162" y="275" width="76" height="18" rx="4" fill="#C9A84C" opacity="0.12" stroke="#C9A84C" stroke-width="0.8"/>
  <text x="200" y="288" font-family="Georgia,serif" font-size="9" fill="#C9A84C" text-anchor="middle" letter-spacing="2">8×8 REELS</text>
</svg>`);
const GAME_IMAGES_BY_ID = {
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
  13: MIDNIGHT_DRAGONS
};
function getGameImage(gameId) {
  const id = Number(gameId);
  return GAME_IMAGES_BY_ID[id] ?? null;
}
export {
  TrendingUp as T,
  getGameImage as g,
  isPicsumUrl as i
};
