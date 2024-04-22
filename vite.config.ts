import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        skipWaiting: true,
      },
      includeAssets: [
        "icon512_rounded.png",
        "icon512_maskable.png",
        "MiseLogo192.png",
      ],
      manifest: {
        name: "Mise",
        short_name: "Mise",
        description: "Mise is an app for organizing your work",
        theme_color: "#0f172a",
        icons: [
          {
            src: "MiseLogo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon512_rounded.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon512_maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
