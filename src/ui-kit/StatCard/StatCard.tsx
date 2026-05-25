import clsx from 'clsx';
import type { ReactNode } from 'react';

import { InfoIcon } from '@/assets/icons';
import { Tooltip } from '@/ui-kit/Tooltip';

import styles from './StatCard.module.scss';

type StatCardVariant =
  | 'saved'
  | 'workHours'
  | 'annualReturn'
  | 'rejected'
  | 'pending'
  | 'bought';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: ReactNode;
  variant: StatCardVariant;
  showInfo?: boolean;
  infoTooltip?: ReactNode;
  className?: string;
}

export const StatCard = ({
  label,
  value,
  unit,
  icon,
  variant,
  showInfo = true,
  infoTooltip,
  className,
}: StatCardProps) => {
  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.content}>
        <div className={styles.label_row}>
          <span className={styles.label}>{label}</span>
          {showInfo ? (
            infoTooltip ? (
              <Tooltip content={infoTooltip}>
                <button type="button" className={styles.info_button} aria-label={`${label} info`}>
                  <InfoIcon aria-hidden className={styles.info_icon} />
                </button>
              </Tooltip>
            ) : (
              <InfoIcon aria-hidden className={styles.info_icon} />
            )
          ) : null}
        </div>

        <p className={clsx(styles.value, value === '--' && styles.valuePlaceholder)}>{value}</p>

        {unit ? <span className={styles.unit}>{unit}</span> : null}
      </div>

      <div className={clsx(styles.icon_wrap, styles[variant])}>{icon}</div>
    </article>
  );
};

export type { StatCardProps, StatCardVariant };
