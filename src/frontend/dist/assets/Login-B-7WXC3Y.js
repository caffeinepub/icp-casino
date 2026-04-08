import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, C as Coins, B as Button, Z as Zap } from "./index-l8klBg70.js";
import { T as Trophy } from "./trophy-B2KmoSBf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const FEATURES = [
  {
    icon: Shield,
    title: "Secure by design",
    description: "Powered by Internet Identity — your keys, your account."
  },
  {
    icon: Zap,
    title: "Instant payouts",
    description: "Winnings settle directly to your ICP wallet in seconds."
  },
  {
    icon: Trophy,
    title: "Provably fair",
    description: "Every game result is verifiable on-chain."
  }
];
function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden",
      style: {
        background: "radial-gradient(ellipse at 50% 35%, oklch(0.18 0.06 300 / 0.80) 0%, oklch(0.10 0.03 300 / 0.50) 40%, oklch(0.05 0 0) 80%)"
      },
      "data-ocid": "login-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(ellipse at 50% 50%, transparent 30%, oklch(0 0 0 / 0.70) 100%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full",
            style: {
              background: "radial-gradient(circle, oklch(0.72 0.18 65 / 0.08) 0%, transparent 70%)",
              filter: "blur(40px)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card w-full rounded-3xl p-10 flex flex-col items-center relative overflow-hidden",
              style: {
                boxShadow: "var(--shadow-xl), 0 0 64px oklch(0.72 0.18 65 / 0.15)",
                borderColor: "oklch(0.72 0.18 65 / 0.30)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cinematic-top-light", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-3 left-3 w-6 h-6 pointer-events-none",
                    style: {
                      borderTop: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderLeft: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRadius: "4px 0 0 0"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-3 right-3 w-6 h-6 pointer-events-none",
                    style: {
                      borderTop: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRight: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRadius: "0 4px 0 0"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute bottom-3 left-3 w-6 h-6 pointer-events-none",
                    style: {
                      borderBottom: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderLeft: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRadius: "0 0 0 4px"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute bottom-3 right-3 w-6 h-6 pointer-events-none",
                    style: {
                      borderBottom: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRight: "2px solid oklch(0.72 0.18 65 / 0.60)",
                      borderRadius: "0 0 4px 0"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-6 shadow-xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.72 0.18 65 / 0.25), oklch(0.55 0.18 300 / 0.20))",
                      border: "1px solid oklch(0.72 0.18 65 / 0.45)",
                      padding: "1rem"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Coins,
                      {
                        className: "w-9 h-9",
                        style: { color: "oklch(0.82 0.18 65)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "heading-cinematic text-gold-glow font-display text-4xl md:text-5xl font-bold text-center mb-3 leading-tight",
                    style: { color: "oklch(0.88 0.18 65)" },
                    children: "ICP Casino"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-premium text-center text-base mb-8 leading-relaxed",
                    style: { color: "oklch(0.65 0.05 300)" },
                    children: [
                      "The decentralized casino on the Internet Computer.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Sign in to start playing."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    onClick: login,
                    disabled: isLoggingIn,
                    className: "gap-2.5 btn-premium w-full py-6 text-base font-bold rounded-xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.18 65))",
                      color: "oklch(0.07 0 0)",
                      border: "none",
                      boxShadow: "0 6px 24px oklch(0.72 0.18 65 / 0.40), 0 2px 8px oklch(0 0 0 / 0.50)"
                    },
                    "data-ocid": "hero-login-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
                      isLoggingIn ? "Connecting to Internet Identity…" : "Sign in with Internet Identity"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-6 text-xs text-center",
                    style: { color: "oklch(0.45 0.02 65)" },
                    children: "By signing in, you agree to our Terms of Service. Play responsibly. 18+ only."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mt-10", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card card-shimmer rounded-xl p-5 text-center transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3",
                    style: {
                      background: "oklch(0.72 0.18 65 / 0.15)",
                      border: "1px solid oklch(0.72 0.18 65 / 0.30)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      f.icon,
                      {
                        className: "w-5 h-5",
                        style: { color: "oklch(0.82 0.18 65)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-semibold mb-1.5 text-sm",
                    style: { color: "oklch(0.88 0.02 65)" },
                    children: f.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.description })
              ]
            },
            f.title
          )) })
        ] })
      ]
    }
  );
}
export {
  LoginPage as default
};
