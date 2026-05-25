import { formatWorkHours } from '@/utils/purchase/formatPurchaseStatistics';

export const formatTotalSaved = (value: number): string => {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatAnnualReturn = (value: number): string => {
  return Math.round(value).toLocaleString('en-US');
};

export const formatOverviewWorkHours = (hours: number): string => {
  if (hours <= 0) {
    return '--';
  }

  return formatWorkHours(hours);
};
