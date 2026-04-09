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
        // On any error, assume no profile exists so Account Setup is shown
        return false;
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
    { username: string; avatarEmoji?: string }
  >({
    mutationFn: async ({ username, avatarEmoji }) => {
      if (!actor) throw new Error("Not connected");

      // Save emoji string directly as avatarUrl — the backend accepts any text
      const avatarArg: [] | [string] = avatarEmoji ? [avatarEmoji] : [];

      const result = await actor.setProfile(username, avatarArg);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      qc.invalidateQueries({ queryKey: ["has-profile"] });
    },
  });

  return {
    setProfile: (username: string, avatarEmoji?: string) =>
      mutation.mutateAsync({ username, avatarEmoji }),
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

/** Resolve avatar URL (or emoji) from a profile */
export function getAvatarUrl(
  profile: UserProfile | null | undefined,
): string | null {
  if (!profile?.avatarUrl) return null;
  const arr = profile.avatarUrl;
  return arr.length > 0 ? (arr[0] ?? null) : null;
}

/**
 * Returns true if the given string is a single emoji/icon character
 * (used to decide whether to render as <img> or as text).
 */
export function isEmojiAvatar(value: string | null | undefined): boolean {
  if (!value) return false;
  // Emoji are typically 1-4 chars in length; URLs contain slashes or dots
  if (value.length > 10) return false;
  // If it contains a slash, colon, or dot it's likely a URL
  if (/[/:.]/.test(value)) return false;
  return true;
}
