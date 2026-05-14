import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { excludedPathsNavbar } from '@/constants/routes';
import { useLogout } from '@/hooks/auth';
import { useUser } from '@/hooks/user';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { handleLogout } = useLogout();
  const { user } = useUser();
  const isAuth = !!user;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout
      header={<Header isAuth={isAuth} onLogout={handleLogout} />}
      isHideHeader={excludedPathsNavbar.some((path) => pathname === path)}
      footer={<Footer pathname={pathname} isAuth={isAuth} />}
      isHideFooter={excludedPathsNavbar.some((path) => pathname === path)}
    >
      {children}
    </Layout>
  );
};

export default AppLayout;
