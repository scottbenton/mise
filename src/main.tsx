import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/major-mono-display";
import { AppProviders } from "./providers/AppProviders.tsx";
import { registerSW } from "virtual:pwa-register";

const intervalMS = 60 * 1000;
registerSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return;

        if ("connection" in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) await r.update();
      }, intervalMS);
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
