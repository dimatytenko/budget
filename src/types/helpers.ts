export interface BaseResponseInterface<T> {
  code: number;
  status: string;
  message?: string;
  data: T;
}

// export interface PaginationParamsInterface {
//   page?: number;
//   limit?: number;
// }
