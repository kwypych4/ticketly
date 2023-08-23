import { convertMinutes, renderTable, screen } from 'utils';
import { describe, expect, test } from 'vitest';

import { TicketsTable } from '.';
import { columns } from './tickets.config';
import { mockData } from './tickets.mocks';

describe('tickets table renders correctly', () => {
  test('columns are rendering correctly', () => {
    renderTable(<TicketsTable />, { tableData: mockData });

    const colsTitles = columns.map(({ title }) => title);

    const titlesFromScreen = screen.getAllByRole('columnheader').map((element) => element.textContent);

    const areTitlesCorrect = colsTitles.every((title) => titlesFromScreen.includes(String(title)));

    expect(areTitlesCorrect).toBeTruthy();
  });

  test('rows are rendering correctly', () => {
    renderTable(<TicketsTable />, { tableData: mockData });

    const rows = screen.getAllByRole('row');

    const mockDataLength = mockData.data?.length;

    expect(mockDataLength === rows.length).toBeTruthy();

    const assignedEngineer = mockData.data?.[0].engineer ? mockData.data[0].engineer : 'Not assigned';
    const ownerName = mockData.data?.[0].ownerName;
    const title = mockData.data?.[0].title;
    const timeSpent = convertMinutes(mockData.data?.[0].timeSpent || 0);
    const status =
      String(mockData.data?.[0].status)[0].toLocaleUpperCase() + String(mockData.data?.[0].status).slice(1);

    const firstRowFromMock = `${ownerName}${title}${assignedEngineer}${timeSpent}${status}`;
    const firstRowFromScreen = rows[1].textContent;

    expect(firstRowFromMock === firstRowFromScreen).toBeTruthy();
  });
});
