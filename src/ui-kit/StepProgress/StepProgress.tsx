import clsx from 'clsx';

import styles from './StepProgress.module.scss';

interface StepProgressProps {
  total: number;
  current: number;
  className?: string;
}

export const StepProgress = ({ total, current, className }: StepProgressProps) => {
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.min(Math.max(1, current), safeTotal);

  return (
    <div className={clsx(styles.progress, className)}>
      <div className={styles.dots}>
        {Array.from({ length: safeTotal }, (_, index) => (
          <span
            key={index}
            className={clsx(styles.dot, {
              [styles.active]: index + 1 === safeCurrent,
            })}
          />
        ))}
      </div>

      <span className={styles.counter}>
        {safeCurrent} / {safeTotal}
      </span>
    </div>
  );
};

export type { StepProgressProps };
