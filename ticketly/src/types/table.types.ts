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
  setOptions?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    // TODO: Check if T is correct type - there was any type
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => void;
};
