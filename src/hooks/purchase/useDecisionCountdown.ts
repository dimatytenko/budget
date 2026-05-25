import { useEffect, useState } from 'react';

interface DecisionCountdown {
  formatted: string;
  progress: number;
  isExpired: boolean;
}

const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
};

export const useDecisionCountdown = (
  decisionEndsAt: string | null,
  createdAt: string | null,
): DecisionCountdown => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!decisionEndsAt) return;

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [decisionEndsAt]);

  if (!decisionEndsAt) {
    return {
      formatted: '--:--:--',
      progress: 0,
      isExpired: false,
    };
  }

  const endTime = new Date(decisionEndsAt).getTime();
  const startTime = createdAt ? new Date(createdAt).getTime() : endTime;
  const totalDuration = Math.max(endTime - startTime, 1);
  const remaining = Math.max(endTime - now, 0);
  const elapsed = Math.min(totalDuration, totalDuration - remaining);

  return {
    formatted: formatDuration(remaining),
    progress: Math.min(100, (elapsed / totalDuration) * 100),
    isExpired: remaining === 0,
  };
};
