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
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
