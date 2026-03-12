import { createContext, useContext } from 'react';
import { useGetMeQuery, useSignOutMutation } from '../api/auth.api';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const { data, isLoading } = useGetMeQuery();
    const [signOut] = useSignOutMutation();

    const logout = async () => {
            await signOut();
            window.location.href = '/login';
    };

  return (
        <AuthContext.Provider
            value={{
                user: data?.data,
                isAuth: !!data?.data,
                isLoading,
                logout,
            }}
            >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
