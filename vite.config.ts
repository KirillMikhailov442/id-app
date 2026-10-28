import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const DEV_PORT_FALLBACK = 3000;
const PREVIEW_PORT_FALLBACK = 3001;
const API_PROXY_PATH = "/api";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const proxy = env.API_URL
    ? { [API_PROXY_PATH]: { target: env.API_URL, changeOrigin: true, cookieDomainRewrite: "" } }
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
          navigateFallbackDenylist: [/^\/api(?:\/|$)/],
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
