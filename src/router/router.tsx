import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { PublicRoute } from './guards/PublicRoute';
import Dashboard from '@/pages/Dashboard/Dashboard';
import EditUser from '@/pages/Users/EditUser';
import Login from '@/pages/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/users/:id/edit',
        element: <EditUser />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
