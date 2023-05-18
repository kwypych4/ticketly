import humanizeDuration, { Options } from 'humanize-duration';

export const convertMinutes = (minutes: number) => {
  const timeConvertOptions: Options = { units: ['d', 'h', 'm'], largest: 2 };

  return humanizeDuration(minutes * 60000, timeConvertOptions);
};
