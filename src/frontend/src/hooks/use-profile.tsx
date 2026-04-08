import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface UserProfile {
  userId: { toText: () => string };
  username: string;
  avatarUrl: [] | [string];
  createdAt: bigint;
}

// Extended actor type covering profile methods not yet in generated bindings.
// Will be resolved once pnpm bindgen runs after backend deployment.
interface ProfileActor {
  getMyProfile: () => Promise<[] | [UserProfile]>;
  hasProfile: () => Promise<boolean>;
  setProfile: (
    username: string,
    avatarUrl: [] | [string],
  ) => Promise<{ ok: null } | { err: string }>;
}

function useProfileActor() {
  const { actor, isFetching } = useActor(createActor);
  return {
    actor: actor as unknown as ProfileActor | null,
    ready: !!actor && !isFetching,
  };
}

export function useMyProfile() {
  const { actor, ready } = useProfileActor();
  return useQuery<UserProfile | null>({
    queryKey: ["my-profile"],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!actor) return null;
      try {
        const result = await actor.getMyProfile();
        if (Array.isArray(result) && result.length > 0)
          return result[0] ?? null;
      } catch {
        // profile methods not yet deployed — treat as no profile
      }
      return null;
    },
    enabled: ready,
    staleTime: 30_000,
  });
}

export function useHasProfile() {
  const { actor, ready } = useProfileActor();
  const { data, isLoading } = useQuery<boolean>({
    queryKey: ["has-profile"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.hasProfile();
      } catch {
        // profile methods not yet deployed — allow bypass
        return true;
      }
    },
    enabled: ready,
    staleTime: 30_000,
  });
  return { hasProfile: data ?? false, isLoading: isLoading || !ready };
}

export function useSetProfile() {
  const { actor } = useProfileActor();
  const qc = useQueryClient();

  const mutation = useMutation<
    void,
    Error,
    { username: string; avatarUrl?: string }
  >({
    mutationFn: async ({ username, avatarUrl }) => {
      if (!actor) throw new Error("Not connected");
      const avatarArg: [] | [string] = avatarUrl ? [avatarUrl] : [];
      const result = await actor.setProfile(username, avatarArg);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      qc.invalidateQueries({ queryKey: ["has-profile"] });
    },
  });

  return {
    setProfile: (username: string, avatarUrl?: string) =>
      mutation.mutateAsync({ username, avatarUrl }),
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}

/** Resolve a display name from a profile or fall back to a short principal */
export function getDisplayName(
  profile: UserProfile | null | undefined,
  principalText: string | null | undefined,
): string {
  if (profile?.username) return profile.username;
  if (!principalText) return "Guest";
  const suffix = principalText.replace(/-/g, "").slice(-6).toUpperCase();
  return `Player_${suffix}`;
}

/** Resolve avatar URL from a profile */
export function getAvatarUrl(
  profile: UserProfile | null | undefined,
): string | null {
  if (!profile?.avatarUrl) return null;
  const arr = profile.avatarUrl;
  return arr.length > 0 ? (arr[0] ?? null) : null;
}
