import { AppRoute } from "@shared/config";

import { screenshotClient, screenshotUser } from "./screenshot-data";

const consentSearch = new URLSearchParams({
  client_id: screenshotClient.id,
  scope: screenshotClient.scopes.join(" "),
  redirect_uri: `${screenshotClient.location ?? ""}/callback`,
  state: "screenshot-state",
});

export const pageCases = [
  { name: "login", path: AppRoute.Login, ready: "Sign in", session: "guest" },
  { name: "register", path: AppRoute.Register, ready: "Create account", session: "guest" },
  { name: "blocked", path: AppRoute.Blocked, ready: "Your account is blocked", session: "guest" },
  { name: "not-found", path: "/page-does-not-exist", ready: "404 — Page not found", session: "guest" },
  { name: "network-error", path: AppRoute.Login, ready: "Server unavailable", session: "network-error" },
  { name: "profile", path: AppRoute.Main, ready: "Morgan Alice", session: "user" },
  {
    name: "consent",
    path: `${AppRoute.Consent}?${consentSearch}`,
    ready: `“${screenshotClient.name}” wants access to your data`,
    session: "user",
  },
  { name: "security", path: AppRoute.Security, ready: "Chrome Desktop · macOS", session: "user" },
  { name: "security-empty", path: AppRoute.Security, ready: "No active sessions.", session: "user", empty: true },
  { name: "apps", path: AppRoute.Apps, ready: screenshotClient.name, session: "user" },
  { name: "apps-empty", path: AppRoute.Apps, ready: "No connected apps yet", session: "user", empty: true },
  { name: "clients", path: AppRoute.Clients, ready: screenshotClient.name, session: "user" },
  { name: "clients-empty", path: AppRoute.Clients, ready: "No clients yet", session: "user", empty: true },
  { name: "admin-users", path: AppRoute.AdminUsers, ready: screenshotUser.email, session: "admin" },
  { name: "admin-users-empty", path: AppRoute.AdminUsers, ready: "No users yet", session: "admin", empty: true },
  { name: "admin-clients", path: AppRoute.AdminClients, ready: screenshotClient.name, session: "admin" },
  { name: "admin-clients-empty", path: AppRoute.AdminClients, ready: "No clients yet", session: "admin", empty: true },
] as const;
