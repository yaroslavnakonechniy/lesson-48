import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { useGetMeQuery } from '../api/auth.api';

export const ProtectedRoute = () => {
    const { data, isLoading, isError } = useGetMeQuery();

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
    }

    if (isError || !data?.data) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
