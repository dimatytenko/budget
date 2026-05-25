export const formatTimerLeft = (decisionEndsAt: string | null): string | null => {
  if (!decisionEndsAt) return null;

  const remaining = Math.max(new Date(decisionEndsAt).getTime() - Date.now(), 0);

  if (remaining === 0) {
    return '0:00 left';
  }

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);

  return `${hours}:${String(minutes).padStart(2, '0')} left`;
};
