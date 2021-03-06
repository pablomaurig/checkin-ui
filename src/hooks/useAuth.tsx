import { useState } from 'react';
import { User } from '../types/user.types';

export const useAuth = () => {
  const [splash, setSplash] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const updateSplash = () => {
    setSplash(false);
  };

  return { user, splash, login, logout, updateUser, updateSplash };
};
