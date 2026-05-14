import { Navigate } from 'react-router-dom';

import { useGetUser } from '@/hooks/user';
import { routes } from '@/constants/routes';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isExistUser } = useGetUser();

  if (!isExistUser) return <Navigate to={routes.onboarding} replace />;

  return <>{children}</>;
};

export const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { isExistUser } = useGetUser();
  const isPassedOnboarding = true;

  if (isPassedOnboarding || isExistUser) return <Navigate to={routes.purchase} replace />;

  return <>{children}</>;
};
