import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import paths, { rootPaths } from './path';
import PublicOnly from './PublicOnly';
import RequireAuth from './RequireAuth';
import RouteErrorFallback from './RouteErrorFallback';

/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const PublicLayout = lazy(() => import('layouts/public-layout/index'));
const MainLayout = lazy(() => import('layouts/main-layout/index'));
const AuthLayout = lazy(() => import('layouts/auth-layout/index'));
const LandingPage = lazy(() => import('pages/public/landing/index'));
const HomePage = lazy(() => import('pages/public/home/index'));
const AboutPage = lazy(() => import('pages/public/about/index'));
const ContactPage = lazy(() => import('pages/public/contact/index'));
const Dashboard = lazy(() => import('pages/dashboard/index'));
const BusinessModulePage = lazy(() => import('pages/business-module/index'));
const AiAssistantPage = lazy(() => import('pages/ai-assistant/index'));
const ProfilePage = lazy(() => import('pages/profile/index'));
const Spinner = lazy(() => import('components/loading/Splash'));
const LoadingProgress = lazy(() => import('components/loading/LoadingProgress'));

const LoginPage = lazy(() => import('pages/authentication/login/index'));
const SignUpPage = lazy(() => import('pages/authentication/signup/index'));
const ForgetPasswordPage = lazy(() => import('pages/authentication/forget-password/index'));
const ResetPasswordPage = lazy(() => import('pages/authentication/reset-password/index'));

const NotFoundPage = lazy(() => import('pages/not-found/index'));
/* -------------------------------------------------------------------------- */

/**
 * @Defines the routes for the application using React Router.
 */
export const routes = [
  {
    errorElement: <RouteErrorFallback />,
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: paths.home,
            element: <HomePage />,
          },
          {
            path: paths.about,
            element: <AboutPage />,
          },
          {
            path: paths.contact,
            element: <ContactPage />,
          },
        ],
      },
      {
        element: (
          <RequireAuth>
            <MainLayout>
              <Suspense fallback={<LoadingProgress />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </RequireAuth>
        ),
        children: [
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
            path: paths.profile,
            element: <ProfilePage />,
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
            element: <AiAssistantPage />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <PublicOnly>
            <AuthLayout />
          </PublicOnly>
        ),
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
