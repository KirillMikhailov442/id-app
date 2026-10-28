import { API_PAGE_SIZE } from "@shared/config";
import type { PaginationParams, PaginationResponse } from "@shared/types";

export const fetchAllPages = async <TItem>(
  loadPage: (params: PaginationParams) => Promise<PaginationResponse<TItem>>
): Promise<TItem[]> => {
  const items: TItem[] = [];

  while (true) {
    const page = await loadPage({ limit: API_PAGE_SIZE, offset: items.length });
    items.push(...page.items);

    if (page.items.length === 0 || items.length >= page.meta.total) {
      return items;
    }
  }
};
