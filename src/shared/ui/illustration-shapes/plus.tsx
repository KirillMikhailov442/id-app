import type { FC } from "react";

import { outlineStyle } from "./outline";

interface PlusProps {
  x: number;
  y: number;
  size: number;
}

const PLUS_PATH = "M0-9V9M-9 0H9";

export const Plus: FC<PlusProps> = ({ x, y, size }) => {
  const scale = size / 24;

  return (
    <path
      d={PLUS_PATH}
      fill="none"
      style={outlineStyle(4)}
      transform={`translate(${x + size / 2} ${y + size / 2}) scale(${scale})`}
    />
  );
};
