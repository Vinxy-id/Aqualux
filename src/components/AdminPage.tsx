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
  X,
  Share2,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Globe,
  MessageCircle,
  Calculator,
  MapPin,
  GraduationCap,
  Instagram,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAqualuxData, LinkBioItem } from '../context/AqualuxDataContext';
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
    linkBioProfile,
    linkBioItems,
    updateLocation,
    updateCourseRate,
    updateAdminContacts,
    updateLinkBioProfile,
    addLinkBioItem,
    updateLinkBioItem,
    deleteLinkBioItem,
    toggleLinkBioItem,
    resetToDefault
  } = useAqualuxData();

  const { logout, changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'lokasi' | 'harga' | 'kontak' | 'linkbio' | 'password'>('lokasi');
  const [saveToast, setSaveToast] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Link Bio Item Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newBadge, setNewBadge] = useState('PROMO');
  const [newIconName, setNewIconName] = useState('Globe');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

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

  const handleAddLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    addLinkBioItem({
      title: newTitle,
      subtitle: newSubtitle,
      url: newUrl,
      badge: newBadge.toUpperCase(),
      iconName: newIconName,
      enabled: true
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewUrl('');
    setNewBadge('PROMO');
    setNewIconName('Globe');
    triggerSaveNotification();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col lg:flex-row text-left">
      
      {/* Mobile Fixed Top Header Bar */}
      <div className="lg:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 active:scale-95 transition-all border border-slate-700"
            aria-label="Toggle Sidebar Menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-lg shrink-0">
              <img src="/aqualux-logo.png" alt="Aqualux Logo" className="h-6 w-auto object-contain" />
            </div>
            <div>
              <span className="font-black text-sm font-outfit text-white block leading-none">Admin Portal</span>
              <span className="text-[10px] text-blue-400 font-bold tracking-wider uppercase block mt-0.5">Aqualux Malang</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToLanding}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1 hover:text-white"
            title="Pratinjau Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-1 shadow-sm transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Mobile Fixed Sidebar Drawer Overlay (Stays 100% Fixed When Page Scrolled) */}
      {mobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div 
            className="w-72 bg-slate-900 text-white h-full fixed top-0 bottom-0 left-0 z-50 p-5 flex flex-col justify-between overflow-y-auto border-r border-slate-800 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent 
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <aside className="hidden lg:flex lg:flex-col fixed top-0 bottom-0 left-0 w-72 bg-slate-900 text-white border-r border-slate-800 z-40 p-5 justify-between overflow-y-auto">
        <SidebarContent 
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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

          {/* TAB 4: LINK BIO (LINKTREE) MANAGEMENT */}
          {activeTab === 'linkbio' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-8">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <span>4. Kelola Link-in-Bio (Linktree)</span>
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Atur profil sosial, bio text, dan daftar tautan interaktif yang tampil pada halaman Linktree Aqualux (<code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-blue-600 font-bold">/#links</code>).
                </p>
              </div>

              {/* 1. Edit Profile Bio */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4 text-xs">
                <h4 className="font-black text-sm text-slate-950 font-outfit uppercase border-b border-slate-200 pb-2">
                  Profil & Informasi Akun Bio
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Handle Sosial Instagram:</label>
                    <input
                      type="text"
                      value={linkBioProfile.handle}
                      onChange={(e) => {
                        updateLinkBioProfile({ handle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">URL Profil Instagram:</label>
                    <input
                      type="text"
                      value={linkBioProfile.instagramUrl}
                      onChange={(e) => {
                        updateLinkBioProfile({ instagramUrl: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-900 mb-1">Deskripsi Singkat Bio:</label>
                    <textarea
                      rows={2}
                      value={linkBioProfile.bioText}
                      onChange={(e) => {
                        updateLinkBioProfile({ bioText: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Daftar Tautan Aktif / Nonaktif */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-950 font-outfit uppercase">
                    Daftar Tautan Linktree ({linkBioItems.length} Link)
                  </h4>
                  <a
                    href="#links"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Pratinjau Halaman Linktree</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="space-y-3">
                  {linkBioItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all text-xs ${
                        item.enabled
                          ? 'bg-white border-slate-300 shadow-sm'
                          : 'bg-slate-100 border-slate-200 opacity-60'
                      }`}
                    >
                      {editingItemId === item.id ? (
                        /* Edit Inline Form */
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-900 mb-1">Judul Tautan:</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  updateLinkBioItem(item.id, { title: e.target.value });
                                  triggerSaveNotification();
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-900 mb-1">Sub-judul / Keterangan:</label>
                              <input
                                type="text"
                                value={item.subtitle}
                                onChange={(e) => {
                                  updateLinkBioItem(item.id, { subtitle: e.target.value });
                                  triggerSaveNotification();
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-900"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-900 mb-1">URL Target / Tujuan:</label>
                              <input
                                type="text"
                                value={item.url}
                                onChange={(e) => {
                                  updateLinkBioItem(item.id, { url: e.target.value });
                                  triggerSaveNotification();
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-slate-900"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-900 mb-1">Badge Tag Label:</label>
                              <input
                                type="text"
                                value={item.badge}
                                onChange={(e) => {
                                  updateLinkBioItem(item.id, { badge: e.target.value.toUpperCase() });
                                  triggerSaveNotification();
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingItemId(null)}
                              className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                            >
                              Selesai Edit
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Card Read Mode */
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center shrink-0">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-slate-950 font-outfit text-sm truncate">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-300 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-slate-500 font-mono text-[11px] block truncate">
                                {item.url} {item.subtitle ? `• ${item.subtitle}` : ''}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                toggleLinkBioItem(item.id);
                                triggerSaveNotification();
                              }}
                              className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                                item.enabled
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                              }`}
                              title={item.enabled ? 'Sembunyikan' : 'Tampilkan'}
                            >
                              {item.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingItemId(item.id)}
                              className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                              title="Edit Tautan"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Hapus link "${item.title}"?`)) {
                                  deleteLinkBioItem(item.id);
                                  triggerSaveNotification();
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                              title="Hapus Tautan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Form Tambah Link Baru */}
              <form onSubmit={handleAddLinkSubmit} className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-4 text-xs">
                <h4 className="font-black text-sm text-slate-950 font-outfit uppercase flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-700" />
                  <span>Tambah Tautan Linktree Baru</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Judul Tautan:*</label>
                    <input
                      type="text"
                      placeholder="Contoh: Form Pendaftaran Online"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Sub-judul / Keterangan Singkat:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Isikan data registrasi les"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">URL Target / Tujuan:*</label>
                    <input
                      type="text"
                      placeholder="Contoh: https://forms.google.com/... atau /"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-slate-950 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Badge Tag Label:</label>
                    <input
                      type="text"
                      placeholder="Contoh: PROMO, REGISTRASI, PDF"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-950 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all btn-hover-effect flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan Ke Halaman Linktree</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: PASSWORD CHANGE */}
          {activeTab === 'password' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 max-w-md">
              <div>
                <h3 className="text-xl font-black text-slate-950 font-outfit">5. Ganti Password</h3>
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
  activeTab: 'lokasi' | 'harga' | 'kontak' | 'linkbio' | 'password';
  setActiveTab: (tab: 'lokasi' | 'harga' | 'kontak' | 'linkbio' | 'password') => void;
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
    <div className="flex flex-col space-y-4">
      
      {/* Sidebar Header Brand */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-xl shadow-xs shrink-0">
            <img src="/aqualux-logo.png" alt="Aqualux Logo" className="h-7 w-auto object-contain" />
          </div>
          <div>
            <h2 className="text-sm font-black font-outfit text-white leading-tight">
              AQUALUX Admin Portal
            </h2>
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block mt-0.5">
              DASHBOARD KELOLA DATA LIVE
            </span>
          </div>
        </div>

        {/* Menu Divider */}
        <div className="pt-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
            MENU PENGATURAN
          </span>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('lokasi')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
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
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
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
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
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
              onClick={() => setActiveTab('linkbio')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'linkbio'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>4. Kelola Link-in-Bio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('password')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all text-left ${
                activeTab === 'password'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>5. Ganti Password</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar Actions (Compact Directly Below Nav) */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Kembalikan semua data tempat & harga ke brosur awal?')) {
              resetToDefault();
              triggerSaveNotification();
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-bold text-xs transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Ke Default</span>
        </button>

        <button
          type="button"
          onClick={onBackToLanding}
          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 font-bold text-xs transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Pratinjau Web</span>
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </button>
      </div>

    </div>
  );
};
