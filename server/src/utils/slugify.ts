/* eslint-disable no-useless-escape */
export const slugify = (text: string) =>
  text.toString().toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
