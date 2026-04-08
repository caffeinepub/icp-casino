import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, LogIn, LogOut, Menu, Receipt, Wallet, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useWallet } from "../hooks/use-wallet";

interface NavbarProps {
  onNavigate?: () => void;
  onTransactions?: () => void;
}

export function Navbar({ onNavigate, onTransactions }: NavbarProps) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principalText,
    login,
    logout,
  } = useAuth();
  const { balanceFormatted, isLoading: walletLoading } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  const shortPrincipal = principalText
    ? `${principalText.slice(0, 6)}…${principalText.slice(-4)}`
    : null;

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-lg"
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
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-smooth">
            <Coins className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            ICP <span className="text-primary">Casino</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={onNavigate}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
          >
            Games
          </button>
          <button
            type="button"
            onClick={onTransactions}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
            data-ocid="nav-transactions"
          >
            Transactions
          </button>
        </nav>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <div
              className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md border border-border"
              data-ocid="wallet-balance"
            >
              <Wallet className="w-4 h-4 text-primary" />
              {walletLoading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <span className="text-sm font-mono font-semibold text-foreground">
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
                  className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded"
                  title={principalText ?? ""}
                >
                  {shortPrincipal}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5"
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
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
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
          className="md:hidden border-t border-border bg-card px-4 pb-4"
          data-ocid="mobile-menu"
        >
          <nav className="flex flex-col gap-2 pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigate?.();
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-smooth text-left"
            >
              Games
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onTransactions?.();
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-smooth text-left flex items-center gap-2"
              data-ocid="mobile-nav-transactions"
            >
              <Receipt className="w-4 h-4" />
              Transactions
            </button>
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              {isAuthenticated && (
                <div className="flex items-center gap-1.5 bg-muted px-3 py-2 rounded-md">
                  <Wallet className="w-4 h-4 text-primary" />
                  {walletLoading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    <span className="text-sm font-mono font-semibold">
                      {balanceFormatted} ICP
                    </span>
                  )}
                </div>
              )}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="gap-1.5 w-full"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign out
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    login();
                  }}
                  disabled={isLoggingIn}
                  className="gap-1.5 w-full bg-primary text-primary-foreground"
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
  );
}
