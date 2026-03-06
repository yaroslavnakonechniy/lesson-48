import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: any) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};
