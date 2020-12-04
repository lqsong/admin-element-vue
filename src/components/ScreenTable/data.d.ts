export interface PaginationConfig {
  layout: string;
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number) => void;
}