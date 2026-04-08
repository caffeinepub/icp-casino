import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownToLine,
  LogIn,
  LogOut,
  Menu,
  Receipt,
  Sword,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useWallet } from "../hooks/use-wallet";
import { DepositModal } from "./DepositModal";

interface NavbarProps {
  onNavigate?: () => void;
  onTransactions?: () => void;
  onVersusMode?: () => void;
}

export function Navbar({
  onNavigate,
  onTransactions,
  onVersusMode,
}: NavbarProps) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principalText,
    login,
    logout,
  } = useAuth();
  const {
    balanceFormatted,
    isLoading: walletLoading,
    isPlugConnected,
  } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);

  const shortPrincipal = principalText
    ? `${principalText.slice(0, 6)}…${principalText.slice(-4)}`
    : null;

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, oklch(0.58 0.22 265), oklch(0.72 0.20 290));
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: oklch(0.80 0.18 280);
          text-shadow: 0 0 12px oklch(0.58 0.22 265 / 0.45);
        }
      `}</style>

      <header
        className="sticky top-0 z-50"
        style={{
          /* FIXED: deep purple background, not orange-brown */
          background: "oklch(0.10 0.04 290 / 0.95)",
          borderBottom: "1px solid oklch(0.55 0.22 265 / 0.25)",
          boxShadow:
            "0 2px 24px oklch(0 0 0 / 0.65), 0 1px 0 oklch(0.55 0.22 265 / 0.18)",
        }}
        data-ocid="navbar"
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Brand — DFINITY-inspired purple/indigo/violet gradient logo */}
          <button
            type="button"
            onClick={onNavigate}
            className="flex items-center gap-2.5 group transition-smooth"
            aria-label="ICP Casino Home"
          >
            {/* Logo icon: DFINITY-inspired wide-spectrum gradient icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.28 330) 0%, oklch(0.55 0.27 290) 25%, oklch(0.55 0.28 265) 50%, oklch(0.60 0.27 240) 75%, oklch(0.70 0.25 200) 100%)",
                boxShadow:
                  "0 2px 20px oklch(0.60 0.27 265 / 0.65), 0 0 40px oklch(0.65 0.28 300 / 0.25)",
              }}
            >
              {/* ICP infinity-style SVG icon with gradient strokes */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="logoIconGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="oklch(0.95 0.05 330)" />
                    <stop offset="50%" stopColor="oklch(0.97 0 0)" />
                    <stop offset="100%" stopColor="oklch(0.92 0.08 200)" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="8"
                  cy="12"
                  rx="5.5"
                  ry="3.5"
                  stroke="url(#logoIconGrad)"
                  strokeWidth="2"
                  fill="none"
                />
                <ellipse
                  cx="16"
                  cy="12"
                  rx="5.5"
                  ry="3.5"
                  stroke="url(#logoIconGrad)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="12" cy="12" r="2" fill="oklch(0.97 0 0)" />
              </svg>
            </div>
            {/* Logo text: wide DFINITY-style spectrum gradient */}
            <span className="heading-cinematic font-display text-xl font-bold tracking-tight">
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.28 330) 0%, oklch(0.62 0.27 290) 30%, oklch(0.65 0.28 265) 60%, oklch(0.70 0.25 200) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ICP{" "}
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.28 265) 0%, oklch(0.60 0.27 240) 50%, oklch(0.70 0.25 200) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Casino
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={onNavigate}
              className="nav-link text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth"
            >
              Games
            </button>
            <button
              type="button"
              onClick={onVersusMode}
              className="nav-link text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5"
              data-ocid="nav-versus"
            >
              <Sword
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.68 0.22 265)" }}
              />
              Versus Mode
            </button>
            <button
              type="button"
              onClick={onTransactions}
              className="nav-link text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="nav-transactions"
            >
              Transactions
            </button>
          </nav>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && isPlugConnected && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-smooth"
                style={{
                  background: "oklch(0.14 0.04 290 / 0.80)",
                  borderColor: "oklch(0.55 0.22 265 / 0.40)",
                  boxShadow: "0 0 12px oklch(0.55 0.22 265 / 0.12)",
                }}
                data-ocid="wallet-balance"
              >
                <Wallet
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.72 0.18 65)" }}
                />
                {walletLoading ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <span
                    className="text-sm font-mono font-semibold wallet-balance"
                    style={{ color: "oklch(0.83 0.14 65)" }}
                  >
                    {balanceFormatted} ICP
                  </span>
                )}
              </div>
            )}

            {isInitializing ? (
              <Skeleton className="h-9 w-24" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                {shortPrincipal && (
                  <span
                    className="text-xs font-mono px-2.5 py-1.5 rounded-lg"
                    style={{
                      color: "oklch(0.70 0.05 280)",
                      background: "oklch(0.14 0.04 290 / 0.80)",
                      border: "1px solid oklch(0.30 0.06 280 / 0.40)",
                    }}
                    title={principalText ?? ""}
                  >
                    {shortPrincipal}
                  </span>
                )}
                <Button
                  size="sm"
                  onClick={() => setDepositOpen(true)}
                  variant="outline"
                  className="gap-1.5 font-bold btn-premium"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                    borderColor: "transparent",
                    color: "oklch(0.97 0 0)",
                    boxShadow: "0 2px 12px oklch(0.55 0.22 265 / 0.40)",
                  }}
                  data-ocid="deposit-btn"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  Deposit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5 transition-smooth"
                  style={{
                    borderColor: "oklch(0.30 0.06 280 / 0.50)",
                    color: "oklch(0.68 0.04 280)",
                    background: "oklch(0.14 0.04 290 / 0.60)",
                  }}
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className="gap-1.5 font-bold btn-premium"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                  color: "oklch(0.97 0 0)",
                  border: "none",
                  boxShadow: "0 2px 12px oklch(0.55 0.22 265 / 0.35)",
                }}
                data-ocid="login-btn"
              >
                <LogIn className="w-3.5 h-3.5" />
                {isLoggingIn ? "Connecting…" : "Sign in"}
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-4 pb-4 glass-dark"
            style={{
              borderTop: "1px solid oklch(0.55 0.22 265 / 0.20)",
            }}
            data-ocid="mobile-menu"
          >
            <nav className="flex flex-col gap-1 pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigate?.();
                }}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg transition-smooth text-left flex items-center gap-2 hover:bg-primary/10"
              >
                Games
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onVersusMode?.();
                }}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg transition-smooth text-left flex items-center gap-2 hover:bg-primary/10"
                data-ocid="mobile-nav-versus"
              >
                <Sword
                  className="w-4 h-4"
                  style={{ color: "oklch(0.68 0.22 265)" }}
                />
                Versus Mode
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onTransactions?.();
                }}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg transition-smooth text-left flex items-center gap-2 hover:bg-primary/10"
                data-ocid="mobile-nav-transactions"
              >
                <Receipt className="w-4 h-4" />
                Transactions
              </button>
              <div
                className="pt-3 mt-1 flex flex-col gap-2"
                style={{ borderTop: "1px solid oklch(0.55 0.22 265 / 0.20)" }}
              >
                {isAuthenticated && isPlugConnected && (
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border"
                    style={{
                      background: "oklch(0.14 0.04 290 / 0.80)",
                      borderColor: "oklch(0.55 0.22 265 / 0.35)",
                    }}
                  >
                    <Wallet
                      className="w-4 h-4"
                      style={{ color: "oklch(0.72 0.18 65)" }}
                    />
                    {walletLoading ? (
                      <Skeleton className="h-4 w-20" />
                    ) : (
                      <span
                        className="text-sm font-mono font-bold wallet-balance"
                        style={{ color: "oklch(0.83 0.14 65)" }}
                      >
                        {balanceFormatted} ICP
                      </span>
                    )}
                  </div>
                )}
                {isAuthenticated ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        setMobileOpen(false);
                        setDepositOpen(true);
                      }}
                      variant="outline"
                      className="gap-1.5 w-full font-bold btn-premium"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                        borderColor: "transparent",
                        color: "oklch(0.97 0 0)",
                      }}
                      data-ocid="mobile-deposit-btn"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      Deposit ICP
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="gap-1.5 w-full transition-smooth"
                      style={{
                        borderColor: "oklch(0.30 0.06 280 / 0.50)",
                        color: "oklch(0.68 0.04 280)",
                      }}
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign out
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setMobileOpen(false);
                      login();
                    }}
                    disabled={isLoggingIn}
                    className="gap-1.5 w-full font-bold btn-premium"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.48 0.22 265))",
                      color: "oklch(0.97 0 0)",
                      border: "none",
                    }}
                    data-ocid="mobile-login-btn"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    {isLoggingIn
                      ? "Connecting…"
                      : "Sign in with Internet Identity"}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      <DepositModal
        isOpen={depositOpen}
        onClose={() => setDepositOpen(false)}
      />
    </>
  );
}
