import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy, useState } from "react";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/use-auth";

const LoginPage = lazy(() => import("./pages/Login"));
const LobbyPage = lazy(() => import("./pages/Lobby"));
const GameDetailPage = lazy(() => import("./pages/GameDetail"));
const LuckySevensPage = lazy(() => import("./pages/LuckySevens"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));
const VersusLobbyPage = lazy(() => import("./pages/VersusLobby"));
const VersusMatchPage = lazy(() => import("./pages/VersusMatch"));

type View = "lobby" | "game" | "transactions" | "versusLobby" | "versusMatch";

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
  const [matchId, setMatchId] = useState<string>("");

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

  function navigateToVersusLobby() {
    setView("versusLobby");
  }

  function navigateToVersusMatch(id: string) {
    setMatchId(id);
    setView("versusMatch");
  }

  if (isInitializing) {
    return (
      <Layout
        onNavigate={navigateToLobby}
        onTransactions={navigateToTransactions}
        onVersusMode={navigateToVersusLobby}
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
        onVersusMode={navigateToVersusLobby}
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
      onVersusMode={navigateToVersusLobby}
    >
      <Suspense fallback={<PageLoader />}>
        {view === "versusMatch" ? (
          <VersusMatchPage matchId={matchId} onBack={navigateToVersusLobby} />
        ) : view === "versusLobby" ? (
          <VersusLobbyPage onMatchStart={navigateToVersusMatch} />
        ) : view === "game" && gameId === 1n ? (
          <LuckySevensPage onBack={navigateToLobby} />
        ) : view === "game" ? (
          <GameDetailPage gameId={gameId} onBack={navigateToLobby} />
        ) : view === "transactions" ? (
          <TransactionsPage />
        ) : (
          <LobbyPage
            onPlay={navigateToGame}
            onTransactions={navigateToTransactions}
            onVersusMode={navigateToVersusLobby}
          />
        )}
      </Suspense>
    </Layout>
  );
}
