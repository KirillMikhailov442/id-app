import type { ComponentProps } from "react";
import { X } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../lib/utils";

const Drawer = DrawerPrimitive.Root;
const DrawerTitle = DrawerPrimitive.Title;
const DrawerDescription = DrawerPrimitive.Description;

interface DrawerContentProps extends ComponentProps<typeof DrawerPrimitive.Content> {
  closeLabel: string;
  closeDisabled?: boolean;
}

const DrawerContent = ({ children, className, closeLabel, closeDisabled = false, ...props }: DrawerContentProps) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" data-slot="drawer-overlay" />
    <DrawerPrimitive.Content
      className={cn(
        "bg-background fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl border border-b-0 shadow-lg outline-none",
        className
      )}
      data-slot="drawer-content"
      {...props}
    >
      <DrawerPrimitive.Handle className="bg-muted mx-auto mt-3 mb-1 h-1.5 w-10 shrink-0 rounded-full" />
      {children}
      <DrawerPrimitive.Close
        aria-label={closeLabel}
        className="focus-visible:ring-ring absolute top-4 right-3 flex size-11 items-center justify-center rounded-md opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        disabled={closeDisabled}
        type="button"
      >
        <X aria-hidden="true" className="size-4" />
      </DrawerPrimitive.Close>
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
);

export { Drawer, DrawerContent, DrawerTitle, DrawerDescription };
