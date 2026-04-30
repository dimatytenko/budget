// import { Navigate } from 'react-router-dom';

// import { useGetUser } from '@/hooks/account/user';
// import { routes } from '@/constants/routes';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isExistUser } = useGetUser();
  // const isExistUser = true;

  // if (!isExistUser) return <Navigate to={routes.dashboard} replace />;

  return <>{children}</>;
};

export const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  // const isPassedOnboarding = true;

  // if (isPassedOnboarding) return <Navigate to={routes.dashboard} replace />;

  return <>{children}</>;
};
