export type ResponseWithPagination<T> = {
  pagination: {
    page: number;
    totalElements: number;
    limit: number;
  };
  data: T;
};
