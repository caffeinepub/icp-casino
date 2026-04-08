# Design Brief

## Direction
Premium ICP casino platform with cinematic depth, glassmorphism effects, and premium typography. Luxurious dark gaming aesthetic with sophisticated gold/purple accents. Versus Mode is a separate competitive gaming section featuring real-time PvP skill games with live chat and player roster. Profile setup modal on first Internet Identity login — cyberpunk identity capture with neon-glowing avatar frame, holographic shimmer, username input with glow animations. CSS-only micro-transitions maintain premium feel throughout.

## Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| background | `0.07 0 0` | Deep obsidian primary surface |
| card | `0.1 0.01 45` | Card layers, slight lift from background |
| primary | `0.72 0.18 65` | Gold accent, CTAs, highlights, active player status |
| accent | `0.4 0.15 300` | Royal purple for accents, badges, opponent highlights |
| chart-1 | `0.72 0.18 65` | Gold badges & accents |
| chart-2 | `0.45 0.18 300` | Purple badges & accents |

## Profile Setup Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| profile-avatar-glow | `0.65 0.25 265` | Neon indigo glow ring on avatar frame |
| profile-avatar-glow-cyan | `0.7 0.25 200` | Cyan component in dual-tone avatar glow |
| profile-border-glow | `0.55 0.22 265` | Card border glow and holographic shimmer |
| profile-input-glow | `0.65 0.25 265` | Neon input focus animation |

## Versus Mode Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| versus-board-bg | `0.09 0 0` | Game board left panel background |
| versus-chat-bg | `0.1 0.01 45` | Chat panel right sidebar background |
| versus-player-online | `0.72 0.18 65` | Active player indicator dot |
| versus-player-offline | `0.25 0.02 45` | Offline player indicator dot |
| versus-wager-active | `0.72 0.18 65` | Active wager button (10/30/100 ICP) |

## Midnight Dragons Game Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| dragon-blue | `0.45 0.25 240` | Royal blue dragon symbols and glow |
| dragon-ruby | `0.45 0.2 15` | Ruby red dragon accents and glow |
| dragon-midnight | `0.05 0 0` | Ultra-dark midnight navy machine background |

## Typography
| Layer | Font | Usage | Weight |
|-------|------|-------|--------|
| Display | Space Grotesk (Sans-serif) | Bold headers, game titles, player names, premium branding | 700 |
| Body | Lora (Serif) | Body text, UI labels, navigation, game descriptions, chat | 400 |
| Mono | JetBrains Mono | Wallet addresses, transaction IDs, bet amounts, balances | 500 |

## Elevation & Depth
Multi-layer glassmorphic surfaces: background → glass-card (semi-transparent blur) → popover. Cinematic depth via layered shadows (depth-sm/md/lg). Gold shimmer on hover. Gradient lighting overlays (top highlight, bottom shadow) on game cards. Versus Mode: game board 70% left, chat panel 30% right with glass-effect treatment.

## Structural Zones
| Zone | Treatment | Notes |
|------|-----------|-------|
| Header/Nav | `bg-card` with gold accent bar beneath | Wallet balance on right, logo left, "Versus" nav item gold |
| Versus Game Board | `bg-versus-board-bg` left panel (70%) | Game canvas, player names at top in serif, wager buttons below |
| Versus Chat Panel | `bg-versus-chat-bg` right panel (30%) | Messages scroll-able, input at bottom, gold/purple text per speaker |
| Versus Players Panel | `bg-card` cards in chat area | Avatar, wallet balance (mono font), online/offline dot indicator |
| Match Result | Winner: gold glow + shadow. Loser: purple dim + muted border | 0.35 alpha glow on winner, 0.08 alpha bg on loser |
| Footer | `bg-muted/20` with `border-t border-border` | Legal links, support contact |

## Versus Mode Layout
- **Game Board**: Flex container, 70% of viewport width, game canvas centered, player names (serif) top-left and top-right
- **Chat Panel**: Flex column, 30% width, messages scrollable, input 50px fixed height
- **Active Players Roster**: Shows 5–10 online players, avatar placeholder, wallet address (mono), balance in gold, status dot
- **Waiting State**: Gold spinner (32px) with pulsing text "Waiting for opponent..."
- **Wager Selection**: 3 gold buttons (10/30/100 ICP), currently active is `versus-wager-button.active`

## Component Patterns — Profile Setup
- **Modal Overlay**: Full-screen dark backdrop (oklch 0.05 0 0 / 0.85), blur 8px, centered card entry animation (profile-card-enter 0.5s cubic-bezier spring)
- **Card**: 480px max-width, cyber grid + scanline pseudo-elements (::before z-0, ::after z-1), glassmorphic bg with 16px blur, neon border glow (indigo / 0.35)
- **Avatar Frame**: 200px circle, neon indigo pulse ring (avatar-glow-pulse 2.5s infinite), holographic shimmer on hover, scanline overlay, radial placeholder gradient with initials
- **Username Input**: 12px border-radius, neon glow focus animation (profile-input-glow 2s infinite), dual cyan/indigo glow on active, character counter (mono font, updated on input)
- **Buttons**: "Complete Setup" (indigo bg, plasma glow shadow), "Skip for Now" (ghost style, dim border, smaller weight). Both use press-depth on active.
- **Header**: Space Grotesk h1 with text-shadow-premium, subtext in muted foreground (Lora)
- **Character Count**: Mono font (JetBrains), real-time validation: green (valid 3–20 chars), red (invalid)

## Component Patterns — Game Cards (Glassmorphism)
- **Glass Surface**: Semi-transparent blur (12px) with subtle gold border glow and inset highlight
- **Cinematic Overlay**: Gradient lighting effect (gold highlight top 40%, shadow bottom 100%)
- **Depth Shadows**: depth-md on default, depth-lg on hover
- **Hover Animation**: Scale 1.02 + shimmer gold overlay + shadow upgrade + cubic-bezier easing
- **Typography**: Space Grotesk bold for title, Lora for description, text-shadow-premium on headers
- **3D Asset Appearance**: Beveled borders, gradient overlays, layered shadows create depth illusion

## Component Patterns — Versus Mode
- **Game Board Canvas**: Centered 2D game (chess board grid, dice viewport, or RPS arena) with OKLCH gold/purple theme
- **Player Cards**: Avatar (32px), name (serif Fraunces), wallet balance (mono, gold), match result (win/loss state)
- **Chat Messages**: Sender name in gold (player) or purple (opponent), message in light text on dark translucent bg
- **Wager Buttons**: 10/30/100 ICP only, active state is gold with dark text, hover adds gold border
- **Waiting Spinner**: Rotating gold 32px circle with "Waiting for opponent..." text pulsing below
- **Result Overlay**: Winner card gold glow (0.35 shadow), loser card purple dim (0.08 bg), both with serif name + winnings/loss amount

## Spacing & Rhythm
Grid-based spacing (0.25rem, 0.5rem, 1rem, 1.5rem units). Card padding: 1.5rem. Gap between grid items: 1rem. Versus Mode: game board left 70%, chat right 30%, padding 1rem all sides. Chat messages 0.75rem gap, input 50px fixed height.

## Motion
- **Profile Setup**: Modal card entry (profile-card-enter 0.5s spring), avatar glow pulse (avatar-glow-pulse 2.5s infinite), input focus glow (profile-input-glow 2s infinite), holographic shimmer on avatar hover (holographic-shift 4s infinite)
- **Smooth Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all hover/focus/active states
- **Staggered Grid Load**: Fade-in-up animation (0.6s) with 50ms stagger per item (12 game cards load sequentially)
- **Glass Hover**: Scale 1.02 + shimmer overlay on card hover, depth shadow upgrade (sm → md)
- **Button Press**: 0.96 scale + 0.85 opacity on active (press-depth class)
- **Reel Spin**: 1.2s staggered spin animation per reel column; 8x8 reels move down with dramatic stop
- **Win Glow**: 0.6s pulse animation on ruby/blue symbols when matched
- **Carousel**: 0.3s fade + slide for hero games
- **Versus Spinner**: 0.8s linear infinite rotation on waiting state
- **Versus Chat**: Smooth scroll, fade-in on new messages, no bounce
- **Shimmer Effect**: Gold shimmer (3s infinite) on game cards on hover
- **No bounce or playful animations — premium cyberpunk feel maintained throughout**

## Constraints
- No gradients on text. No opacity stacking for readability. AA+ contrast on all text. Dark mode only.
- Gold accent used sparingly: nav bar, buttons, active states, hover highlights, player online dots only.
- Versus Mode: gold for player (self), purple for opponent. Chat text gold on dark card bg. All colors OKLCH-compliant.
- Wager buttons: gold active only, no orange or red anywhere.
