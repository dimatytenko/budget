import type { PurchaseStatistics } from '@/types/purchase';

export interface PurchaseStatsInput {
  price: number;
  quantity: number;
  salary: number;
  workHoursByWeek: number;
  expectReturnPercentage: number;
  investForYear: number;
}

const round = (value: number, decimals = 2): number =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

/**
 * Computes opportunity-cost statistics for a purchase.
 *
 * Ported 1:1 from the backend `src/helpers/calculatePurchaseStats.js`.
 * Do not change the math — live preview must match persisted server values.
 *
 * @param price - Unit price in USD
 * @param quantity - Number of items
 * @param salary - Monthly income in USD
 * @param workHoursByWeek - Working hours per week
 * @param expectReturnPercentage - Expected annual investment return (%)
 * @param investForYear - Investment horizon in years (compound interest)
 *
 * Formulas:
 * - workHoursToPay = totalPrice / hourlyRate, where hourlyRate = (salary × 12) / (workHoursByWeek × 52)
 * - incomePercent = (totalPrice / salary) × 100
 * - investmentIncome = totalPrice × ((1 + expectReturnPercentage/100)^investForYear − 1)
 *
 * @example
 * calculatePurchaseStats({ price: 1200, quantity: 1, salary: 4000, workHoursByWeek: 40, expectReturnPercentage: 5, investForYear: 1 })
 * // => { workHoursToPay: 52, incomePercent: 30, investmentIncome: 60 }
 */
export const calculatePurchaseStats = ({
  price,
  quantity,
  salary,
  workHoursByWeek,
  expectReturnPercentage,
  investForYear,
}: PurchaseStatsInput): PurchaseStatistics => {
  const totalPrice = price * quantity;
  const annualWorkHours = workHoursByWeek * 52;
  const hourlyRate = annualWorkHours > 0 ? (salary * 12) / annualWorkHours : 0;
  const workHoursToPay = hourlyRate > 0 ? round(totalPrice / hourlyRate) : 0;
  const incomePercent = salary > 0 ? round((totalPrice / salary) * 100) : 0;
  const investmentIncome = round(
    totalPrice * (Math.pow(1 + expectReturnPercentage / 100, investForYear) - 1),
  );

  return { workHoursToPay, incomePercent, investmentIncome };
};
