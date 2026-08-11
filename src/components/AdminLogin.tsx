import React, { useState, useCallback } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

const LOCKOUT_STORAGE_KEY = 'aqualux_login_lockout_v1';

interface LockoutState {
  until: number;
  attempts: number;
}

const readLockout = (): LockoutState => {
  try {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        until: typeof parsed.until === 'number' ? parsed.until : 0,
        attempts: typeof parsed.attempts === 'number' ? parsed.attempts : 0,
      };
    }
  } catch { /* ignore */ }
  return { until: 0, attempts: 0 };
};

const writeLockout = (until: number, attempts: number) => {
  try {
    localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify({ until, attempts }));
  } catch { /* ignore */ }
};

const clearLockout = () => {
  try {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch { /* ignore */ }
};
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onBackToLanding: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToLanding }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    const saved = readLockout();
    return saved.until > Date.now() ? saved.until : null;
  });
  const [failedAttempts, setFailedAttempts] = useState(() => {
    const saved = readLockout();
    // If lockout has expired, reset attempts
    if (saved.until > 0 && saved.until <= Date.now()) return 0;
    return saved.attempts;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Masukkan password admin.');
      return;
    }

    if (lockoutUntil && Date.now() < lockoutUntil) {
      const waitSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setErrorMessage(`Terlalu banyak percobaan. Coba lagi dalam ${waitSec} detik.`);
      return;
    }

    setIsChecking(true);
    const success = await login(password);
    setIsChecking(false);

    if (!success) {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      if (next >= 5) {
        const until = Date.now() + 30000;
        setLockoutUntil(until);
        setFailedAttempts(0);
        writeLockout(until, 0);
        setErrorMessage('Terlalu banyak percobaan gagal. Coba lagi dalam 30 detik.');
      } else {
        writeLockout(0, next);
        setErrorMessage(`Password admin salah. Sisa percobaan: ${5 - next}`);
      }
    } else {
      setErrorMessage('');
      setFailedAttempts(0);
      clearLockout();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 border border-slate-300 shadow-2xl text-left relative">
        
        {/* Top Back Link */}
        <button
          type="button"
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Web Aqualux</span>
        </button>

        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-slate-950 font-outfit">Portal Admin Aqualux</h1>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            Masukan password untuk mengelola lokasi, HTM, & harga les.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">
              Password Admin:
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-950 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                autoFocus
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isChecking}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all btn-hover-effect mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Lock className="w-4 h-4 text-white" />
            <span>{isChecking ? 'Memeriksa...' : 'Masuk ke Dashboard Admin'}</span>
          </button>
        </form>

        {/* Helper Note / Demo Hint */}
        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <p className="text-[11px] font-semibold text-slate-500">
            Halaman admin bersifat terproteksi. Gunakan password yang telah disepakati dengan tim Aqualux.
          </p>
        </div>

      </div>
    </div>
  );
};
