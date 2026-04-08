import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createActor } from "../backend";
import type {
  ChatMessage,
  CreateMatchRequest,
  JoinMatchResult,
  MakeMoveResult,
  Match,
  OnlinePlayer,
} from "../backend";
import { useAuth } from "./use-auth";

const POLL_GAME = 5_000;
const POLL_HEARTBEAT = 10_000;

function useVersusActor() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return { actor, ready: !!actor && !isFetching && isAuthenticated };
}

export function useOnlinePlayers() {
  const { actor, ready } = useVersusActor();
  return useQuery<OnlinePlayer[]>({
    queryKey: ["online-players"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOnlinePlayers();
    },
    enabled: ready,
    refetchInterval: POLL_GAME,
  });
}

export function useOpenMatches() {
  const { actor, ready } = useVersusActor();
  return useQuery<Match[]>({
    queryKey: ["open-matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOpenMatches();
    },
    enabled: ready,
    refetchInterval: POLL_GAME,
  });
}

export function useMatch(matchId: string | null) {
  const { actor, ready } = useVersusActor();
  return useQuery<Match | null>({
    queryKey: ["match", matchId],
    queryFn: async () => {
      if (!actor || !matchId) return null;
      return actor.getMatch(matchId);
    },
    enabled: ready && !!matchId,
    refetchInterval: POLL_GAME,
  });
}

export function useMatchChat(matchId: string | null) {
  const { actor, ready } = useVersusActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["match-chat", matchId],
    queryFn: async () => {
      if (!actor || !matchId) return [];
      return actor.getMatchChat(matchId);
    },
    enabled: ready && !!matchId,
    refetchInterval: POLL_GAME,
  });
}

export function useHeartbeat() {
  const { actor, ready } = useVersusActor();
  const qc = useQueryClient();
  useEffect(() => {
    if (!ready || !actor) return;
    const id = setInterval(async () => {
      try {
        await actor.heartbeat();
        qc.invalidateQueries({ queryKey: ["online-players"] });
      } catch {
        // silently fail
      }
    }, POLL_HEARTBEAT);
    return () => clearInterval(id);
  }, [ready, actor, qc]);
}

export function useCreateMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<Match, Error, CreateMatchRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createMatch(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    },
  });
}

export function useJoinMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<JoinMatchResult, Error, string>({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.joinMatch(matchId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    },
  });
}

export function useAcceptWager() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<JoinMatchResult, Error, string>({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.acceptWager(matchId);
    },
    onSuccess: (_data, matchId) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
  });
}

export function useLeaveMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<Match | null, Error, string>({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.leaveMatch(matchId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    },
  });
}

export function useSendChatMessage() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<ChatMessage, Error, { matchId: string; message: string }>({
    mutationFn: async ({ matchId, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendChatMessage(matchId, message);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match-chat", matchId] });
    },
  });
}

export function useMakeChessMove() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<
    MakeMoveResult,
    Error,
    { matchId: string; from: string; to: string; promotion?: string }
  >({
    mutationFn: async ({ matchId, from, to, promotion }) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeChessMove(matchId, from, to, promotion ?? null);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
  });
}

export function useMakeDiceRoll() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<MakeMoveResult, Error, string>({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeDiceRoll(matchId);
    },
    onSuccess: (_data, matchId) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
  });
}

export function useMakeRPSChoice() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation<
    MakeMoveResult,
    Error,
    { matchId: string; choice: string }
  >({
    mutationFn: async ({ matchId, choice }) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeRPSChoice(matchId, choice);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
  });
}
