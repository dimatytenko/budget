import styles from './Footer.module.scss';

interface FooterProps {
  pathname: string;
}

const Footer: React.FC<FooterProps> = ({ pathname }) => {
  console.log('pathname', pathname);
  return (
    <footer className={styles.footer}>
      <div className={'container'}>
        <p>Footer</p>
      </div>
    </footer>
  );
};

export default Footer;
