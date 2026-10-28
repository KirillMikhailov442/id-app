export type AppPermission = "profile" | "email" | "identifier";

export interface ConnectedApp {
  id: string;
  name: string;
  connectedAt: string;
  permissions: readonly AppPermission[];
}
