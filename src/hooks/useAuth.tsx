import { useState } from 'react';
import { User } from '../types/user.types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ email, role }: User) => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
