import { formatMoney } from '@/utils/purchase/formatMoney';
import { formatWorkHours } from '@/utils/purchase/formatPurchaseStatistics';

export const formatTotalSaved = (value: number): string => formatMoney(value);

export const formatAnnualReturn = (value: number): string => formatMoney(value);

export const formatOverviewWorkHours = (hours: number): string => {
  if (hours <= 0) {
    return '--';
  }

  return formatWorkHours(hours);
};
