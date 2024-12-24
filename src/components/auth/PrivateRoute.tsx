import useUserStore from '@/stores/user';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/signin" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
