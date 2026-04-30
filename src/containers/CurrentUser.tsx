// import { useFetchSession } from '@/hooks/auth';
// import { useRefreshingUser } from '@/hooks/account/user';
// import { PageLoader } from '@/ui-kit';

interface CurrentUserProps {
  children: React.ReactNode;
}

const CurrentUser: React.FC<CurrentUserProps> = ({ children }) => {
  // const { isRefreshing } = useRefreshingUser();
  // useFetchSession();

  // if (isRefreshing) return <PageLoader />;

  return <>{children}</>;
};

export default CurrentUser;
