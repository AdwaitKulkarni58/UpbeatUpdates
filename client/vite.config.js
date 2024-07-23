import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl = "https://upbeatupdates.onrender.com";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    proxy: {
      "/users": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
