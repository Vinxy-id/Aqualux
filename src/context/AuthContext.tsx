import React, { createContext, useContext, useState, useEffect } from 'react';

const LOCAL_STORAGE_PASSWORD_KEY = 'aqualux_admin_password_v1';
const LOCAL_STORAGE_SESSION_KEY = 'aqualux_admin_session_v1';

const DEFAULT_PASSWORD = 'aqualux123';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (passwordInput: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const getSavedPassword = (): string => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  };

  const login = (passwordInput: string): boolean => {
    const currentPassword = getSavedPassword();
    if (passwordInput === currentPassword) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, 'true');
      } catch (e) {
        console.error('Failed to save session', e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    } catch (e) {
      console.error('Failed to clear session', e);
    }
  };

  const changePassword = (oldPass: string, newPass: string) => {
    const currentPassword = getSavedPassword();
    if (oldPass !== currentPassword) {
      return { success: false, message: 'Password lama tidak sesuai.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'Password baru minimal 6 karakter.' };
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, newPass);
      return { success: true, message: 'Password admin berhasil diubah!' };
    } catch {
      return { success: false, message: 'Gagal menyimpan password baru.' };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
