import styles from './Layout.module.scss';

interface LayoutProps {
  header: React.ReactNode;
  isHideHeader?: boolean;
  footer: React.ReactNode;
  isHideFooter?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  header,
  isHideHeader,
  footer,
  isHideFooter,
  children,
}) => {
  return (
    <div className={styles.layout}>
      {!isHideHeader && header}
      <main className={styles.main}>
        <div className={'container'}>{children}</div>
      </main>
      {!isHideFooter && footer}
    </div>
  );
};

export default Layout;
