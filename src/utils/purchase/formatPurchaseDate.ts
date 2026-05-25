export const formatPurchaseDate = (dateValue: string): string => {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
