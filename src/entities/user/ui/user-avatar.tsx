import { createAvatarPattern } from "../lib/create-avatar-pattern";
import { AVATAR_BACKGROUND, AVATAR_PADDING, AVATAR_VIEWBOX_SIZE } from "../model/avatar.const";

interface UserAvatarProps {
  userId: string;
  className?: string;
}

export const UserAvatar = ({ userId, className }: UserAvatarProps) => {
  const { cells, color } = createAvatarPattern(userId);

  return (
    <svg
      aria-hidden="true"
      className={className}
      height="100%"
      viewBox={`0 0 ${AVATAR_VIEWBOX_SIZE} ${AVATAR_VIEWBOX_SIZE}`}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill={AVATAR_BACKGROUND} height={AVATAR_VIEWBOX_SIZE} width={AVATAR_VIEWBOX_SIZE} />
      <g fill={color}>
        {cells.map(({ x, y }) => (
          <rect key={`${x}:${y}`} height={1} width={1} x={x + AVATAR_PADDING} y={y + AVATAR_PADDING} />
        ))}
      </g>
    </svg>
  );
};
