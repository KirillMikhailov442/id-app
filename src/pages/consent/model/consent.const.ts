import { ContactRound, Mail, UserRound } from "lucide-react";

export const CONSENT_CLIENT = {
  name: "Example App",
  domain: "app.example.com",
} as const;

export const CONSENT_PERMISSIONS = [
  { id: "profile", icon: UserRound },
  { id: "email", icon: Mail },
  { id: "identifier", icon: ContactRound },
] as const;
