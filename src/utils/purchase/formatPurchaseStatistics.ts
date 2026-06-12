import { formatMoney, NUMBER_LOCALE } from '@/utils/purchase/formatMoney';

/**
 * Formats decimal hours as "Xh Ym". Rounds 60 minutes up to the next hour to avoid
 * floating-point edge cases (e.g. 1.9999h → "2h"). Hour grouping uses NUMBER_LOCALE.
 */
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

/** @example formatIncomePercent(30) => "30%", formatIncomePercent(27.5) => "27.5%" */
export const formatIncomePercent = (percent: number): string => {
  const rounded = Math.round(percent * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
};

/** Opportunity-cost gain with leading plus. @example formatInvestmentIncome(226) => "+$226.00" */
export const formatInvestmentIncome = (amount: number): string =>
  formatMoney(amount, { sign: true });

/** @example formatInvestYears(1) => "1 year", formatInvestYears(3) => "3 years" */
export const formatInvestYears = (years: number): string => {
  return years === 1 ? '1 year' : `${years} years`;
};
