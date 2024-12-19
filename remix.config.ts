// remix.config.ts
import type { AppLoadContext } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

export default {
  tailwind: true,
  postcss: true,
  rootDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  serverEntryPoint: "entry.server.tsx",
  clientEntryPoint: "entry.client.tsx",
  future: {
    unstable_tailwind: true,
  },
  serverModuleFormat: "cjs",
};
