import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, C as Coins, B as Button } from "./index-CH_7_uSw.js";
import { Z as Zap } from "./zap-C_EsuE56.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
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
      className: "flex flex-col items-center justify-center min-h-[80vh] px-4",
      "data-ocid": "login-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight", children: [
            "Welcome to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ICP Casino" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "The decentralized casino on the Internet Computer. Sign in with Internet Identity to start playing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: login,
            disabled: isLoggingIn,
            className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg transition-smooth mb-12",
            "data-ocid": "hero-login-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
              isLoggingIn ? "Connecting to Internet Identity…" : "Sign in with Internet Identity"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-5 text-center shadow-card hover:border-primary/40 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1.5 text-sm", children: f.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.description })
            ]
          },
          f.title
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-xs text-muted-foreground text-center max-w-sm", children: "By signing in, you agree to our Terms of Service and Privacy Policy. Play responsibly. 18+ only." })
      ]
    }
  );
}
export {
  LoginPage as default
};
