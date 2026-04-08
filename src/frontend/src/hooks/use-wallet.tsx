import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import { useAuth } from "./use-auth";

const E8S_PER_ICP = 100_000_000n;

export function formatICP(e8s: bigint): string {
  const icp = Number(e8s) / Number(E8S_PER_ICP);
  return icp.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function useWallet() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  const { data: balance = 0n, isLoading } = useQuery<bigint>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getBalance();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    refetchInterval: 15_000,
  });

  return {
    balance,
    balanceFormatted: formatICP(balance),
    isLoading: isFetching || isLoading,
  };
}
