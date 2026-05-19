export interface BaseResponseInterface<T> {
  code: number;
  status: string;
  message?: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export type SortOrder = 'asc' | 'desc';

export interface SortParams<TSortField extends string = string> {
  sort?: TSortField;
  order?: SortOrder;
}
