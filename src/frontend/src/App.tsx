import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy, useState } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/use-auth";

const LoginPage = lazy(() => import("./pages/Login"));
const LobbyPage = lazy(() => import("./pages/Lobby"));
const GameDetailPage = lazy(() => import("./pages/GameDetail"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));

type View = "lobby" | "game" | "transactions";

function PageLoader() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((key) => (
          <Skeleton key={key} className="aspect-[4/3] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated, isInitializing } = useAuth();
  const [view, setView] = useState<View>("lobby");
  const [gameId, setGameId] = useState<bigint>(0n);

  function navigateToGame(id: bigint) {
    setGameId(id);
    setView("game");
  }

  function navigateToLobby() {
    setView("lobby");
  }

  function navigateToTransactions() {
    setView("transactions");
  }

  if (isInitializing) {
    return (
      <Layout
        onNavigate={navigateToLobby}
        onTransactions={navigateToTransactions}
      >
        <PageLoader />
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout
        onNavigate={navigateToLobby}
        onTransactions={navigateToTransactions}
      >
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </Layout>
    );
  }

  return (
    <Layout
      onNavigate={navigateToLobby}
      onTransactions={navigateToTransactions}
    >
      <Suspense fallback={<PageLoader />}>
        {view === "game" ? (
          <GameDetailPage gameId={gameId} onBack={navigateToLobby} />
        ) : view === "transactions" ? (
          <TransactionsPage />
        ) : (
          <LobbyPage
            onPlay={navigateToGame}
            onTransactions={navigateToTransactions}
          />
        )}
      </Suspense>
    </Layout>
  );
}
