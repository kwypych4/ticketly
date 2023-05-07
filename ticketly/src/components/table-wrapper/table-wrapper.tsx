import { TableProps } from 'antd';
import { cloneElement, Dispatch, SetStateAction } from 'react';
import { PageItem } from 'styles';
import { RequestParamsType, WithPaginationTableType } from 'types';

type TableWrapperProps = {
  children: JSX.Element;
  setOptions: Dispatch<SetStateAction<RequestParamsType | undefined>>;
  data: WithPaginationTableType<any>;
};

export const TableWrapper = ({ children, setOptions, data }: TableWrapperProps) => {
  const handleTableChange: TableProps<string>['onChange'] = (pagination, filters, sorter) => {
    const params: RequestParamsType = {
      ...(pagination.current && { page: pagination.current, limit: pagination.pageSize }),
      ...('field' in sorter && 'order' in sorter && sorter.order && { sort: `${sorter.field}:${sorter.order}` }),
    };
    if (filters)
      Object.entries(filters)
        .filter(([_, val]) => val !== null)
        .forEach(([key, val]) => {
          params[key] = val;
        });
    setOptions(params);
  };

  const childrenWithProps = cloneElement(children, {
    setOptions: handleTableChange,
    data: data?.data,
    pagination: data?.pagination,
  });

  return (
    <PageItem>
      <h3>hello</h3>
      {childrenWithProps}
    </PageItem>
  );
};
