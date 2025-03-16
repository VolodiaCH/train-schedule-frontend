import React, { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthorised: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthorised: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateState = (token: string) => {
    setIsAuthorised(true);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(payload.role === 'ADMIN');
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) updateState(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    updateState(token);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthorised(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthorised, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
