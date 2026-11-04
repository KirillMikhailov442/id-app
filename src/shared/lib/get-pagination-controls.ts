import type { PaginationMeta } from "../types";

export const getPaginationControls = ({ offset, limit, total }: PaginationMeta) => {
  const nextOffset = offset + limit;

  return {
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.max(1, Math.ceil(total / limit)),
    previousOffset: Math.max(0, offset - limit),
    nextOffset,
    canGoPrevious: offset > 0,
    canGoNext: nextOffset < total,
  };
};
