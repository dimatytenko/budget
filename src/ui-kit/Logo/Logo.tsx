import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { LogoIcon } from '@/assets/icons';
import { routes } from '@/constants/routes';

import styles from './Logo.module.scss';

interface LogoProps {
  variantText?: 'desk' | ' mobile' | ' both' | 'none';
  linkToPurchase?: boolean;
  className?: string;
}

export const Logo = ({ variantText = 'none', className, linkToPurchase = false }: LogoProps) => {
  const content = (
    <>
      <LogoIcon className={styles.icon} />
      <span className={clsx(styles.text, styles[variantText])}>Worthy</span>
    </>
  );

  if (linkToPurchase) {
    return (
      <Link to={routes.purchase} className={clsx(styles.logo, className)}>
        {content}
      </Link>
    );
  }

  return <div className={clsx(styles.logo, className)}>{content}</div>;
};

export type { LogoProps };
