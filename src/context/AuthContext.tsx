import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { mockCurrentUser, demoUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (user: User) => void;
  availableDemoUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('skillmatrix_user');
    return saved ? JSON.parse(saved) : mockCurrentUser;
  });

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('skillmatrix_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skillmatrix_user');
  };

  const switchRole = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('skillmatrix_user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        availableDemoUsers: demoUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
