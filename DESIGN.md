# Design Brief

## Direction
Premium ICP casino platform with luxurious dark gaming aesthetic, sophisticated gold/amber accents, and vibrant category badges. High-contrast gaming focus without gauche neon effects.

## Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| background | `0.12 0 0` | Deep charcoal primary surface |
| card | `0.16 0 0` | Card layers, slight lift from background |
| primary | `0.68 0.24 56` | Gold/amber accent, CTAs, highlights |
| destructive | `0.62 0.24 12` | Error states, critical actions |
| chart-1 | `0.62 0.28 263` | Cyan badge & accent |
| chart-2 | `0.68 0.22 162` | Magenta badge & accent |
| chart-3 | `0.72 0.26 124` | Lime badge & accent |

## Typography
| Layer | Font | Usage |
|-------|------|-------|
| Display | Fraunces (Serif) | Headlines, game titles, premium branding |
| Body | DM Sans (Sans-serif) | Body text, UI labels, navigation |
| Mono | Geist Mono | Wallet addresses, transaction IDs |

## Elevation & Depth
Card-stacked surfaces: background → card → popover. Gold accent bar on nav. Semi-transparent overlays on game imagery. Smooth shadow hierarchy without neon glow.

## Structural Zones
| Zone | Treatment | Notes |
|------|-----------|-------|
| Header/Nav | `bg-card` with gold accent bar beneath | Wallet balance on right, logo left |
| Hero Carousel | `bg-card` with high-contrast game imagery | Smooth fade transitions |
| Game Grid | `bg-background` with `bg-card` game cells | Vibrant category badges overlay |
| Transaction Table | `bg-card` rows on `bg-background` | Gold accent bar left of row |
| Footer | `bg-muted/20` with `border-t border-border` | Legal links, support contact |

## Spacing & Rhythm
Grid-based spacing (0.25rem, 0.5rem, 1rem, 1.5rem units). Card padding: 1.5rem. Gap between grid items: 1rem. Tight 0.5rem border-radius for sophistication.

## Component Patterns
Game cards: overlay badges, hover scale + gold shadow. Buttons: gold background with dark text, no outline variant. Filters: pill-shaped with muted styling. Search: icon-leading input with focus ring.

## Motion
Smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1) on hover/focus states. Carousel: fade + slide (300ms). Skeleton loaders: pulse subtle opacity. No bounce or playful animations.

## Constraints
No gradients on text. No opacity stacking for readability. AA+ contrast on all text. Dark mode only. Gold accent used sparingly: nav bar, buttons, active states, hover highlights only.
