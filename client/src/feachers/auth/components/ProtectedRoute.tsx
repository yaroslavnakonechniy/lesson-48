import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return null;
    if (!isAuth) return <Navigate to="/login" replace />;

    return <Outlet />;
};
