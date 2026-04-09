import { loadConfig } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";
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

/**
 * Upload a File to the Caffeine object-storage gateway and return a public URL.
 * Must be called with the user's authenticated Identity so the StorageClient
 * can sign the certificate request against the backend canister.
 */
async function uploadAvatarFile(
  file: File,
  identity: Identity,
): Promise<string> {
  const config = await loadConfig();

  // Dynamically import to avoid bundling issues when object-storage is not needed
  const { StorageClient } = await import("@caffeineai/object-storage");
  const { HttpAgent } = await import("@icp-sdk/core/agent");

  // Build an authenticated agent using the user's Internet Identity delegation.
  // Without this identity the getCertificate() call inside StorageClient.putFile()
  // returns 403 Forbidden: Invalid payload because the canister rejects unsigned calls.
  const agent = new HttpAgent({
    host: config.backend_host,
    identity,
  });

  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {});
  }

  const storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const { hash } = await storageClient.putFile(bytes);
  const url = await storageClient.getDirectURL(hash);
  return url;
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
  // Grab the authenticated identity so we can pass it to the StorageClient
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();

  const mutation = useMutation<
    void,
    Error,
    { username: string; avatarFile?: File }
  >({
    mutationFn: async ({ username, avatarFile }) => {
      if (!actor) throw new Error("Not connected");

      // Upload avatar if provided; otherwise pass empty option
      let avatarArg: [] | [string] = [];
      if (avatarFile) {
        if (!identity) {
          throw new Error("Please log in before uploading a profile picture.");
        }
        try {
          const url = await uploadAvatarFile(avatarFile, identity);
          avatarArg = [url];
        } catch (uploadErr) {
          const msg =
            uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
          throw new Error(`Avatar upload failed: ${msg}`);
        }
      }

      const result = await actor.setProfile(username, avatarArg);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      qc.invalidateQueries({ queryKey: ["has-profile"] });
    },
  });

  return {
    setProfile: (username: string, avatarFile?: File) =>
      mutation.mutateAsync({ username, avatarFile }),
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
