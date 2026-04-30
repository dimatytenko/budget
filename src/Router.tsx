import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { PageLoader } from './ui-kit';
import { routes } from '@/constants/routes';
import { PrivateRoute, OnboardingRoute } from '@/containers/Routes';

// UI Kit
const Uikit = lazy(() => import('@/containers/Uikit'));

const PublicRoutes = [
  <Route
    key="onboarding"
    path={routes.onboarding}
    element={
      <OnboardingRoute>
        <div>Onboarding Page</div>
      </OnboardingRoute>
    }
  />,
  <Route key="dashboard" path={routes.dashboard} element={<div>Dashboard Page</div>} />,
];

const PrivateRoutes = [
  // Profile
  <Route key="profile" path={routes.profile} element={<div>Profile Page</div>} />,
  // Items
  <Route key="items" path={routes.items} element={<div>Items Page</div>} />,

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
        <Route path="*" element={<Navigate to={routes.dashboard} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesSwitch;
