export const NUMBER_LOCALE = 'en-US';

const moneyFmt = new Intl.NumberFormat(NUMBER_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (value: number, opts: { sign?: boolean } = {}): string => {
  const num = moneyFmt.format(Math.abs(value));
  const sign = value < 0 ? '-' : opts.sign ? '+' : '';

  return `${sign}$${num}`;
};
