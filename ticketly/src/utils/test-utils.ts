/* eslint-disable import/no-extraneous-dependencies */
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { TableWrapper } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestParamsType, WithPaginationTableType } from 'types';

export * from '@testing-library/react';

const routerRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

type TableRenderOptionsType = (Omit<RenderOptions, 'queries'> | undefined) & {
  tableData: WithPaginationTableType<any>;
  setOptions?: Dispatch<SetStateAction<RequestParamsType>>;
  isLoading?: boolean;
};

export const renderTable = (ui: React.ReactElement, options: TableRenderOptionsType): RenderResult => {
  return render(ui, {
    wrapper: () =>
      BrowserRouter({
        children: TableWrapper({
          data: options.tableData,
          children: ui,
          setOptions: options.setOptions || ({} as any),
          isLoading: options?.isLoading || false,
        }),
      }),
    ...options,
  });
};

export { routerRender as render };
