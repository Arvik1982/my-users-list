import { Navigate } from 'react-router-dom';
import { useState } from 'react';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isAuthenticated] = useState(true);
  const [isLoading] = useState(false);

  if (isLoading) {
    return <div className="loader">Проверка авторизации...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
