# Design Brief

## Direction
Premium ICP casino platform with luxurious dark gaming aesthetic, sophisticated gold/purple accents, and vibrant category badges. High-contrast gaming focus without gauche neon effects. Versus Mode is a separate competitive gaming section featuring real-time PvP skill games (chess, dice, rock-paper-scissors) with live chat and active player roster.

## Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| background | `0.07 0 0` | Deep obsidian primary surface |
| card | `0.1 0.01 45` | Card layers, slight lift from background |
| primary | `0.72 0.18 65` | Gold accent, CTAs, highlights, active player status |
| accent | `0.4 0.15 300` | Royal purple for accents, badges, opponent highlights |
| chart-1 | `0.72 0.18 65` | Gold badges & accents |
| chart-2 | `0.45 0.18 300` | Purple badges & accents |

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
| Layer | Font | Usage |
|-------|------|-------|
| Display | Fraunces (Serif) | Headlines, game titles, premium branding, player names |
| Body | DM Sans (Sans-serif) | Body text, UI labels, navigation, game labels, chat |
| Mono | Geist Mono | Wallet addresses, transaction IDs, bet amounts |

## Elevation & Depth
Card-stacked surfaces: background → card → popover. Gold accent bar on nav. Semi-transparent overlays on game imagery. Versus Mode: game board 70% left, chat panel 30% right. Winner cards use gold glow, loser cards use purple dim.

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

## Component Patterns — Midnight Dragons Game
- **8x8 Reel Grid**: 64 visible symbols, 120px per symbol height, smooth scroll animation over 1.2s
- **Symbol Design**: SVG-based dragon artwork (fire, scales, eyes, rubies, crowns, moons, claws, wild dragon)
- **Symbol Colors**: Royal blue (#2952c4) and ruby red (#c41e3a) with gold accents on treasure
- **Win Animation**: Dramatic glow pulse on winning reels using `.shadow-dragon-ruby` or `.shadow-dragon-blue`
- **Machine Frame**: Dark midnight navy background with gold and purple beveled border
- **Bet Controls**: Gold and purple buttons below reels, responsive to 1/3/5 ICP selections

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
- **Smooth Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on hover/focus states
- **Reel Spin**: 1.2s staggered spin animation per reel column; 8x8 reels move down with dramatic stop
- **Win Glow**: 0.6s pulse animation on ruby/blue symbols when matched
- **Carousel**: 0.3s fade + slide for hero games
- **Versus Spinner**: 0.8s linear infinite rotation on waiting state
- **Versus Chat**: Smooth scroll, fade-in on new messages, no bounce
- **No bounce or playful animations — premium feel maintained throughout**

## Constraints
- No gradients on text. No opacity stacking for readability. AA+ contrast on all text. Dark mode only.
- Gold accent used sparingly: nav bar, buttons, active states, hover highlights, player online dots only.
- Versus Mode: gold for player (self), purple for opponent. Chat text gold on dark card bg. All colors OKLCH-compliant.
- Wager buttons: gold active only, no orange or red anywhere.
