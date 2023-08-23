import { rest } from 'msw';
import { TicketsListTypes, WithPaginationTableType } from 'types';
import { apiUrls } from 'urls';

type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: NonNullable<Type[Key]> extends number
    ? string
    : Type[Key] extends object
    ? WithoutNullableKeys<Type[Key]>
    : Type[Key] extends Array<object>
    ? WithoutNullableKeys<Array<Type[Key]>>
    : Type[Key];
};

export const handlers = [
  rest.get(apiUrls.tickets.index(), (_, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
];
