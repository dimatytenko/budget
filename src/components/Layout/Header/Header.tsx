import styles from './Header.module.scss';

interface HeaderProps {
  pathname: string;
}

const Header: React.FC<HeaderProps> = ({ pathname }) => {
  console.log('pathname', pathname);
  return (
    <header className={styles.header}>
      <div className={'container'}>
        <p>Header</p>
      </div>
    </header>
  );
};

export default Header;
