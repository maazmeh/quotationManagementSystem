import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userLogin } from '../../providers/http';

interface User {
companyId: string;
username: string;
email: string;
companyName: string;
companyLogo: string;
companyDescription: string;
isPaid: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const resp:any = await userLogin(email, password);
      const userData = resp.data.data[0];
      setUser({
        companyId: userData.id,
        username: userData.username,
        email: userData.email,
        companyName:userData.companyName,
        companyLogo: userData.companyLogo,
        companyDescription: userData.companyDescription,
        isPaid: userData.isPaid
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.log("Error from login =>", err);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};