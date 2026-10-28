import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

interface SkeletonProps extends ComponentProps<"div"> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted motion-reduce:animate-none", className)}
    data-slot="skeleton"
    {...props}
  />
);
