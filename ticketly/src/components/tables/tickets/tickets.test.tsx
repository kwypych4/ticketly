import { renderTable, screen } from 'utils';
import { describe, expect, test } from 'vitest';

import { TicketsTable } from '.';
import { columns } from './tickets.data';

const data = {
  pagination: {
    totalElements: 2,
    limit: 13,
    page: 1,
  },
  data: [
    {
      id: '648da26cd0154e2030ff1fb2',
      ownerId: '648d9430f494ad396ebdabb8',
      ownerName: 'Test Test',
      title: 'Ticket test',
      timeSpent: 1233,
      status: 'new',
      created: '2023-06-17T11:23:46.537Z',
      updated: '2023-06-17T11:23:46.538Z',
      finished: '1970-01-01T00:00:00.000Z',
    },
  ],
};
describe('tickets table renders correctly', () => {
  test('columns are rendering correctly', () => {
    renderTable(<TicketsTable />, { tableData: data });

    const colsTitles = columns.map(({ title }) => title);

    const titlesFromScreen = screen.getAllByRole('columnheader').map((element) => element.textContent);

    const areTitlesCorrect = colsTitles.every((title) => titlesFromScreen.includes(String(title)));

    expect(areTitlesCorrect).toBeTruthy();
  });
});
