export interface IPaginationResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
  hasMore: boolean;
}
