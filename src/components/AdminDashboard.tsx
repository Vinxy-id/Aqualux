import React, { useState } from 'react';
import { X, Save, RotateCcw, Building2, Banknote, Phone, CheckCircle, Info } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { LocationKey, ClassType, SessionCount } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    locations,
    courseRates,
    adminContacts,
    isAdminOpen,
    setIsAdminOpen,
    updateLocation,
    updateCourseRate,
    updateAdminContacts,
    resetToDefault
  } = useAqualuxData();

  const [activeTab, setActiveTab] = useState<'lokasi' | 'harga' | 'kontak'>('lokasi');
  const [saveToast, setSaveToast] = useState(false);

  if (!isAdminOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl border border-slate-300 shadow-2xl overflow-hidden text-slate-900 my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <div>
              <h2 className="text-xl font-black font-outfit text-white">Dashboard Kelola Aqualux</h2>
              <p className="text-xs text-slate-400">Atur tempat bimbingan, tiket kolam (HTM), harga paket les & kontak WhatsApp.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label="Tutup Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Toast Banner */}
        {saveToast && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-black flex items-center gap-2 shadow-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Perubahan berhasil disimpan! Tampilan website langsung diperbarui secara realtime.</span>
          </div>
        )}

        {/* Modal Tabs Navigation */}
        <div className="bg-slate-100 px-6 pt-3 border-b border-slate-300 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('lokasi')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'lokasi'
                ? 'bg-white border-slate-300 text-blue-700 -mb-px'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Tempat Bimbingan & HTM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('harga')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'harga'
                ? 'bg-white border-slate-300 text-blue-700 -mb-px'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>2. Harga Paket Les</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kontak')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'kontak'
                ? 'bg-white border-slate-300 text-blue-700 -mb-px'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>3. Nomor Admin WA</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 text-left">
          
          {/* TAB 1: LOCATIONS */}
          {activeTab === 'lokasi' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs text-slate-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Kelola Kolam Hotel:</strong> Ubah nama hotel, biaya tiket masuk (HTM), hari bimbingan, jam operasional, dan alamat lokasi.
                </span>
              </div>

              {(['ubud', 'tychi', 'savana'] as LocationKey[]).map((key) => {
                const loc = locations[key];

                return (
                  <div key={key} className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="font-black text-sm text-slate-950 font-outfit uppercase">
                        Lokasi: {loc.name}
                      </span>
                      <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full border border-blue-300">
                        {key.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-900 mb-1">Nama Hotel / Tempat:</label>
                        <input
                          type="text"
                          value={loc.name}
                          onChange={(e) => {
                            updateLocation(key, { name: e.target.value });
                            triggerSaveNotification();
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-900 mb-1">Tiket Masuk HTM (Rp / sesi):</label>
                        <input
                          type="number"
                          value={loc.htm}
                          onChange={(e) => {
                            updateLocation(key, { htm: Number(e.target.value) });
                            triggerSaveNotification();
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
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
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-900 mb-1">Jam Sesi Operasional:</label>
                        <input
                          type="text"
                          value={loc.hours}
                          onChange={(e) => {
                            updateLocation(key, { hours: e.target.value });
                            triggerSaveNotification();
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
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
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-900 mb-1">Deskripsi Ringkas:</label>
                        <textarea
                          rows={2}
                          value={loc.description}
                          onChange={(e) => {
                            updateLocation(key, { description: e.target.value });
                            triggerSaveNotification();
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
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
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs text-slate-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Kelola Biaya Les:</strong> Ubah harga paket Privat (1-on-1) dan Reguler untuk 4x dan 8x pertemuan.
                </span>
              </div>

              {/* Privat Rates */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-4">
                <h4 className="font-black text-sm text-slate-950 font-outfit uppercase border-b border-slate-200 pb-2">
                  Paket Privat (1 Pelatih : 1 Peserta)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                    <label className="block font-bold text-slate-900 mb-1">Privat 4x Pertemuan (Rp):</label>
                    <input
                      type="number"
                      value={courseRates.privat[4].price}
                      onChange={(e) => {
                        updateCourseRate('privat', 4, Number(e.target.value));
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      Per Sesi: Rp {courseRates.privat[4].perSession.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                    <label className="block font-bold text-slate-900 mb-1">Privat 8x Pertemuan (Rp):</label>
                    <input
                      type="number"
                      value={courseRates.privat[8].price}
                      onChange={(e) => {
                        updateCourseRate('privat', 8, Number(e.target.value), courseRates.privat[8].discount);
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      Per Sesi: Rp {courseRates.privat[8].perSession.toLocaleString('id-ID')}
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
                  <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                    <label className="block font-bold text-slate-900 mb-1">Reguler 4x Pertemuan (Rp):</label>
                    <input
                      type="number"
                      value={courseRates.reguler[4].price}
                      onChange={(e) => {
                        updateCourseRate('reguler', 4, Number(e.target.value));
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      Per Sesi: Rp {courseRates.reguler[4].perSession.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                    <label className="block font-bold text-slate-900 mb-1">Reguler 8x Pertemuan (Rp):</label>
                    <input
                      type="number"
                      value={courseRates.reguler[8].price}
                      onChange={(e) => {
                        updateCourseRate('reguler', 8, Number(e.target.value), courseRates.reguler[8].discount);
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                    />
                    <span className="text-[11px] text-slate-500 font-medium block mt-1">
                      Per Sesi: Rp {courseRates.reguler[8].perSession.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ADMIN CONTACTS */}
          {activeTab === 'kontak' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs text-slate-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Kelola Nomor WhatsApp:</strong> Ubah nomor WhatsApp pelatih/admin yang menerima pesanan (Sistem 50:50 Rotation).
                </span>
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
                    placeholder="Contoh: 082142698440"
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
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
                    placeholder="Contoh: 08995911927"
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 p-5 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Kembalikan semua data ke pengaturan brosur awal?')) {
                resetToDefault();
                triggerSaveNotification();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-700 font-bold text-xs transition-all w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Ke Default Brosur</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all w-full sm:w-auto justify-center"
          >
            <Save className="w-4 h-4" />
            <span>Tutup & Terapkan Ke Web</span>
          </button>
        </div>

      </div>
    </div>
  );
};
