/* eslint-disable import/no-extraneous-dependencies */
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { TableWrapper } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestParamsType, WithPaginationTableType } from 'types';

const routerRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

type TableRenderOptionsType = (Omit<RenderOptions, 'queries'> | undefined) & {
  tableData: WithPaginationTableType<any>;
  isLoading?: boolean;
};

export const renderTable = (ui: React.ReactElement, options: TableRenderOptionsType): RenderResult => {
  return render(ui, {
    wrapper: () =>
      BrowserRouter({
        children: TableWrapper({
          data: options.tableData,
          children: ui,
          setOptions: {} as Dispatch<SetStateAction<RequestParamsType>>,
          isLoading: options?.isLoading || false,
        }),
      }),
    ...options,
  });
};

export * from '@testing-library/react';
export { routerRender as render };
