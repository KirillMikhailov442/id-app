import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

interface SwitchProps extends Omit<ComponentProps<"input">, "type" | "role" | "onChange"> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = ({ className, onCheckedChange, ...props }: SwitchProps) => (
  <input
    {...props}
    className={cn(
      "relative inline-block h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-input p-0 align-middle outline-none transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:content-[''] checked:bg-primary checked:after:translate-x-4 checked:after:bg-primary-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    data-slot="switch"
    onChange={(event) => onCheckedChange?.(event.target.checked)}
    role="switch"
    type="checkbox"
  />
);
