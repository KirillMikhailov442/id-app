import { useLayoutEffect, useRef } from "react";

export const useModalExit = (open: boolean, onExitComplete?: () => void) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (open || onExitComplete === undefined) return;

    let cancelled = false;
    const animations = contentRef.current?.getAnimations() ?? [];

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (!cancelled) onExitComplete();
    });

    return () => {
      cancelled = true;
    };
  }, [open, onExitComplete]);

  return contentRef;
};
