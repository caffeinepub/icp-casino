import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { LobbyChatMessage } from "../backend";
import { useAuth } from "./use-auth";
import { type UserProfile, useMyProfile } from "./use-profile";

const E8S_PER_ICP = 100_000_000n;

export function formatICP(e8s: bigint): string {
  const icp = Number(e8s) / Number(E8S_PER_ICP);
  return icp.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

// ---------------------------------------------------------------------------
// Real on-chain wallet balance
// ---------------------------------------------------------------------------
export function useWallet() {
  const { isFetching } = useActor(createActor);

  const { data: balanceData, isLoading } = useQuery<bigint | null>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      if (typeof window === "undefined" || !window.ic?.plug) {
        return null;
      }

      const plugConnected = await window.ic.plug
        .isConnected()
        .catch(() => false);
      if (!plugConnected) return null;

      try {
        const balanceRes = await window.ic.plug.requestBalance();
        if (Array.isArray(balanceRes) && balanceRes.length > 0) {
          const icpEntry = balanceRes.find(
            (b: { symbol?: string }) => b.symbol === "ICP",
          );
          if (icpEntry && typeof icpEntry.amount === "number") {
            return BigInt(Math.round(icpEntry.amount * Number(E8S_PER_ICP)));
          }
        }
      } catch {
        // If requestBalance fails, return null
      }

      return null;
    },
    refetchInterval: 15_000,
    staleTime: 10_000,
  });

  const isPlugConnected = balanceData !== null && balanceData !== undefined;
  const balance = balanceData ?? 0n;

  return {
    balance,
    balanceFormatted: formatICP(balance),
    isLoading: isFetching || isLoading,
    isPlugConnected,
  };
}

// ---------------------------------------------------------------------------
// Lobby chat hooks
// ---------------------------------------------------------------------------
const LOBBY_POLL = 5_000;

function useLobbyActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}

export function useLobbyChatMessages() {
  const { actor, ready } = useLobbyActor();
  return useQuery<LobbyChatMessage[]>({
    queryKey: ["lobby-chat"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLobbyChatMessages();
    },
    enabled: ready,
    refetchInterval: LOBBY_POLL,
    staleTime: 3_000,
  });
}

export function useSendLobbyChatMessage() {
  const { actor } = useLobbyActor();
  const qc = useQueryClient();
  return useMutation<
    LobbyChatMessage,
    Error,
    { message: string; senderName: string }
  >({
    mutationFn: async ({ message, senderName }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendLobbyChatMessage(message, senderName);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lobby-chat"] });
    },
  });
}

// ---------------------------------------------------------------------------
// Derive a display name — use profile username if available, else principal suffix
// ---------------------------------------------------------------------------
export function usePlayerDisplayName(): string {
  const { principalText, isAuthenticated } = useAuth();
  const { data } = useMyProfile();
  const profile = data as UserProfile | null | undefined;

  if (!isAuthenticated || !principalText) return "Guest";

  // Prefer profile username if set
  if (profile?.username) return profile.username;

  // Fall back to principal suffix
  const suffix = principalText.replace(/-/g, "").slice(-6).toUpperCase();
  return `Player_${suffix}`;
}

// ---------------------------------------------------------------------------
// Player avatar URL from profile (if set)
// ---------------------------------------------------------------------------
export function usePlayerAvatarUrl(): string | null {
  const { data } = useMyProfile();
  const profile = data as UserProfile | null | undefined;
  if (!profile) return null;
  const avatarUrl = profile.avatarUrl;
  if (Array.isArray(avatarUrl) && avatarUrl.length > 0)
    return avatarUrl[0] ?? null;
  return null;
}
