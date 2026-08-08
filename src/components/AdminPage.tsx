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
  Menu,
  X
} from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { useAuth } from '../context/AuthContext';
import { LocationKey } from '../types';

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col lg:flex-row text-left">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200"
            aria-label="Toggle Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <img src="/aqualux-logo.png" alt="Aqualux Logo" className="h-7 w-auto object-contain" />
            <span className="font-bold text-sm font-outfit text-white">Admin Portal</span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="p-2 rounded-xl bg-rose-600 text-white text-xs font-extrabold flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div 
            className="w-72 bg-slate-900 text-white h-full p-5 flex flex-col justify-between overflow-y-auto border-r border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent 
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              onBackToLanding={onBackToLanding}
              logout={logout}
              resetToDefault={resetToDefault}
              triggerSaveNotification={triggerSaveNotification}
            />
          </div>
        </div>
      )}

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed top-0 bottom-0 left-0 w-72 bg-slate-900 text-white border-r border-slate-800 z-40 p-5 justify-between">
        <SidebarContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBackToLanding={onBackToLanding}
          logout={logout}
          resetToDefault={resetToDefault}
          triggerSaveNotification={triggerSaveNotification}
        />
      </aside>

      {/* Main Content Body */}
      <main className="lg:pl-72 flex-1 min-h-screen flex flex-col">
        
        {/* Save Notification Toast */}
        {saveToast && (
          <div className="bg-emerald-600 text-white px-6 py-3 text-xs font-black flex items-center justify-center gap-2 shadow-md sticky top-0 z-30">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Perubahan data berhasil disimpan! Tampilan website langsung diperbarui secara realtime.</span>
          </div>
        )}

        {/* Content Container */}
        <div className="p-4 sm:p-8 max-w-5xl w-full mx-auto flex-1">
          
          {/* TAB 1: LOCATIONS & HTM */}
          {activeTab === 'lokasi' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit">1. Tempat & HTM Kolam</h3>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Ubah nama hotel, tiket masuk kolam (HTM per kedatangan), jam operasional, dan alamat lokasi bimbingan.
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit">2. Harga Paket Les</h3>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Ubah tarif les paket Privat (1-on-1) dan Reguler untuk 4x dan 8x pertemuan.
                </p>
              </div>

              {/* Privat Rates */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                <h4 className="font-black text-sm text-slate-950 font-outfit uppercase border-b border-slate-200 pb-2">
                  Paket Privat (1 Pelatih : 1 Peserta)
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
                  Paket Reguler (3–4 Peserta)
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit">3. Kontak WA Admin</h3>
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 max-w-md">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit">4. Ganti Password</h3>
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
      </main>

    </div>
  );
};

/* Inner Sidebar Component */
interface SidebarContentProps {
  activeTab: 'lokasi' | 'harga' | 'kontak' | 'password';
  setActiveTab: (tab: 'lokasi' | 'harga' | 'kontak' | 'password') => void;
  onBackToLanding: () => void;
  logout: () => void;
  resetToDefault: () => void;
  triggerSaveNotification: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  activeTab,
  setActiveTab,
  onBackToLanding,
  logout,
  resetToDefault,
  triggerSaveNotification
}) => {
  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      
      {/* Sidebar Header Brand */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-xs shrink-0">
            <img src="/aqualux-logo.png" alt="Aqualux Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h2 className="text-base font-black font-outfit text-white leading-tight">
              AQUALUX Admin Portal
            </h2>
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block mt-0.5">
              DASHBOARD KELOLA DATA LIVE
            </span>
          </div>
        </div>

        {/* Menu Divider */}
        <div className="pt-2">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2 block mb-2">
            MENU PENGATURAN
          </span>

          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('lokasi')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'lokasi'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>1. Tempat & HTM Kolam</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('harga')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'harga'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Banknote className="w-4 h-4 shrink-0" />
              <span>2. Harga Paket Les</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kontak')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'kontak'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>3. Kontak WA Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('password')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-3 transition-all text-left ${
                activeTab === 'password'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>4. Ganti Password</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Actions */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Kembalikan semua data tempat & harga ke brosur awal?')) {
              resetToDefault();
              triggerSaveNotification();
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-bold text-xs transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Ke Default</span>
        </button>

        <button
          type="button"
          onClick={onBackToLanding}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-bold text-xs transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Pratinjau Web</span>
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all mt-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>

    </div>
  );
};
