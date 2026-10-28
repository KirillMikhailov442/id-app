import type { ConnectedApp } from "../types";

export const DEMO_CONNECTED_APPS: readonly ConnectedApp[] = [
  { id: "demo-example", name: "Example App", connectedAt: "2026-10-20", permissions: ["profile", "email"] },
  { id: "demo-notes", name: "Notes", connectedAt: "2026-09-02", permissions: ["profile"] },
  { id: "demo-tasks", name: "Task Board", connectedAt: "2026-08-14", permissions: ["profile", "email", "identifier"] },
];
