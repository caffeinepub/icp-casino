import { Button } from "@/components/ui/button";
import { Coins, Shield, Trophy, Zap } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

const FEATURES = [
  {
    icon: Shield,
    title: "Secure by design",
    description: "Powered by Internet Identity — your keys, your account.",
  },
  {
    icon: Zap,
    title: "Instant payouts",
    description: "Winnings settle directly to your ICP wallet in seconds.",
  },
  {
    icon: Trophy,
    title: "Provably fair",
    description: "Every game result is verifiable on-chain.",
  },
];

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, oklch(0.18 0.06 300 / 0.80) 0%, oklch(0.10 0.03 300 / 0.50) 40%, oklch(0.05 0 0) 80%)",
      }}
      data-ocid="login-page"
    >
      {/* Background vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, oklch(0 0 0 / 0.70) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 65 / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Login card with glass treatment */}
        <div
          className="glass-card w-full rounded-3xl p-10 flex flex-col items-center relative overflow-hidden"
          style={{
            boxShadow: "var(--shadow-xl), 0 0 64px oklch(0.72 0.18 65 / 0.15)",
            borderColor: "oklch(0.72 0.18 65 / 0.30)",
          }}
        >
          {/* Cinematic top light */}
          <div className="cinematic-top-light" aria-hidden="true" />

          {/* Gold corner accents */}
          <span
            className="absolute top-3 left-3 w-6 h-6 pointer-events-none"
            style={{
              borderTop: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderLeft: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRadius: "4px 0 0 0",
            }}
            aria-hidden="true"
          />
          <span
            className="absolute top-3 right-3 w-6 h-6 pointer-events-none"
            style={{
              borderTop: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRight: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRadius: "0 4px 0 0",
            }}
            aria-hidden="true"
          />
          <span
            className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none"
            style={{
              borderBottom: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderLeft: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRadius: "0 0 0 4px",
            }}
            aria-hidden="true"
          />
          <span
            className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none"
            style={{
              borderBottom: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRight: "2px solid oklch(0.72 0.18 65 / 0.60)",
              borderRadius: "0 0 4px 0",
            }}
            aria-hidden="true"
          />

          {/* Logo icon */}
          <div
            className="inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-6 shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 65 / 0.25), oklch(0.55 0.18 300 / 0.20))",
              border: "1px solid oklch(0.72 0.18 65 / 0.45)",
              padding: "1rem",
            }}
          >
            <Coins
              className="w-9 h-9"
              style={{ color: "oklch(0.82 0.18 65)" }}
            />
          </div>

          {/* Title */}
          <h1
            className="heading-cinematic text-gold-glow font-display text-4xl md:text-5xl font-bold text-center mb-3 leading-tight"
            style={{ color: "oklch(0.85 0.14 65)" }}
          >
            ICP Casino
          </h1>

          {/* Tagline */}
          <p
            className="text-premium text-center text-base mb-8 leading-relaxed"
            style={{ color: "oklch(0.65 0.05 300)" }}
          >
            The decentralized casino on the Internet Computer.
            <br />
            Sign in to start playing.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={login}
            disabled={isLoggingIn}
            className="gap-2.5 btn-premium w-full py-6 text-base font-bold rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
              color: "oklch(0.97 0 0)",
              border: "none",
              boxShadow:
                "0 6px 24px oklch(0.55 0.22 265 / 0.45), 0 2px 8px oklch(0 0 0 / 0.50)",
            }}
            data-ocid="hero-login-btn"
          >
            <Shield className="w-5 h-5" />
            {isLoggingIn
              ? "Connecting to Internet Identity…"
              : "Sign in with Internet Identity"}
          </Button>

          <p
            className="mt-6 text-xs text-center"
            style={{ color: "oklch(0.45 0.02 65)" }}
          >
            By signing in, you agree to our Terms of Service. Play responsibly.
            18+ only.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mt-10">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass-card card-shimmer rounded-xl p-5 text-center transition-smooth"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                style={{
                  background: "oklch(0.72 0.18 65 / 0.15)",
                  border: "1px solid oklch(0.72 0.18 65 / 0.30)",
                }}
              >
                <f.icon
                  className="w-5 h-5"
                  style={{ color: "oklch(0.92 0 0)" }}
                />
              </div>
              <h3
                className="font-semibold mb-1.5 text-sm"
                style={{ color: "oklch(0.92 0 0)" }}
              >
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
