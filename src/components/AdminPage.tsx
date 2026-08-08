import React, { useState } from 'react';
import {
  Building2,
  Banknote,
  Phone,
  KeyRound,
  LogOut,
  ExternalLink,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { useAuth } from '../context/AuthContext';
import { LocationKey, ClassType, SessionCount } from '../types';

interface AdminPageProps {
  onBackToLanding: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToLanding }) => {
  const {
    locations,
    courseRates,
    adminContacts,
    updateLocation,
    updateCourseRate,
    updateAdminContacts,
    resetToDefault
  } = useAqualuxData();

  const { logout, changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'lokasi' | 'harga' | 'kontak' | 'password'>('lokasi');
  const [saveToast, setSaveToast] = useState(false);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = changePassword(oldPassword, newPassword);
    if (result.success) {
      setPassMsg({ type: 'success', text: result.message });
      setOldPassword('');
      setNewPassword('');
    } else {
      setPassMsg({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col text-left">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-xl">
            <img src="/aqualux-logo.png" alt="Aqualux Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <span className="text-lg font-black font-outfit text-white block leading-none">
              AQUALUX Admin Portal
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mt-0.5">
              Dashboard Kelola Data Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToLanding}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <span>Pratinjau Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="bg-emerald-600 text-white px-6 py-3 text-xs font-black flex items-center justify-center gap-2 shadow-md sticky top-[61px] z-30">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Perubahan data berhasil disimpan ke sistem! Tampilan website langsung diperbarui secara realtime.</span>
        </div>
      )}

      {/* Main Admin Dashboard Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Tabs Navigation */}
          <div className="lg:col-span-3 bg-white p-3 rounded-3xl border border-slate-300 shadow-sm space-y-1">
            <div className="px-3 py-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Menu Pengaturan
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('lokasi')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'lokasi'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>1. Tempat & HTM Kolam</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('harga')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'harga'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>2. Harga Paket Les</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kontak')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'kontak'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>3. Kontak WA Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('password')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'password'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>4. Ganti Password</span>
            </button>

            <div className="pt-4 border-t border-slate-200 px-3">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Kembalikan semua data tempat & harga ke brosur awal?')) {
                    resetToDefault();
                    triggerSaveNotification();
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 font-bold text-xs transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Ke Default</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md">
            
            {/* TAB 1: LOCATIONS & HTM */}
            {activeTab === 'lokasi' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-950 font-outfit">Kelola Tempat Bimbingan & HTM Kolam</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Ubah nama hotel, tiket masuk kolam (HTM per kedatangan), jam operasional, dan alamat lengkap.
                  </p>
                </div>

                {(['ubud', 'tychi', 'savana'] as LocationKey[]).map((key) => {
                  const loc = locations[key];

                  return (
                    <div key={key} className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="font-black text-base text-slate-950 font-outfit">
                          {loc.name}
                        </span>
                        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1 rounded-full border border-blue-300">
                          {key.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-900 mb-1">Nama Tempat / Hotel:</label>
                          <input
                            type="text"
                            value={loc.name}
                            onChange={(e) => {
                              updateLocation(key, { name: e.target.value });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-900 mb-1">Tiket Masuk HTM (Rp / kedatangan):</label>
                          <input
                            type="number"
                            value={loc.htm}
                            onChange={(e) => {
                              updateLocation(key, { htm: Number(e.target.value) });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-900 mb-1">Hari Bimbingan:</label>
                          <input
                            type="text"
                            value={loc.days}
                            onChange={(e) => {
                              updateLocation(key, { days: e.target.value });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-900 mb-1">Jam Operasional Sesi:</label>
                          <input
                            type="text"
                            value={loc.hours}
                            onChange={(e) => {
                              updateLocation(key, { hours: e.target.value });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-900 mb-1">Alamat Lengkap Malang:</label>
                          <input
                            type="text"
                            value={loc.address || ''}
                            onChange={(e) => {
                              updateLocation(key, { address: e.target.value });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-900 mb-1">Deskripsi Fasilitas:</label>
                          <textarea
                            rows={2}
                            value={loc.description}
                            onChange={(e) => {
                              updateLocation(key, { description: e.target.value });
                              triggerSaveNotification();
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: COURSE RATES */}
            {activeTab === 'harga' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-950 font-outfit">Kelola Biaya Paket Les Renang</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Ubah tarif les paket Privat (1-on-1) dan Reguler untuk 4x dan 8x pertemuan.
                  </p>
                </div>

                {/* Privat Rates */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                  <h4 className="font-black text-sm text-slate-950 font-outfit uppercase border-b border-slate-200 pb-2">
                    1. Paket Privat (1 Pelatih : 1 Peserta)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-slate-300">
                      <label className="block font-bold text-slate-900 mb-1">Privat 4x Pertemuan (Rp):</label>
                      <input
                        type="number"
                        value={courseRates.privat[4].price}
                        onChange={(e) => {
                          updateCourseRate('privat', 4, Number(e.target.value));
                          triggerSaveNotification();
                        }}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-950 text-base focus:outline-none focus:border-blue-600"
                      />
                      <span className="text-xs text-slate-600 font-semibold block mt-1">
                        @Rp {courseRates.privat[4].perSession.toLocaleString('id-ID')} / sesi
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-300">
                      <label className="block font-bold text-slate-900 mb-1">Privat 8x Pertemuan (Rp):</label>
                      <input
                        type="number"
                        value={courseRates.privat[8].price}
                        onChange={(e) => {
                          updateCourseRate('privat', 8, Number(e.target.value), courseRates.privat[8].discount);
                          triggerSaveNotification();
                        }}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-950 text-base focus:outline-none focus:border-blue-600"
                      />
                      <span className="text-xs text-slate-600 font-semibold block mt-1">
                        @Rp {courseRates.privat[8].perSession.toLocaleString('id-ID')} / sesi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reguler Rates */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                  <h4 className="font-black text-sm text-slate-950 font-outfit uppercase border-b border-slate-200 pb-2">
                    2. Paket Reguler (3–4 Peserta)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-slate-300">
                      <label className="block font-bold text-slate-900 mb-1">Reguler 4x Pertemuan (Rp):</label>
                      <input
                        type="number"
                        value={courseRates.reguler[4].price}
                        onChange={(e) => {
                          updateCourseRate('reguler', 4, Number(e.target.value));
                          triggerSaveNotification();
                        }}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-950 text-base focus:outline-none focus:border-blue-600"
                      />
                      <span className="text-xs text-slate-600 font-semibold block mt-1">
                        @Rp {courseRates.reguler[4].perSession.toLocaleString('id-ID')} / sesi
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-300">
                      <label className="block font-bold text-slate-900 mb-1">Reguler 8x Pertemuan (Rp):</label>
                      <input
                        type="number"
                        value={courseRates.reguler[8].price}
                        onChange={(e) => {
                          updateCourseRate('reguler', 8, Number(e.target.value), courseRates.reguler[8].discount);
                          triggerSaveNotification();
                        }}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-950 text-base focus:outline-none focus:border-blue-600"
                      />
                      <span className="text-xs text-slate-600 font-semibold block mt-1">
                        @Rp {courseRates.reguler[8].perSession.toLocaleString('id-ID')} / sesi
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: ADMIN CONTACTS */}
            {activeTab === 'kontak' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-950 font-outfit">Kelola Nomor WhatsApp Admin</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Ubah nomor HP admin yang menerima pesanan WhatsApp (Sistem rotasi 50:50).
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Nomor WA Admin 1 (Coach Faqih):</label>
                    <input
                      type="text"
                      value={adminContacts.faqihPhone}
                      onChange={(e) => {
                        updateAdminContacts({ faqihPhone: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Nomor WA Admin 2 (Coach Abed):</label>
                    <input
                      type="text"
                      value={adminContacts.abedPhone}
                      onChange={(e) => {
                        updateAdminContacts({ abedPhone: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PASSWORD CHANGE */}
            {activeTab === 'password' && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h3 className="text-xl font-black text-slate-950 font-outfit">Ganti Password Admin</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Perbarui password untuk masuk ke Portal Admin Aqualux.
                  </p>
                </div>

                {passMsg && (
                  <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    passMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border border-rose-300'
                  }`}>
                    {passMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-700" /> : <AlertCircle className="w-4 h-4 text-rose-700" />}
                    <span>{passMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Password Saat Ini:</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Masukkan password lama..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Password Baru:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all btn-hover-effect flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Password Baru</span>
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
