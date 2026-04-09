import { P as PlayerStatus, j as jsxRuntimeExports, S as Skeleton, f as formatICP, n as WagerAmount, m as useQuery, a as useQueryClient, d as useMutation, r as reactExports, u as useActor, l as useAuth, e as createActor } from "./index-C9sdOjo0.js";
import { U as Users } from "./users-B1QIjrfG.js";
function wagerToICP(wager) {
  switch (wager) {
    case "Ten":
      return 10;
    case "Thirty":
      return 30;
    case "OneHundred":
      return 100;
    default:
      return 0;
  }
}
function shortPrincipal(principal) {
  const text = principal.toText();
  return `${text.slice(0, 6)}…${text.slice(-4)}`;
}
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function resolveUsername(player) {
  if (player.username) return player.username;
  return `Player_${player.id.toText().replace(/-/g, "").slice(-6).toUpperCase()}`;
}
function resolveAvatarUrl(player) {
  return player.avatarUrl ?? null;
}
function StatusDot({ status }) {
  if (status === PlayerStatus.Online) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "shrink-0 w-2 h-2 rounded-full inline-block",
        style: {
          background: "oklch(0.70 0.25 200)",
          boxShadow: "0 0 6px oklch(0.70 0.25 200 / 0.9)",
          marginRight: "6px"
        },
        title: "Online",
        "aria-label": "Online"
      }
    );
  }
  if (status === PlayerStatus.Playing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "shrink-0 w-2 h-2 rounded-full inline-block",
        style: {
          background: "oklch(0.65 0.25 265)",
          boxShadow: "0 0 6px oklch(0.65 0.25 265 / 0.8)",
          marginRight: "6px"
        },
        title: "Playing",
        "aria-label": "Playing"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "shrink-0 w-2 h-2 rounded-full inline-block",
      style: {
        background: "oklch(0.25 0.03 280)",
        marginRight: "6px"
      },
      title: "Offline",
      "aria-label": "Offline"
    }
  );
}
function PlayerAvatar({
  username,
  avatarUrl
}) {
  const initial = username.slice(0, 1).toUpperCase();
  const hue = username.charCodeAt(0) * 137 % 360;
  const glowColor = `oklch(0.65 0.22 ${hue})`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "profile-avatar-thumbnail shrink-0",
      style: {
        width: 36,
        height: 36,
        border: `1.5px solid ${glowColor}`,
        boxShadow: `0 0 8px ${glowColor}40`,
        fontSize: 14,
        transition: "box-shadow 0.2s ease"
      },
      "aria-hidden": "true",
      children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: username }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: glowColor }, children: initial })
    }
  );
}
function OnlinePlayersList({
  players,
  isLoading,
  onChallenge
}) {
  const typedPlayers = players;
  const onlineCount = typedPlayers.filter(
    (p) => p.status !== PlayerStatus.Offline
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "online-players-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 border-b flex items-center justify-between shrink-0",
        style: { borderColor: "oklch(0.25 0.05 65 / 0.5)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Users,
              {
                className: "w-4 h-4 neon-glow-cyan",
                style: { color: "oklch(0.70 0.25 200)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "tech-text text-xs font-bold",
                style: { color: "oklch(0.70 0.25 200)" },
                children: "ONLINE PLAYERS"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-mono px-2 py-0.5 rounded-full",
              style: {
                background: "oklch(0.65 0.25 265 / 0.15)",
                color: "oklch(0.75 0.20 265)",
                border: "1px solid oklch(0.65 0.25 265 / 0.3)"
              },
              "data-ocid": "online-count",
              children: [
                onlineCount,
                " online"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "versus-players-panel flex-1 overflow-y-auto", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, n)) }),
      !isLoading && typedPlayers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 space-y-2",
          "data-ocid": "no-players-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Users,
              {
                className: "w-8 h-8 mx-auto",
                style: { color: "oklch(0.35 0.05 65)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.45 0.03 65)" }, children: "No players online" })
          ]
        }
      ),
      !isLoading && typedPlayers.map((player) => {
        const username = resolveUsername(player);
        const avatarUrl = resolveAvatarUrl(player);
        const isAvailable = player.status === PlayerStatus.Online && !!onChallenge;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onChallenge == null ? void 0 : onChallenge(player),
            disabled: player.status === PlayerStatus.Offline || !onChallenge,
            className: "versus-player-card w-full text-left transition-smooth mb-3 last:mb-0 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary group",
            style: {
              borderColor: "oklch(0.4 0.1 265 / 0.30)"
            },
            onMouseEnter: (e) => {
              if (!isAvailable) return;
              e.currentTarget.style.borderColor = "oklch(0.65 0.25 265 / 0.70)";
              e.currentTarget.style.boxShadow = "0 0 16px oklch(0.65 0.25 265 / 0.20), 0 0 4px oklch(0.70 0.25 200 / 0.15)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "oklch(0.4 0.1 265 / 0.30)";
              e.currentTarget.style.boxShadow = "none";
            },
            "data-ocid": "player-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerAvatar, { username, avatarUrl }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: player.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "profile-username-display text-xs truncate",
                        style: { color: "oklch(0.92 0 0)" },
                        children: username
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-mono block truncate",
                      style: { color: "oklch(0.38 0.04 280)" },
                      children: shortPrincipal(player.id)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "versus-player-balance block mt-0.5", children: [
                    formatICP(player.balanceE8s),
                    " ICP"
                  ] })
                ] })
              ] }),
              isAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-xs font-semibold shrink-0 ml-2 mt-0.5 tech-text",
                  style: {
                    color: "oklch(0.70 0.25 200)",
                    fontSize: "0.65rem"
                  },
                  children: "CHALLENGE"
                }
              )
            ]
          },
          player.id.toText()
        );
      })
    ] })
  ] });
}
const WAGER_OPTIONS = [
  { value: WagerAmount.Ten, label: "10 ICP" },
  { value: WagerAmount.Thirty, label: "30 ICP" },
  { value: WagerAmount.OneHundred, label: "100 ICP" }
];
function WagerSelector({
  selected,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { "data-ocid": "wager-selector", className: "contents", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Select wager amount" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: WAGER_OPTIONS.map(({ value, label }) => {
      const isActive = selected === value;
      const id = `wager-${value.toLowerCase()}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: id,
          className: `versus-wager-button cursor-pointer select-none${isActive ? " active" : ""}${disabled ? " opacity-40 cursor-not-allowed" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id,
                type: "radio",
                name: "wager",
                value,
                checked: isActive,
                disabled,
                onChange: () => onChange(value),
                className: "sr-only",
                "data-ocid": `wager-btn-${value.toLowerCase()}`
              }
            ),
            label
          ]
        },
        value
      );
    }) })
  ] });
}
const POLL_GAME = 5e3;
const POLL_HEARTBEAT = 1e4;
function useVersusActor() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return { actor, ready: !!actor && !isFetching && isAuthenticated };
}
function useOnlinePlayers() {
  const { actor, ready } = useVersusActor();
  return useQuery({
    queryKey: ["online-players"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOnlinePlayers();
    },
    enabled: ready,
    refetchInterval: POLL_GAME
  });
}
function useOpenMatches() {
  const { actor, ready } = useVersusActor();
  return useQuery({
    queryKey: ["open-matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOpenMatches();
    },
    enabled: ready,
    refetchInterval: POLL_GAME
  });
}
function useMatch(matchId) {
  const { actor, ready } = useVersusActor();
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: async () => {
      if (!actor || !matchId) return null;
      return actor.getMatch(matchId);
    },
    enabled: ready && !!matchId,
    refetchInterval: POLL_GAME
  });
}
function useMatchChat(matchId) {
  const { actor, ready } = useVersusActor();
  return useQuery({
    queryKey: ["match-chat", matchId],
    queryFn: async () => {
      if (!actor || !matchId) return [];
      return actor.getMatchChat(matchId);
    },
    enabled: ready && !!matchId,
    refetchInterval: POLL_GAME
  });
}
function useHeartbeat() {
  const { actor, ready } = useVersusActor();
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    if (!ready || !actor) return;
    const id = setInterval(async () => {
      try {
        await actor.heartbeat();
        qc.invalidateQueries({ queryKey: ["online-players"] });
      } catch {
      }
    }, POLL_HEARTBEAT);
    return () => clearInterval(id);
  }, [ready, actor, qc]);
}
function useCreateMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createMatch(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    }
  });
}
function useJoinMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.joinMatch(matchId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    }
  });
}
function useAcceptWager() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.acceptWager(matchId);
    },
    onSuccess: (_data, matchId) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    }
  });
}
function useLeaveMatch() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.leaveMatch(matchId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["open-matches"] });
    }
  });
}
function useSendChatMessage() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ matchId, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendChatMessage(matchId, message);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match-chat", matchId] });
    }
  });
}
function useMakeChessMove() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ matchId, from, to, promotion }) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeChessMove(matchId, from, to, promotion ?? null);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    }
  });
}
function useMakeDiceRoll() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (matchId) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeDiceRoll(matchId);
    },
    onSuccess: (_data, matchId) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    }
  });
}
function useMakeRPSChoice() {
  const { actor } = useVersusActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ matchId, choice }) => {
      if (!actor) throw new Error("Not connected");
      return actor.makeRPSChoice(matchId, choice);
    },
    onSuccess: (_data, { matchId }) => {
      qc.invalidateQueries({ queryKey: ["match", matchId] });
      qc.invalidateQueries({ queryKey: ["wallet-balance"] });
    }
  });
}
export {
  OnlinePlayersList as O,
  WagerSelector as W,
  useAcceptWager as a,
  useMatch as b,
  useMatchChat as c,
  useOnlinePlayers as d,
  useLeaveMatch as e,
  formatTimestamp as f,
  useMakeChessMove as g,
  useHeartbeat as h,
  useMakeDiceRoll as i,
  useMakeRPSChoice as j,
  useOpenMatches as k,
  useCreateMatch as l,
  useJoinMatch as m,
  useSendChatMessage as u,
  wagerToICP as w
};
