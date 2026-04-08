import type { ReactNode } from "react";
import { ChatBox } from "./ChatBox";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  onNavigate?: () => void;
  onTransactions?: () => void;
  onVersusMode?: () => void;
}

export function Layout({
  children,
  onNavigate,
  onTransactions,
  onVersusMode,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar
        onNavigate={onNavigate}
        onTransactions={onTransactions}
        onVersusMode={onVersusMode}
      />
      <ChatBox />
      <main className="flex-1 w-full cyber-grid-bg">{children}</main>
      <footer className="relative">
        {/* Neon top border on footer */}
        <div
          className="absolute top-0 left-0 right-0 h-px neon-glow"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.65 0.28 265 / 0.6) 30%, oklch(0.70 0.25 200 / 0.6) 70%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <Footer />
      </footer>
    </div>
  );
}
