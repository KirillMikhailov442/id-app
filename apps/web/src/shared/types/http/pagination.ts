export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
}

export interface PaginationResponse<TItem> {
  items: TItem[];
  meta: PaginationMeta;
}
