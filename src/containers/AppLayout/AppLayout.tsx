import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { excludedPathsNavbar } from '@/constants/routes';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout
      header={<Header pathname={pathname} />}
      isHideHeader={excludedPathsNavbar.some((path) => pathname === path)}
      footer={<Footer pathname={pathname} />}
      isHideFooter={excludedPathsNavbar.some((path) => pathname === path)}
    >
      {children}
    </Layout>
  );
};

export default AppLayout;
