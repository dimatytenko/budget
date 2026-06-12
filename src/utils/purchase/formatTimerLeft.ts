export const formatTimerLeft = (decisionEndsAt: string | null): string | null => {
  if (!decisionEndsAt) return null;

  const remaining = Math.max(new Date(decisionEndsAt).getTime() - Date.now(), 0);

  if (remaining === 0) return "Time's up";

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} left`;
};
