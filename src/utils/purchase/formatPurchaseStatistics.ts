export const formatWorkHours = (hours: number): string => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours}h`;
  }

  return `${wholeHours}h ${minutes}m`;
};

export const formatIncomePercent = (percent: number): string => {
  const rounded = Math.round(percent * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
};

export const formatInvestmentIncome = (amount: number): string => {
  return `+$${Math.round(amount).toLocaleString('en-US')}`;
};

export const formatInvestYears = (years: number): string => {
  return years === 1 ? '1 year' : `${years} years`;
};
