import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  login: ({ email, role }: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  splash: boolean;
  updateSplash: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const { user, splash, login, logout, updateUser, updateSplash } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        logout,
        updateUser,
        splash: splash,
        updateSplash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
