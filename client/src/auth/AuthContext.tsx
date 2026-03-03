import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
