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
