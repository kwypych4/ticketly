import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

export type WithPaginationTableType<T> =
  | {
      pagination?: {
        limit: number;
        page: number;
        totalElements: number;
      };
      data?: T[];
    }
  | undefined;

export type TableProps<T> = WithPaginationTableType<T> & {
  isLoading?: boolean;
  setOptions?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => void;
};
