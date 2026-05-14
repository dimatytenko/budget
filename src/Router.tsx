import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { PageLoader } from './ui-kit';
import { routes } from '@/constants/routes';
import { PrivateRoute, OnboardingRoute } from '@/containers/Routes';

const OnboardingPage = lazy(() => import('@/containers/Onboarding'));
const PurchasePage = lazy(() => import('@/containers/Purchase'));
const ProfilePage = lazy(() => import('@/containers/Profile'));
const HistoryPage = lazy(() => import('@/containers/History'));

// UI Kit
const Uikit = lazy(() => import('@/containers/Uikit'));

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
  <Route key="purchase" path={routes.purchase} element={<PurchasePage />} />,
];

const PrivateRoutes = [
  <Route
    key="profile"
    path={routes.profile}
    element={
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    }
  />,

  <Route
    key="history"
    path={routes.history}
    element={
      <PrivateRoute>
        <HistoryPage />
      </PrivateRoute>
    }
  />,

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
