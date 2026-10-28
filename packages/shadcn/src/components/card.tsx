import type { ComponentProps } from "react";

import { cn } from "../lib/utils";

interface CardProps extends ComponentProps<"div"> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className)}
      data-slot="card"
      {...props}
    />
  );
};

interface CardHeaderProps extends ComponentProps<"div"> {}

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return <div className={cn("flex flex-col gap-1.5 px-6", className)} data-slot="card-header" {...props} />;
};

interface CardTitleProps extends ComponentProps<"div"> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return <div className={cn("leading-none font-semibold", className)} data-slot="card-title" {...props} />;
};

interface CardDescriptionProps extends ComponentProps<"div"> {}

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return <div className={cn("text-muted-foreground text-sm", className)} data-slot="card-description" {...props} />;
};

interface CardContentProps extends ComponentProps<"div"> {}

const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={cn("px-6", className)} data-slot="card-content" {...props} />;
};

interface CardFooterProps extends ComponentProps<"div"> {}

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return <div className={cn("flex items-center px-6", className)} data-slot="card-footer" {...props} />;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
