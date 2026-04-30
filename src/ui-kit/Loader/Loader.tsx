import clsx from 'clsx';

import styles from './Loader.module.scss';

export const PageLoader = () => {
  return (
    <div className={styles.loader}>
      <Loader />
    </div>
  );
};

interface LoaderProps {
  size?: 'default' | 'sm';
}

export const Loader = ({ size = 'default' }: LoaderProps) => {
  return <div className={clsx(styles.spinner, styles[size])}></div>;
};
