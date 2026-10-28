import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@app/app";
import { registerServiceWorker } from "@app/pwa";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

void registerServiceWorker();
