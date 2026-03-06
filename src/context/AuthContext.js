import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('edu_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('edu_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('edu_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('edu_user');
    setUser(null);
  };

  const register = (userData) => {
    // Store registered users list
    const existing = JSON.parse(localStorage.getItem('edu_users') || '[]');
    const userExists = existing.find(u => u.email === userData.email);
    if (userExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    existing.push(userData);
    localStorage.setItem('edu_users', JSON.stringify(existing));
    return { success: true };
  };

  const validateLogin = (email, password, role) => {
    const existing = JSON.parse(localStorage.getItem('edu_users') || '[]');
    const found = existing.find(
      u => u.email === email && u.password === password && u.role === role
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Invalid credentials or role mismatch.' };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, validateLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
