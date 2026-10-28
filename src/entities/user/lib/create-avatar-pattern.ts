import {
  AVATAR_GRID_SIZE,
  AVATAR_HASH_MIXER,
  AVATAR_HASH_OFFSET,
  AVATAR_HASH_PRIME,
  AVATAR_HASH_SHIFT,
  AVATAR_HUE_RANGE,
  AVATAR_LIGHTNESS,
  AVATAR_SATURATION,
} from "../model/avatar.const";

const hashSeed = (seed: string): number => {
  let hash = AVATAR_HASH_OFFSET;

  for (const character of seed) {
    hash = Math.imul(hash ^ character.charCodeAt(0), AVATAR_HASH_PRIME);
  }

  hash = Math.imul(hash ^ (hash >>> AVATAR_HASH_SHIFT), AVATAR_HASH_MIXER);
  hash = Math.imul(hash ^ (hash >>> AVATAR_HASH_SHIFT), AVATAR_HASH_MIXER);

  return (hash ^ (hash >>> AVATAR_HASH_SHIFT)) >>> 0;
};

export const createAvatarPattern = (seed: string) => {
  const cells: { x: number; y: number }[] = [];
  const center = Math.floor(AVATAR_GRID_SIZE / 2);

  for (let y = 0; y < AVATAR_GRID_SIZE; y += 1) {
    for (let x = 0; x <= center; x += 1) {
      if (hashSeed(`${seed}:${x}:${y}`) % 2 === 0) {
        cells.push({ x, y });

        const mirroredX = AVATAR_GRID_SIZE - x - 1;

        if (mirroredX !== x) {
          cells.push({ x: mirroredX, y });
        }
      }
    }
  }

  if (cells.length === 0) {
    cells.push({ x: center, y: center });
  }

  return {
    cells,
    color: `hsl(${hashSeed(seed) % AVATAR_HUE_RANGE} ${AVATAR_SATURATION}% ${AVATAR_LIGHTNESS}%)`,
  };
};
