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
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      data-ocid="login-page"
    >
      {/* Hero */}
      <div className="text-center mb-12 max-w-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6 shadow-lg">
          <Coins className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Welcome to <span className="text-primary">ICP Casino</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The decentralized casino on the Internet Computer. Sign in with
          Internet Identity to start playing.
        </p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        onClick={login}
        disabled={isLoggingIn}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg transition-smooth mb-12"
        data-ocid="hero-login-btn"
      >
        <Shield className="w-5 h-5" />
        {isLoggingIn
          ? "Connecting to Internet Identity…"
          : "Sign in with Internet Identity"}
      </Button>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-card border border-border rounded-lg p-5 text-center shadow-card hover:border-primary/40 transition-smooth"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1.5 text-sm">
              {f.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground text-center max-w-sm">
        By signing in, you agree to our Terms of Service and Privacy Policy.
        Play responsibly. 18+ only.
      </p>
    </div>
  );
}
