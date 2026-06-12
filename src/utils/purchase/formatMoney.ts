/** Single locale switch for all currency and large-number grouping in the app. */
export const NUMBER_LOCALE = 'en-US';

const moneyFmt = new Intl.NumberFormat(NUMBER_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats USD with grouping and two decimals. `sign: true` prefixes gains with "+". @example formatMoney(1100) => "$1,100.00" */
export const formatMoney = (value: number, opts: { sign?: boolean } = {}): string => {
  const num = moneyFmt.format(Math.abs(value));
  const sign = value < 0 ? '-' : opts.sign ? '+' : '';

  return `${sign}$${num}`;
};
