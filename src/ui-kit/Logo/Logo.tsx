import clsx from 'clsx';

import { LogoIcon } from '@/assets/icons';

import styles from './Logo.module.scss';

interface LogoProps {
  withText?: boolean;
  text?: string;
  className?: string;
}

export const Logo = ({ withText = true, text = 'Worthy', className }: LogoProps) => {
  return (
    <div className={clsx(styles.logo, className)}>
      <LogoIcon className={styles.icon} />
      {withText && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export type { LogoProps };
