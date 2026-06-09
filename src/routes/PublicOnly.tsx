import Splash from 'components/loading/Splash';
import { useAuth } from 'providers/AuthProvider';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import paths from './path';

const PublicOnly = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Splash />;
  }

  if (isAuthenticated) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return <>{children}</>;
};

export default PublicOnly;
