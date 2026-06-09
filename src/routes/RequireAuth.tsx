import Splash from 'components/loading/Splash';
import { useAuth } from 'providers/AuthProvider';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import paths from './path';

const RequireAuth = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Splash />;
  }

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
