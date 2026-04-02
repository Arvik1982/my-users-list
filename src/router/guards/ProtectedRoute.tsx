import { useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// TODO: isAuthenticated

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const [isAuthenticated] = useState(true);
  const [isLoading] = useState(false);

  if (isLoading) {
    return <div className="loader">Проверка авторизации...</div>;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};
