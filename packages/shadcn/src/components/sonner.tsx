import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = (props: ToasterProps) => (
  <Sonner
    position="bottom-right"
    toastOptions={{
      classNames: {
        toast: "!border-border !bg-popover !text-popover-foreground !shadow-lg",
      },
    }}
    {...props}
  />
);
