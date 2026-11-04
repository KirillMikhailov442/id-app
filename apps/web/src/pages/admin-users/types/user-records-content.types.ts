export interface UserRecordsPaginationData {
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

export interface UserRecordsContent<TRecord> {
  items: TRecord[];
  pagination: UserRecordsPaginationData;
}
