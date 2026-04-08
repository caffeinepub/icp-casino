var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { f as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, i as useQueryClient, r as reactExports, k as noop, l as shouldThrowError, c as createLucideIcon, b as useActor, m as useWallet, d as useQuery, j as jsxRuntimeExports, B as Button, S as Skeleton, C as Coins, o as formatICP, I as Input, G as GameCategory, e as createActor } from "./index-CH_7_uSw.js";
import { g as getGameImage, i as isPicsumUrl, T as TrendingUp, U as Users } from "./gameImages-ChVxEWHA.js";
import { Z as Zap } from "./zap-C_EsuE56.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const E8S_PER_ICP = 100000000n;
const PRESET_BETS = [
  { label: "1 ICP", value: 1n * E8S_PER_ICP },
  { label: "5 ICP", value: 5n * E8S_PER_ICP },
  { label: "10 ICP", value: 10n * E8S_PER_ICP },
  { label: "25 ICP", value: 25n * E8S_PER_ICP },
  { label: "100 ICP", value: 100n * E8S_PER_ICP }
];
const MIN_BET_E8S = 1000000n;
const CATEGORY_BADGE = {
  [GameCategory.Slots]: "badge-cyan",
  [GameCategory.TableGames]: "badge-magenta",
  [GameCategory.CardGames]: "badge-lime"
};
const CATEGORY_LABEL = {
  [GameCategory.Slots]: "Slots",
  [GameCategory.TableGames]: "Table Games",
  [GameCategory.CardGames]: "Card Games"
};
function icpToE8s(icp) {
  const n = Number.parseFloat(icp);
  if (Number.isNaN(n) || n <= 0) return null;
  return BigInt(Math.round(n * 1e8));
}
function e8sToIcpStr(e8s) {
  return (Number(e8s) / 1e8).toString();
}
function GameHeaderSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[21/9] w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 rounded" })
    ] })
  ] });
}
function StatBadge({
  icon,
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-2 px-3 py-2 rounded-lg border ${highlight ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-muted-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide opacity-70", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm font-bold font-mono ${highlight ? "text-primary" : "text-foreground"}`,
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function GameCanvas({ outcome }) {
  if (outcome.status === "idle") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl animate-bounce", children: "🎰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Select a bet amount and press Launch Game" })
    ] });
  }
  if (outcome.status === "spinning") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["🍋", "🔔", "⭐", "💎", "🎰"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14 bg-card border border-border rounded-lg flex items-center justify-center text-2xl animate-pulse",
          style: {
            animationDelay: `${Math.random() * 0.4}s`
          },
          children: emoji
        },
        emoji
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold animate-pulse", children: "Spinning the reels…" })
    ] });
  }
  const isWin = outcome.status === "won";
  const tx = outcome.tx;
  const amountStr = `${formatICP(tx.netAmount < 0n ? -tx.netAmount : tx.netAmount)} ICP`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-6xl ${isWin ? "animate-bounce" : ""}`, children: isWin ? "🎉" : "😔" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: `font-display text-2xl font-bold mb-1 ${isWin ? "text-win" : "text-loss"}`,
          children: isWin ? "You Won!" : "Better luck next time!"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isWin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-win font-semibold", children: [
          "+",
          amountStr
        ] }),
        " added to your wallet"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-loss font-semibold", children: [
          "-",
          amountStr
        ] }),
        " ",
        "deducted from your wallet"
      ] }) })
    ] }),
    isWin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 text-primary text-xs font-semibold uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
      " Jackpot winner"
    ] })
  ] });
}
function GameDetail({ gameId, onBack }) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { balance, isLoading: walletLoading } = useWallet();
  const [selectedBet, setSelectedBet] = reactExports.useState(PRESET_BETS[0].value);
  const [customInput, setCustomInput] = reactExports.useState("");
  const [customError, setCustomError] = reactExports.useState("");
  const [outcome, setOutcome] = reactExports.useState({ status: "idle" });
  const { data: game, isLoading: gameLoading } = useQuery({
    queryKey: ["game", gameId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGame(gameId);
    },
    enabled: !!actor && !isFetching
  });
  const betMutation = useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeBet(req);
    },
    onMutate: () => {
      setOutcome({ status: "spinning" });
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        const tx = result.ok;
        const isWin = tx.netAmount >= 0n;
        setOutcome({ status: isWin ? "won" : "lost", tx });
        queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      } else {
        setOutcome({ status: "idle" });
      }
    },
    onError: () => {
      setOutcome({ status: "idle" });
    }
  });
  const activeBet = customInput ? icpToE8s(customInput) ?? selectedBet : selectedBet;
  function handlePresetBet(value) {
    setSelectedBet(value);
    setCustomInput("");
    setCustomError("");
  }
  function handleCustomChange(val) {
    setCustomInput(val);
    setCustomError("");
    const e8s = icpToE8s(val);
    if (val && !e8s) {
      setCustomError("Enter a valid ICP amount");
    } else if (e8s && e8s < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
    } else if (e8s && e8s > balance) {
      setCustomError("Exceeds your wallet balance");
    }
  }
  function handleLaunch() {
    const betAmount = activeBet;
    if (betAmount < MIN_BET_E8S) {
      setCustomError("Minimum bet is 0.01 ICP");
      return;
    }
    if (betAmount > balance) {
      setCustomError("Exceeds your wallet balance");
      return;
    }
    betMutation.mutate({ gameId, betAmount });
  }
  const isLaunching = betMutation.isPending || outcome.status === "spinning";
  const betError = customError || (activeBet > balance && balance > 0n ? "Exceeds your wallet balance" : "");
  if (gameLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-8 max-w-5xl",
        "data-ocid": "game-detail-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-2 mb-6 text-muted-foreground hover:text-foreground",
              onClick: onBack,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to Lobby"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GameHeaderSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid md:grid-cols-5 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-3 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 space-y-3", children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, k)) })
          ] })
        ]
      }
    );
  }
  if (!game) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 max-w-5xl text-center",
        "data-ocid": "game-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-4", children: "Game not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onBack, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Lobby"
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-5xl",
      "data-ocid": "game-detail-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-2 mb-6 text-muted-foreground hover:text-foreground transition-smooth",
            onClick: onBack,
            "data-ocid": "back-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to Lobby"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-card border border-border mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[21/9] md:aspect-[3/1] overflow-hidden", children: [
            (() => {
              const svgImage = getGameImage(Number(game.id));
              const useSvg = svgImage && (!game.imageUrl || isPicsumUrl(game.imageUrl));
              const src = useSvg ? svgImage : game.imageUrl;
              return src ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src,
                  alt: game.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-muted via-secondary to-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-16 h-16 text-primary/40" }) });
            })(),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: CATEGORY_BADGE[game.category], children: CATEGORY_LABEL[game.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-4xl font-bold text-foreground mt-2", children: game.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              label: "RTP",
              value: `${(game.rtp * 100).toFixed(1)}%`,
              highlight: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" }),
              label: "House Edge",
              value: `${(game.houseEdge * 100).toFixed(1)}%`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              label: "Players",
              value: Number(game.playerCount).toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "md:col-span-3 bg-card border border-border rounded-xl overflow-hidden",
              "data-ocid": "game-canvas",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-2.5 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Game Screen" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 md:h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameCanvas, { outcome }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "md:col-span-2 bg-card border border-border rounded-xl p-5 space-y-5",
              "data-ocid": "bet-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg px-4 py-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Wallet Balance" })
                  ] }),
                  walletLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono font-semibold text-foreground text-sm",
                      "data-ocid": "wallet-balance",
                      children: [
                        formatICP(balance),
                        " ICP"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5", children: "Select Bet Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: PRESET_BETS.map((preset) => {
                    const isActive = !customInput && selectedBet === preset.value;
                    const isDisabled = preset.value > balance && balance > 0n;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handlePresetBet(preset.value),
                        disabled: isDisabled,
                        "data-ocid": `bet-preset-${preset.label.replace(" ", "-").toLowerCase()}`,
                        className: `py-2 rounded-lg text-xs font-semibold border transition-smooth ${isActive ? "bg-primary text-primary-foreground border-primary shadow-md" : isDisabled ? "bg-muted/20 border-border text-muted-foreground/40 cursor-not-allowed" : "bg-muted/40 border-border text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"}`,
                        children: preset.label
                      },
                      preset.label
                    );
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "custom-bet",
                      className: "text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2",
                      children: "Custom Amount (ICP)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "custom-bet",
                      type: "number",
                      min: "0.01",
                      step: "0.01",
                      placeholder: `e.g. ${e8sToIcpStr(selectedBet)}`,
                      value: customInput,
                      onChange: (e) => handleCustomChange(e.target.value),
                      className: "bg-input border-border font-mono text-sm",
                      "data-ocid": "custom-bet-input"
                    }
                  ),
                  betError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5 font-medium", children: betError })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm border-t border-border pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Placing bet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-primary text-base", children: [
                    formatICP(activeBet),
                    " ICP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md transition-smooth",
                    onClick: handleLaunch,
                    disabled: isLaunching || !!betError || activeBet < MIN_BET_E8S || activeBet > balance,
                    "data-ocid": "launch-game-btn",
                    children: isLaunching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 animate-spin" }),
                      " Spinning…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                      " Launch Game"
                    ] })
                  }
                ),
                (outcome.status === "won" || outcome.status === "lost") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg border p-4 text-center ${outcome.status === "won" ? "bg-win-muted border-win" : "bg-loss-muted border-loss"}`,
                    "data-ocid": "outcome-result",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `font-display font-bold text-lg ${outcome.status === "won" ? "text-win" : "text-loss"}`,
                          children: outcome.status === "won" ? "🎉 You Won!" : "😔 You Lost"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                        "Net:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `font-mono font-semibold ${outcome.status === "won" ? "text-win" : "text-loss"}`,
                            children: [
                              outcome.tx.netAmount >= 0n ? "+" : "",
                              formatICP(outcome.tx.netAmount),
                              " ICP"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "mt-2 text-xs text-muted-foreground hover:text-foreground",
                          onClick: () => setOutcome({ status: "idle" }),
                          "data-ocid": "play-again-btn",
                          children: "Play again"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  GameDetail as default
};
