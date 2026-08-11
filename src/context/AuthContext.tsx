import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, safeEqual, generateSalt } from '../utils/password';

const LOCAL_STORAGE_PASSWORD_KEY = 'aqualux_admin_password_v1';
const LOCAL_STORAGE_SESSION_KEY = 'aqualux_admin_session_v1';

// Base64-encoded default password — avoids plain text in the JS bundle.
// This is obfuscation only (not encryption); it prevents casual text-search discovery.
const _DP = atob('YXF1YWx1eDEyMw==');
const DEFAULT_SALT = 'aqlx_default_salt_2026';

// ─── Types ─────────────────────────────────────────────────────────────

interface StoredCredential {
  salt: string;
  hash: string;
}

interface StoredSession {
  token: string;
  nonce: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (passwordInput: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── localStorage Helpers ──────────────────────────────────────────────

const readCredential = (): StoredCredential | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.salt === 'string' && typeof parsed.hash === 'string') {
      return parsed as StoredCredential;
    }
  } catch {
    /* not JSON — legacy format, handled by readLegacyPassword */
  }
  return null;
};

/**
 * Read a legacy password stored as either plain text or unsalted 64-char SHA-256 hex.
 * Returns null if the stored value is already in the new {salt, hash} JSON format.
 */
const readLegacyPassword = (): { type: 'plaintext' | 'unsalted_hash'; value: string } | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY);
    if (!raw) return null;
    // Check if it's already new JSON format
    try {
      const p = JSON.parse(raw);
      if (p?.salt && p?.hash) return null;
    } catch {
      /* not JSON — continue checking legacy formats */
    }
    // 64-char hex = unsalted SHA-256
    if (/^[a-f0-9]{64}$/.test(raw)) return { type: 'unsalted_hash', value: raw };
    // Otherwise plain text
    return { type: 'plaintext', value: raw };
  } catch {
    return null;
  }
};

const writeCredential = (cred: StoredCredential) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, JSON.stringify(cred));
  } catch (e) {
    console.error('Failed to save credential', e);
  }
};

const readSession = (): StoredSession | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.token === 'string' && typeof parsed.nonce === 'string') {
      return parsed as StoredSession;
    }
  } catch {
    /* legacy 'true' string or invalid — treat as no session */
  }
  return null;
};

const writeSession = (session: StoredSession) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session', e);
  }
};

const clearSession = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  } catch (e) {
    console.error('Failed to clear session', e);
  }
};

// ─── Session Token Helpers ─────────────────────────────────────────────
// Session token = SHA-256(passwordHash + ':session:' + nonce).
// This binds the session to the stored password hash, so simply writing
// localStorage.setItem('...session...', 'true') no longer grants access.

const deriveSessionToken = async (passwordHash: string, nonce: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(passwordHash + ':session:' + nonce);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const createSession = async (passwordHash: string): Promise<StoredSession> => {
  const nonce = generateSalt();
  const token = await deriveSessionToken(passwordHash, nonce);
  return { token, nonce };
};

const verifySession = async (session: StoredSession, passwordHash: string): Promise<boolean> => {
  const expected = await deriveSessionToken(passwordHash, session.nonce);
  return safeEqual(expected, session.token);
};

// ─── Provider ──────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  // Verify existing session on mount (async because hashing is async)
  useEffect(() => {
    const check = async () => {
      const cred = readCredential();
      const session = readSession();

      if (cred && session) {
        const valid = await verifySession(session, cred.hash);
        if (valid) {
          setIsAuthenticated(true);
        } else {
          clearSession();
        }
      } else {
        // Clear any legacy 'true' string or orphaned session data
        clearSession();
      }
      setReady(true);
    };
    check();
  }, []);

  /**
   * Verify a password input against stored or default credentials.
   * Returns the credential hash on success (needed for session token creation).
   */
  const verifyPassword = async (passwordInput: string): Promise<string | null> => {
    // 1. Check against new-format stored credential (salted hash)
    const cred = readCredential();
    if (cred) {
      const input = await hashPassword(passwordInput, cred.salt);
      if (safeEqual(input.hash, cred.hash)) return cred.hash;
      return null;
    }

    // 2. Check against legacy stored credential (migration path)
    const legacy = readLegacyPassword();
    if (legacy) {
      if (legacy.type === 'plaintext' && legacy.value === passwordInput) {
        // Upgrade: plain text → salted hash
        const fresh = await hashPassword(passwordInput);
        writeCredential(fresh);
        return fresh.hash;
      }
      if (legacy.type === 'unsalted_hash') {
        // Verify against old unsalted SHA-256
        const encoder = new TextEncoder();
        const data = encoder.encode(passwordInput);
        const buffer = await crypto.subtle.digest('SHA-256', data);
        const unsaltedHash = Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        if (safeEqual(unsaltedHash, legacy.value)) {
          // Upgrade: unsalted hash → salted hash
          const fresh = await hashPassword(passwordInput);
          writeCredential(fresh);
          return fresh.hash;
        }
      }
      return null;
    }

    // 3. No stored credential — verify against default password
    const defaultCred = await hashPassword(_DP, DEFAULT_SALT);
    const inputCred = await hashPassword(passwordInput, DEFAULT_SALT);
    if (safeEqual(inputCred.hash, defaultCred.hash)) {
      // First-ever login: save with a fresh random salt
      const fresh = await hashPassword(passwordInput);
      writeCredential(fresh);
      return fresh.hash;
    }

    return null;
  };

  const login = async (passwordInput: string): Promise<boolean> => {
    const hash = await verifyPassword(passwordInput);
    if (hash) {
      setIsAuthenticated(true);
      const session = await createSession(hash);
      writeSession(session);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearSession();
  };

  const changePassword = async (
    oldPass: string,
    newPass: string
  ): Promise<{ success: boolean; message: string }> => {
    const oldHash = await verifyPassword(oldPass);
    if (!oldHash) {
      return { success: false, message: 'Password lama tidak sesuai.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'Password baru minimal 6 karakter.' };
    }
    try {
      const newCred = await hashPassword(newPass);
      writeCredential(newCred);
      // Re-create session token bound to the new password hash
      const session = await createSession(newCred.hash);
      writeSession(session);
      return { success: true, message: 'Password admin berhasil diubah!' };
    } catch {
      return { success: false, message: 'Gagal menyimpan password baru.' };
    }
  };

  // Show nothing until async session verification completes
  if (!ready) return null;

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
