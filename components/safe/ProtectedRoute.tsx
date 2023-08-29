import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({children}: { children: ReactNode }) => {
  const route = useRouter();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      route.push('/').then(r => r);
    }

  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
