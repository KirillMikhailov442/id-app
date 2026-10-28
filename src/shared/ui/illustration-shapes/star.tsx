import type { FC } from "react";

import { outlineStyle } from "./outline";

interface StarProps {
  x: number;
  y: number;
  size: number;
  fill: string;
}

const STAR_PATH = "M0-17Q3-3 17 0Q3 3 0 17Q-3 3-17 0Q-3-3 0-17Z";

export const Star: FC<StarProps> = ({ x, y, size, fill }) => {
  const scale = size / 40;

  return (
    <path
      d={STAR_PATH}
      fill={fill}
      style={outlineStyle(4)}
      transform={`translate(${x + size / 2} ${y + size / 2}) scale(${scale})`}
    />
  );
};
