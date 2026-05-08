import styles from './Header.module.scss';
import { Logo } from '@/ui-kit';

interface HeaderProps {
  pathname: string;
}

const Header: React.FC<HeaderProps> = ({ pathname }) => {
  console.log('pathname', pathname);
  return (
    <header className={styles.header}>
      <div className={'container'}>
        <div className={styles.content}>
          <Logo linkToDashboard />
        </div>
      </div>
    </header>
  );
};

export default Header;
