import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEV_PORT_FALLBACK = 3000;
const PREVIEW_PORT_FALLBACK = 3001;
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
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
    },
    preview: {
      port: Number(env.PREVIEW_PORT) || PREVIEW_PORT_FALLBACK,
    },
  };
});
