import { FilterValue, SorterResult } from 'antd/es/table/interface';

export type RequestParamsType = {
  [key: string]:
    | string
    | number
    | null
    | FilterValue
    | Array<string | null | FilterValue | number | SorterResult<string> | SorterResult<string>[]>
    | SorterResult<string>
    | SorterResult<string>[];
};
