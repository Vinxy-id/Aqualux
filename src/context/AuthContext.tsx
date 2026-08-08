import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, safeEqual } from '../utils/password';

const LOCAL_STORAGE_PASSWORD_KEY = 'aqualux_admin_password_v1';
const LOCAL_STORAGE_SESSION_KEY = 'aqualux_admin_session_v1';

const DEFAULT_PASSWORD = 'aqualux123';

const isHashFormat = (value: string): boolean => /^[a-f0-9]{64}$/.test(value);

interface AuthContextType {
  isAuthenticated: boolean;
  login: (passwordInput: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
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

  const getSavedPassword = (): string | null => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY);
    } catch {
      return null;
    }
  };

  const savePasswordHash = (hash: string) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, hash);
    } catch (e) {
      console.error('Failed to save password hash', e);
    }
  };

  const verifyPassword = async (passwordInput: string): Promise<boolean> => {
    const inputHash = await hashPassword(passwordInput);
    const saved = getSavedPassword();

    if (saved && isHashFormat(saved)) {
      return safeEqual(inputHash, saved);
    }

    if (saved && !isHashFormat(saved)) {
      if (saved === passwordInput) {
        savePasswordHash(inputHash);
        return true;
      }
      return false;
    }

    const defaultHash = await hashPassword(DEFAULT_PASSWORD);
    if (safeEqual(inputHash, defaultHash)) {
      savePasswordHash(inputHash);
      return true;
    }
    return false;
  };

  const login = async (passwordInput: string): Promise<boolean> => {
    const ok = await verifyPassword(passwordInput);
    if (ok) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, 'true');
      } catch (e) {
        console.error('Failed to save session', e);
      }
    }
    return ok;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    } catch (e) {
      console.error('Failed to clear session', e);
    }
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    const oldOk = await verifyPassword(oldPass);
    if (!oldOk) {
      return { success: false, message: 'Password lama tidak sesuai.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'Password baru minimal 6 karakter.' };
    }
    try {
      const newHash = await hashPassword(newPass);
      savePasswordHash(newHash);
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
