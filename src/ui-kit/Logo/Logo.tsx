import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { LogoIcon } from '@/assets/icons';
import { routes } from '@/constants/routes';

import styles from './Logo.module.scss';

interface LogoProps {
  withText?: boolean;
  text?: string;
  className?: string;
  linkToDashboard?: boolean;
}

export const Logo = ({
  withText = true,
  text = 'Worthy',
  className,
  linkToDashboard = false,
}: LogoProps) => {
  const content = (
    <>
      <LogoIcon className={styles.icon} />
      {withText && <span className={styles.text}>{text}</span>}
    </>
  );

  if (linkToDashboard) {
    return (
      <Link to={routes.dashboard} className={clsx(styles.logo, className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={clsx(styles.logo, className)}>
      {content}
    </div>
  );
};

export type { LogoProps };
