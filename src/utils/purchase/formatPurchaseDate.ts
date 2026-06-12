/** @example formatPurchaseDate("2026-05-24T10:00:00.000Z") => "24.05.2026" */
export const formatPurchaseDate = (dateValue: string): string => {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
