import type { Client } from "@entities/client";

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
  clients: Client[];
  pagination: ClientsPaginationData;
}
