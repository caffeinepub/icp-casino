import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownToLine,
  Coins,
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
          background: linear-gradient(90deg, oklch(0.72 0.18 65), oklch(0.82 0.18 65));
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: oklch(0.82 0.18 65);
          text-shadow: 0 0 12px oklch(0.72 0.18 65 / 0.45);
        }
      `}</style>

      <header
        className="sticky top-0 z-50 glass-dark blur-xl"
        style={{
          backdropFilter: "blur(20px) saturate(1.3)",
          WebkitBackdropFilter: "blur(20px) saturate(1.3)",
          borderBottom: "1px solid oklch(0.72 0.18 65 / 0.20)",
          boxShadow:
            "0 2px 24px oklch(0 0 0 / 0.65), 0 1px 0 oklch(0.72 0.18 65 / 0.18)",
        }}
        data-ocid="navbar"
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Brand */}
          <button
            type="button"
            onClick={onNavigate}
            className="flex items-center gap-2.5 group transition-smooth"
            aria-label="ICP Casino Home"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-smooth border-gold-pulse"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.58 0.18 65))",
                boxShadow: "0 2px 12px oklch(0.72 0.18 65 / 0.45)",
              }}
            >
              <Coins className="w-5 h-5" style={{ color: "oklch(0.07 0 0)" }} />
            </div>
            <span
              className="heading-cinematic text-gold-glow font-display text-xl font-bold tracking-tight"
              style={{ color: "oklch(0.88 0.18 65)" }}
            >
              ICP <span style={{ color: "oklch(0.72 0.15 300)" }}>Casino</span>
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
                style={{ color: "oklch(0.72 0.18 65)" }}
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
                  background: "oklch(0.14 0.02 45 / 0.80)",
                  borderColor: "oklch(0.72 0.18 65 / 0.40)",
                  boxShadow: "0 0 12px oklch(0.72 0.18 65 / 0.12)",
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
                    className="text-sm font-mono font-semibold text-gold-glow wallet-balance"
                    style={{ color: "oklch(0.88 0.18 65)" }}
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
                      color: "oklch(0.65 0.03 65)",
                      background: "oklch(0.14 0.02 45 / 0.80)",
                      border: "1px solid oklch(0.25 0.05 65 / 0.40)",
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
                      "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                    borderColor: "transparent",
                    color: "oklch(0.07 0 0)",
                    boxShadow: "0 2px 12px oklch(0.72 0.18 65 / 0.35)",
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
                    borderColor: "oklch(0.25 0.05 65 / 0.50)",
                    color: "oklch(0.65 0.03 65)",
                    background: "oklch(0.14 0.02 45 / 0.60)",
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
                    "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                  color: "oklch(0.07 0 0)",
                  border: "none",
                  boxShadow: "0 2px 12px oklch(0.72 0.18 65 / 0.35)",
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
              borderTop: "1px solid oklch(0.72 0.18 65 / 0.15)",
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
                  style={{ color: "oklch(0.72 0.18 65)" }}
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
                style={{ borderTop: "1px solid oklch(0.72 0.18 65 / 0.20)" }}
              >
                {isAuthenticated && isPlugConnected && (
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border"
                    style={{
                      background: "oklch(0.14 0.02 45 / 0.80)",
                      borderColor: "oklch(0.72 0.18 65 / 0.35)",
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
                        className="text-sm font-mono font-bold text-gold-glow wallet-balance"
                        style={{ color: "oklch(0.88 0.18 65)" }}
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
                          "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                        borderColor: "transparent",
                        color: "oklch(0.07 0 0)",
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
                        borderColor: "oklch(0.25 0.05 65 / 0.50)",
                        color: "oklch(0.65 0.03 65)",
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
                        "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                      color: "oklch(0.07 0 0)",
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
