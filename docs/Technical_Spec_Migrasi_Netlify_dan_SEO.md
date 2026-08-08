# TECHNICAL SPEC: Migrasi Netlify (Auth Server-Side) + SEO Optimization

## AQUALUX Swimming Course

---

| Document Attributes | Detail |
| :--- | :--- |
| **Project** | AQUALUX Swimming Course Landing Page |
| **Document Version** | v1.0 (Rencana Implementasi) |
| **Author** | AI Engineering Assistant |
| **Target Audience** | Frontend Developers, DevOps, Admin Team |
| **Primary Goal** | Proteksi admin sungguhan via serverless + optimasi SEO Google |
| **Tanggal** | 2026-08-09 |

---

## 1. LATAR BELAKANG

### 1.1 Masalah Keamanan (Audit)
Audit keamanan menemukan bahwa halaman admin Aqualux saat ini **tidak aman** karena seluruh logika berjalan di client-side:

1. **Sesi admin hanya berupa flag localStorage** — siapa pun bisa masuk tanpa password:
   ```js
   localStorage.setItem('aqualux_admin_session_v1', 'true')
   ```
2. **Semua data admin** (harga, lokasi, kontak, linktree) tersimpan di localStorage — bisa diubah langsung dari DevTools tanpa lewat UI.
3. **Password default hardcoded** `aqualux123` ada di source repo publik.

### 1.2 Keputusan Solusi
- **Pindah ke Netlify** (serverless functions + Netlify Blobs) untuk:
  - Verifikasi password **di server**.
  - Sesi memakai **HttpOnly cookie** (JS/DevTools tidak bisa membaca/memodifikasi).
  - Penyimpanan data di **Netlify Blobs** (bukan localStorage).
- **Optimasi SEO** agar situs cepat terindex dan relevan di pencarian Google untuk kata kunci lokal "kursus renang malang".

---

## 2. ARSITEKTUR TARGET

```
Browser (React SPA)
 ├─ GET  /api/data                  → baca data (publik, landing tetap render)
 ├─ POST /api/auth/login            → verifikasi password server → set HttpOnly cookie
 ├─ POST /api/auth/logout           → hapus cookie
 ├─ POST /api/auth/change-password  → ganti password di server
 └─ PUT  /api/data                  → tulis data (hanya jika cookie sah, HMAC-signed)

Server Function (Node/TS, Netlify Functions)
 ├─ Password  : hash SHA-256 dari env AUTH_PASSWORD_HASH (bukan hardcode di source)
 ├─ Sesi      : token HMAC-signed + expiry di HttpOnly cookie
 └─ Storage   : JSON doc per kunci (mis. "aqualux_data") di Netlify Blobs
```

### 2.1 Kenapa HttpOnly Cookie?
- Menutup bypass #1: tak bisa set flag sesi dari console.
- Menutup bypass #2: `PUT /api/data` ditolak server jika cookie invalid.
- Hardcoded `aqualux123` dihapus total dari source — password hanya ada di env var server.

---

## 3. PHASE 1 — MIGRASI NETLIFY

### 3.1 Struktur File Baru
```
netlify/
  netlify.toml                     # Konfigurasi build & deploy
netlify/
  functions/
    _shared/
      auth.ts                      # Util HMAC signing, verifikasi password, cookie
      store.ts                     # Akses Netlify Blobs (get/set JSON)
    auth-login.ts                  # POST /api/auth/login
    auth-logout.ts                 # POST /api/auth/logout
    auth-me.ts                     # GET  /api/auth/me
    auth-change-password.ts        # POST /api/auth/change-password
    data-get.ts                    # GET  /api/data (publik)
    data-set.ts                    # PUT  /api/data (terproteksi cookie)
```

### 3.2 `netlify.toml` (rencana)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 3.3 Endpoint API
| Endpoint | Metode | Auth | Fungsi |
| :--- | :--- | :--- | :--- |
| `/api/data` | GET | Publik | Baca seluruh data (locations, rates, contacts, linkbio) |
| `/api/data` | PUT | Cookie valid | Simpan seluruh data (merge/overwrite) |
| `/api/auth/login` | POST | - | Verifikasi password → set HttpOnly cookie |
| `/api/auth/logout` | POST | Cookie | Hapus cookie sesi |
| `/api/auth/me` | GET | Cookie | Cek status login (authenticated true/false) |
| `/api/auth/change-password` | POST | Cookie + password lama | Ganti password (hash baru disimpan di env/blob) |

### 3.4 Refactor Kode Frontend
1. **`AuthContext.tsx`**:
   - Hapus `DEFAULT_PASSWORD`, logika hash client, dan kunci localStorage sesi/password.
   - `login` → `POST /api/auth/login` (credentials `same-origin`).
   - Status login inisialisasi dari `GET /api/auth/me` saat mount.
   - `logout` → `POST /api/auth/logout`.
   - `changePassword` → `POST /api/auth/change-password`.
2. **`AqualuxDataContext.tsx`**:
   - Fetch `GET /api/data` saat mount; fallback ke `aqualuxData.ts` bila gagal/offline.
   - Setiap update tetap instant di UI, lalu simpan via `PUT /api/data` (debounce).
   - Tangani 401 → tandai "sesi berakhir" agar UI minta login ulang.
3. **`AdminLogin.tsx`**: alur async; pesan error dari server; lockout tetap (server-side opsional).
4. **`AdminPage.tsx`**: sesuaikan `changePassword` async; tampilkan notifikasi saat PUT ditolak.
5. **`App.tsx`**: tidak berubah struktur routing; hanya konsumsi status auth baru.

### 3.5 Penghapusan & Penyesuaian
- **Hapus** `.github/workflows/deploy.yml` (khusus GitHub Pages).
- **Hapus** `public/CNAME` (custom domain GitHub Pages; tidak relevan di Netlify).
- **Tambah** `.netlify/` ke `.gitignore`.

### 3.6 Environment Variables (di dashboard Netlify, TIDAK di repo)
| Variabel | Keterangan |
| :--- | :--- |
| `AUTH_PASSWORD_HASH` | SHA-256 dari password admin yang disepakati |
| `AUTH_SESSION_SECRET` | String acak panjang untuk HMAC signing |
| `AUTH_SESSION_TTL` | (opsional) Masa berlaku sesi dalam detik, default mis. 86400 |

### 3.7 Data Lama
Data custom yang tersimpan di localStorage **tidak ikut pindah** (per-browser). Setelah migrasi, isi ulang via portal admin; data awal = default di `aqualuxData.ts`.

---

## 4. PHASE 2 — SEO OPTIMIZATION

### 4.1 Kondisi SEO Saat Ini
| Item | Status |
| :--- | :--- |
| Title & meta description | ✅ Ada |
| Meta keywords | ✅ Ada |
| Open Graph | ✅ Ada (tapi `og:url` salah domain) |
| Canonical URL | ❌ Belum ada |
| `robots.txt` | ❌ Belum ada |
| `sitemap.xml` | ❌ Belum ada |
| `404.html` (SPA) | ❌ Belum ada |
| JSON-LD structured data | ❌ Belum ada |
| SSL/HTTPS | ✅ Otomatis oleh Netlify |

### 4.2 Perbaikan Meta & Structured Data
1. **`index.html`**:
   - Perbaiki `og:url` & tambah `<link rel="canonical">` → URL nyata (mis. `https://aqualux.netlify.app/` atau domain custom).
   - Tambah `<meta name="robots" content="index, follow">`.
   - Tambah JSON-LD `LocalBusiness`/`SportsActivityLocation`:
     - Nama, alamat Malang, jam operasional, rating, logo, geo.
   - Tambah JSON-LD `Course` + `Offer`:
     - Paket privat & reguler dengan harga.
2. **`public/sitemap.xml`**: URL utama + `#links`.
3. **`public/robots.txt`**: izinkan semua, arahkan ke sitemap.
4. **`public/404.html`**: redirect SPA ke index agar hash routes tidak 404 di Netlify.

### 4.3 Langkah Google Search Console (setelah deploy)
1. Daftarkan properti dengan domain/subdomain Netlify.
2. Verifikasi (dns/tag meta/html file — Netlify otomatis support).
3. Submit `sitemap.xml`.
4. Request indexing halaman utama.

### 4.4 Catatan Realistis SEO
"Teratas di Google" untuk bisnis lokal butuh juga **Google Business Profile**, review, dan konten konsisten. Bagian teknis (yang dikerjakan di sini) adalah fondasi agar situs terindex cepat & relevan — **bukan jaminan peringkat #1**. Disarankan nanti membeli domain custom (mis. `aqualux.my.id` / `aqualux.id`, ±Rp 100–150rb/tahun) untuk kredibilitas & sinyal lokal, meski bukan syarat wajib terindex.

---

## 5. VERIFIKASI

1. `npm run build` sukses (tsc + vite).
2. Deploy Netlify berhasil (hubungkan repo GitHub → auto deploy).
3. Login admin e2e dengan cookie flow berhasil.
4. Sitemap/robots/JSON-LD lolos validator (mis. validator.schema.org).
5. Halaman landing tetap render normal meski API offline (fallback data default).

---

## 6. DOKUMEN TERKAIT
- `docs/PRD_AQUALUX_Landing_Page.md` — spesifikasi produk landing page.
- `README.md` — panduan umum proyek.
