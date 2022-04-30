import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  login: ({ email, role }: User) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
