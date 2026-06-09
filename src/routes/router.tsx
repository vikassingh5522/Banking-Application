import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import paths, { rootPaths } from './path';

/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard'));
const BusinessModulePage = lazy(() => import('pages/business-module'));
const Spinner = lazy(() => import('components/loading/Splash'));
const LoadingProgress = lazy(() => import('components/loading/LoadingProgress'));

const LoginPage = lazy(() => import('pages/authentication/login'));
const SignUpPage = lazy(() => import('pages/authentication/signup'));
const ForgetPasswordPage = lazy(() => import('pages/authentication/forget-password'));
const ResetPasswordPage = lazy(() => import('pages/authentication/reset-password'));

const NotFoundPage = lazy(() => import('pages/not-found'));
/* -------------------------------------------------------------------------- */

/**
 * @Defines the routes for the application using React Router.
 */
export const routes = [
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: (
          <MainLayout>
            <Suspense fallback={<LoadingProgress />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={paths.dashboard} replace />,
          },
          {
            path: paths.dashboard,
            element: <Dashboard />,
          },
          {
            path: paths.accounts,
            element: <BusinessModulePage />,
          },
          {
            path: paths.payments,
            element: <BusinessModulePage />,
          },
          {
            path: paths.collections,
            element: <BusinessModulePage />,
          },
          {
            path: paths.accounting,
            element: <BusinessModulePage />,
          },
          {
            path: paths.gstTax,
            element: <BusinessModulePage />,
          },
          {
            path: paths.invoicing,
            element: <BusinessModulePage />,
          },
          {
            path: paths.lending,
            element: <BusinessModulePage />,
          },
          {
            path: paths.tradeSupplyChain,
            element: <BusinessModulePage />,
          },
          {
            path: paths.payroll,
            element: <BusinessModulePage />,
          },
          {
            path: paths.insurance,
            element: <BusinessModulePage />,
          },
          {
            path: paths.marketplace,
            element: <BusinessModulePage />,
          },
          {
            path: paths.reports,
            element: <BusinessModulePage />,
          },
          {
            path: paths.compliance,
            element: <BusinessModulePage />,
          },
          {
            path: paths.settings,
            element: <BusinessModulePage />,
          },
          {
            path: paths.aiAssistant,
            element: <BusinessModulePage />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.login,
            element: <LoginPage />,
          },
          {
            path: paths.signup,
            element: <SignUpPage />,
          },
          {
            path: paths.forgetPassword,
            element: <ForgetPasswordPage />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notFound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.notFound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/bankdash',
});

export default router;
