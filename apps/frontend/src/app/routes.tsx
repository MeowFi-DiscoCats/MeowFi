import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalLayout from './layout/GlobleLayout';
import TimeVaultPage from './pages/TimeVaultPage';
import LiquidFaucetPage from './pages/LiquidFaucetPage';
import { Suspense } from 'react';
import AdminLoginPage from './pages/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AuthGuard from '@/features/admin/components/AuthGuard';

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: '/',
        element: <TimeVaultPage />,
      },
      {
        path: '/faucet',
        element: <LiquidFaucetPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLoginPage />,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthGuard>
              <AdminDashboardPage />
            </AuthGuard>
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
