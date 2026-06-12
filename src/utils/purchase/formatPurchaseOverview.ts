import { formatMoney } from '@/utils/purchase/formatMoney';
import { formatWorkHours } from '@/utils/purchase/formatPurchaseStatistics';

/** History overview: total saved from rejected purchases. */
export const formatTotalSaved = (value: number): string => formatMoney(value);

/** History overview: cumulative missed investment return. */
export const formatAnnualReturn = (value: number): string => formatMoney(value);

/** Shows "--" for zero/negative totals so the overview never displays misleading "0h". */
export const formatOverviewWorkHours = (hours: number): string => {
  if (hours <= 0) {
    return '--';
  }

  return formatWorkHours(hours);
};
