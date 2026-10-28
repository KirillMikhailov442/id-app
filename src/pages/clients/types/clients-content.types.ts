import type { ClientWithScopes } from "@entities/client";

export interface ClientsPaginationData {
  label: string;
  pageLabel: string;
  totalLabel: string;
  previousLabel: string;
  nextLabel: string;
  previousOffset: number;
  nextOffset: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export interface ClientsContentData {
  clients: ClientWithScopes[];
  title: string;
  description: string;
  createLabel: string;
  pagination: ClientsPaginationData;
}
