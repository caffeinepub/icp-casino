import { useActor } from "@caffeineai/core-infrastructure";
import { ExternalBlob } from "@caffeineai/object-storage";
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
  /** Internal upload callback injected by createActorWithConfig */
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>;
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
 *
 * Uses the actor's internal _uploadFile callback (injected by createActorWithConfig)
 * which already has a correctly-configured StorageClient with a properly initialized
 * HttpAgent. This avoids re-creating an HttpAgent and ensures the same network
 * configuration (host, root key, time sync state) is used for the certificate call.
 *
 * The MOTOKO_DEDUPLICATION_SENTINEL ("!caf!") prefix is stripped to get the raw
 * hash, then getDirectURL is called to produce the public blob URL.
 */
async function uploadAvatarFile(
  file: File,
  uploadFile: (blob: ExternalBlob) => Promise<Uint8Array>,
): Promise<string> {
  const { loadConfig } = await import("@caffeineai/core-infrastructure");
  const { StorageClient } = await import("@caffeineai/object-storage");
  const { HttpAgent } = await import("@icp-sdk/core/agent");

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const blob = ExternalBlob.fromBytes(bytes);

  // Use the actor's internal _uploadFile — it calls storageClient.putFile() with
  // the correctly configured agent (same one used for all backend actor calls).
  // Returns Motoko bytes with "!caf!" prefix followed by the sha256 hash.
  const resultBytes = await uploadFile(blob);

  const SENTINEL = "!caf!";
  const hashWithPrefix = new TextDecoder().decode(resultBytes);

  if (!hashWithPrefix.startsWith(SENTINEL)) {
    throw new Error(
      `Unexpected upload result format: ${hashWithPrefix.slice(0, 20)}`,
    );
  }

  const hash = hashWithPrefix.slice(SENTINEL.length);

  // Build the direct URL using the same config the StorageClient uses.
  const config = await loadConfig();

  // Create a temporary StorageClient just for getDirectURL — this never makes
  // any canister calls, it only constructs the URL string.
  const agent = new HttpAgent({ host: config.backend_host });
  const storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );

  return storageClient.getDirectURL(hash);
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
    { username: string; avatarFile?: File }
  >({
    mutationFn: async ({ username, avatarFile }) => {
      if (!actor) throw new Error("Not connected");

      // Upload avatar if provided; otherwise pass empty option
      let avatarArg: [] | [string] = [];
      if (avatarFile) {
        try {
          // Use the actor's internal _uploadFile which has the correctly
          // configured StorageClient — avoids re-creating an HttpAgent
          // and reuses the same network/time-sync state as backend calls.
          const url = await uploadAvatarFile(
            avatarFile,
            actor._uploadFile.bind(actor),
          );
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
