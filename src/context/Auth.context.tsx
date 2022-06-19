import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  login: ({ email, role }: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const { user, login, logout, updateUser } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
