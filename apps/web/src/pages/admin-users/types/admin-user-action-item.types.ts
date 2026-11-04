import type { LucideIcon } from "lucide-react";

export interface AdminUserActionItem {
  id: string;
  title: string;
  icon: LucideIcon;
  onSelect: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
}
