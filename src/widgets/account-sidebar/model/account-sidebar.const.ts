import { Grid2X2, KeyRound, ShieldCheck, UserRound } from "lucide-react";

import { AppRoute } from "@shared/config";

export const ACCOUNT_NAVIGATION = [
  { to: AppRoute.Main, label: "account.profile", icon: UserRound },
  { to: AppRoute.Security, label: "account.security", icon: ShieldCheck },
  { to: AppRoute.Apps, label: "account.apps", icon: Grid2X2 },
  { to: AppRoute.Clients, label: "account.clients", icon: KeyRound },
] as const;
