import { formatMoney, NUMBER_LOCALE } from '@/utils/purchase/formatMoney';

export const formatWorkHours = (hours: number): string => {
  let wholeHours = Math.floor(hours);
  let minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 60) {
    wholeHours += 1;
    minutes = 0;
  }

  const h = wholeHours.toLocaleString(NUMBER_LOCALE);

  return minutes === 0 ? `${h}h` : `${h}h ${minutes}m`;
};

export const formatIncomePercent = (percent: number): string => {
  const rounded = Math.round(percent * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
};

export const formatInvestmentIncome = (amount: number): string =>
  formatMoney(amount, { sign: true });

export const formatInvestYears = (years: number): string => {
  return years === 1 ? '1 year' : `${years} years`;
};
