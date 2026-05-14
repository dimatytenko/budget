import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { PageLoader } from './ui-kit';
import { routes } from '@/constants/routes';
import { PrivateRoute, OnboardingRoute } from '@/containers/Routes';

const OnboardingPage = lazy(() => import('@/containers/Onboarding'));

// UI Kit
const Uikit = lazy(() => import('@/containers/Uikit'));
const Purchase = lazy(() => import('@/containers/Purchase'));

const PublicRoutes = [
  <Route
    key="onboarding"
    path={routes.onboarding}
    element={
      <OnboardingRoute>
        <OnboardingPage />
      </OnboardingRoute>
    }
  />,
  <Route key="purchase" path={routes.purchase} element={<Purchase />} />,
];

const PrivateRoutes = [
  // Profile
  <Route key="profile" path={routes.profile} element={<div>Profile Page</div>} />,
  // Purchase
  <Route key="purchase" path={routes.purchase} element={<div>Purchase Page</div>} />,
  // History
  <Route key="history" path={routes.history} element={<div>History Page</div>} />,

  // Ui Kit Example
  <Route
    key="uiKitExample"
    path={routes.uiKitExample}
    element={
      <PrivateRoute>
        <Uikit />
      </PrivateRoute>
    }
  />,
];

const RoutesSwitch = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {PublicRoutes}
        {PrivateRoutes}
        <Route path="*" element={<Navigate to={routes.purchase} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesSwitch;
