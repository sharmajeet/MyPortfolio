import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // Forward API calls to the backend in dev, so the frontend can use relative /api (no CORS).
      proxy: {
        "/api": {
          target: env.VITE_DEV_API_PROXY || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  };
});
