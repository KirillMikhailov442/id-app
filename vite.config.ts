import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

import { captureOAuthCallback } from "./e2e/commands/capture-oauth-callback.ts";
import { mockTokenRefresh } from "./e2e/commands/mock-token-refresh.ts";

const DEV_PORT_FALLBACK = 3000;
const PREVIEW_PORT_FALLBACK = 3001;
const API_PROXY_PATH = "/api";
const ASSETS_PROXY_PATH = "/assets";
const BUILD_ASSETS_DIR = "static";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const proxy = env.API_URL
    ? {
        [API_PROXY_PATH]: { target: env.API_URL, changeOrigin: true, cookieDomainRewrite: "" },
        [ASSETS_PROXY_PATH]: { target: env.API_URL, changeOrigin: true },
      }
    : undefined;

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        manifest: false,
        injectRegister: false,
        includeAssets: [
          "site.webmanifest",
          "apple-touch-icon.png",
          "favicon.ico",
          "*-icon-*.png",
          "android-chrome-*.png",
        ],
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,woff,woff2}"],
          cleanupOutdatedCaches: true,
          navigateFallback: "index.html",
          navigateFallbackDenylist: [/^\/api(?:\/|$)/, /^\/assets(?:\/|$)/],
          runtimeCaching: [],
        },
      }),
    ],
    resolve: {
      alias: {
        "@app": new URL("./src/app", import.meta.url).pathname,
        "@pages": new URL("./src/pages", import.meta.url).pathname,
        "@widgets": new URL("./src/widgets", import.meta.url).pathname,
        "@features": new URL("./src/features", import.meta.url).pathname,
        "@entities": new URL("./src/entities", import.meta.url).pathname,
        "@shared": new URL("./src/shared", import.meta.url).pathname,
      },
    },
    test: {
      projects: [
        { extends: true, test: { name: "unit", include: ["src/**/*.unit.test.ts"] } },
        {
          extends: true,
          test: {
            name: "browser",
            include: ["e2e/**/*.browser.test.tsx"],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              commands: { captureOAuthCallback, mockTokenRefresh },
              instances: [{ browser: "chromium" }],
              expect: {
                toMatchScreenshot: {
                  screenshotDirectory: fileURLToPath(new URL("./tests/screenshots", import.meta.url)),
                },
              },
            },
          },
        },
      ],
    },
    build: {
      assetsDir: BUILD_ASSETS_DIR,
    },
    server: {
      port: Number(env.DEV_PORT) || DEV_PORT_FALLBACK,
      proxy,
    },
    preview: {
      port: Number(env.PREVIEW_PORT) || PREVIEW_PORT_FALLBACK,
      proxy,
    },
  };
});
