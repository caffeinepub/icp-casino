import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "depth-sm": "0 4px 12px oklch(0 0 0 / 0.15)",
        "depth-md": "0 8px 24px oklch(0 0 0 / 0.2), 0 2px 6px oklch(0 0 0 / 0.1)",
        "depth-lg": "0 16px 48px oklch(0 0 0 / 0.25), 0 4px 12px oklch(0 0 0 / 0.15)",
        "glass": "0 8px 32px oklch(0 0 0 / 0.12), inset 1px 1px 0 oklch(0.96 0.02 65 / 0.1)",
        /* Cyberpunk neon shadow tokens */
        "neon-indigo": "0 0 8px oklch(0.65 0.25 265 / 0.8), 0 0 20px oklch(0.65 0.25 265 / 0.4), 0 0 40px oklch(0.65 0.25 265 / 0.15)",
        "neon-cyan":   "0 0 8px oklch(0.70 0.25 200 / 0.8), 0 0 20px oklch(0.70 0.25 200 / 0.4), 0 0 40px oklch(0.70 0.25 200 / 0.15)",
        "neon-gold":   "0 0 8px oklch(0.72 0.14 65 / 0.8), 0 0 20px oklch(0.72 0.14 65 / 0.4), 0 0 40px oklch(0.72 0.14 65 / 0.15)",
        "plasma-ring": "0 0 0 2px oklch(0.65 0.25 265 / 0.5), 0 0 12px oklch(0.65 0.25 265 / 0.35), 0 0 24px oklch(0.70 0.25 200 / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        /* Cyberpunk keyframes */
        "neon-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px oklch(0.65 0.25 265 / 0.8)) drop-shadow(0 0 16px oklch(0.70 0.25 200 / 0.5))",
            opacity: "1",
          },
          "50%": {
            filter: "drop-shadow(0 0 3px oklch(0.65 0.25 265 / 0.35)) drop-shadow(0 0 6px oklch(0.70 0.25 200 / 0.2))",
            opacity: "0.85",
          },
        },
        "cyber-scan": {
          "0%": { backgroundPosition: "0 -100%" },
          "100%": { backgroundPosition: "0 200%" },
        },
        "holographic-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg) brightness(1)" },
          "50%": { filter: "hue-rotate(20deg) brightness(1.08)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-50px -50px" },
        },
        "plasma-ripple": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 oklch(0.55 0.25 265 / 0.6), 0 0 8px 2px oklch(0.70 0.25 200 / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 0 8px oklch(0.55 0.25 265 / 0.0), 0 0 20px 6px oklch(0.70 0.25 200 / 0.5)",
          },
        },
        "data-stream": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 400px" },
        },
        "glitch-flicker": {
          "0%, 89%, 91%, 94%, 96%, 100%": { transform: "translate(0, 0)", opacity: "1" },
          "90%": { transform: "translate(1px, 0)", opacity: "0.9" },
          "92%": { transform: "translate(-1px, 0)", opacity: "0.95" },
          "93%": { transform: "translate(1px, 0)", opacity: "0.88" },
          "95%": { transform: "translate(-1px, 0)", opacity: "0.92" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "shimmer": "shimmer 3s infinite",
        /* Cyberpunk animation utilities */
        "neon-pulse":          "neon-pulse 2s ease-in-out infinite",
        "cyber-scan":          "cyber-scan 3s linear infinite",
        "holographic-shift":   "holographic-shift 4s ease infinite",
        "grid-drift":          "grid-drift 20s linear infinite",
        "plasma-ripple":       "plasma-ripple 1.5s ease-in-out infinite",
        "data-stream":         "data-stream 8s linear infinite",
        "glitch-flicker":      "glitch-flicker 6s step-end infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
