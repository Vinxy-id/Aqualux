import { LocationInfo, ClassType, SessionCount, LocationKey, CategoryProgram, CoachAchievement, Testimonial, FAQItem } from '../types';

export const LOCATIONS_DATA: Record<LocationKey, LocationInfo> = {
  ubud: {
    key: 'ubud',
    name: 'Hotel Ubud Malang',
    htm: 25000,
    days: 'Setiap Hari (Fleksibel)',
    hours: '06.00 – 17.00 WIB',
    badge: 'Paling Terjangkau',
    address: 'Jl. Bendungan Sigura-Gura No.6, Karangbesuki, Sukun, Kota Malang',
    description: 'Suasana tenang dengan kolam renang outdoor bersih dan asri. Sangat cocok untuk anak-anak dan pemula.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Ubud+Hotel+Cottages+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Ubud%20Hotel%20%26%20Cottages%20Malang%20Sigura%20Gura&t=&z=16&ie=UTF8&iwloc=&output=embed'
  },
  tychi: {
    key: 'tychi',
    name: 'Hotel Tychi Malang',
    htm: 30000,
    days: 'Senin – Jumat',
    hours: '06.00 – 17.00 WIB',
    badge: 'Favorit Peserta',
    address: 'Jl. Jaksa Agung Suprapto No.17, Rampal Celaket, Klojen, Kota Malang',
    description: 'Kolam renang bernuansa privat di pusat kota dengan fasilitas lengkap, kamar ganti bersih dan nyaman.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Tychi+Hotel+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Tychi%20Hotel%20Malang%20Jaksa%20Agung%20Suprapto&t=&z=16&ie=UTF8&iwloc=&output=embed'
  },
  savana: {
    key: 'savana',
    name: 'Hotel Savana Malang',
    htm: 50000,
    days: 'Senin, Rabu, Kamis, Jumat',
    hours: '06.00 – 17.00 WIB',
    badge: 'Include Makan & Minum',
    address: 'Jl. Letjen Sutoyo No.32-34, Rampal Celaket, Klojen, Kota Malang',
    description: 'Fasilitas premium bintang 4. HTM Rp50.000 sudah termasuk voucher makan & minum gratis di hotel.',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Savana+Hotel+Convention+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Savana%20Hotel%20%26%20Convention%20Malang%20Letjen%20Sutoyo&t=&z=16&ie=UTF8&iwloc=&output=embed'
  }
};

export const COURSE_RATES: Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>> = {
  privat: {
    4: { price: 600000, perSession: 150000 },
    8: { price: 1000000, perSession: 125000, discount: 'Hemat Rp 200.000!' }
  },
  reguler: {
    4: { price: 400000, perSession: 100000 },
    8: { price: 600000, perSession: 75000, discount: 'Hemat Rp 200.000!' }
  }
};

export const COACH_ACHIEVEMENTS: CoachAchievement[] = [
  { year: '2022', title: 'Juara 1 Estafet Putra', category: 'Popda Finswimming Jatim', medal: 'gold' },
  { year: '2023', title: 'Juara 2 Estafet Mix', category: 'Kejurnas Piala Gubernur Jatim', medal: 'silver' },
  { year: '2023', title: 'Juara 3 Estafet Putra', category: 'Porprov Finswimming Jatim', medal: 'bronze' },
  { year: '2023', title: 'Juara 2 Estafet Mix', category: 'Kejurnas Gubernur Jatim II', medal: 'silver' },
  { year: '2023', title: 'Juara 3 Estafet Putra', category: 'Porprov Jatim Sidoarjo', medal: 'bronze' }
];

export const CATEGORY_PROGRAMS: CategoryProgram[] = [
  {
    id: 'anak',
    title: 'Anak Usia 5+ Tahun',
    target: 'Anak Pemula / Takut Air',
    iconName: 'Baby',
    description: 'Pendekatan berenang yang ramah anak, aman, dan menyenangkan. Mengubah rasa takut air menjadi percaya diri.',
    features: [
      'Water Orientation & Pengenalan Air',
      'Teknik Meluncur & Mengapung Mandiri',
      'Pernapasan & Dasar Gaya Dada/Bebas',
      'Pelatih Sabar & Bersertifikat'
    ],
    popular: true,
    tag: 'Paling Banyak Didaftar'
  },
  {
    id: 'pelajar',
    title: 'Pelajar & Remaja',
    target: 'Usia 12–18 Tahun',
    iconName: 'GraduationCap',
    description: 'Program peningkatan stamina, penyempurnaan gaya renang, serta persiapan ujian olahraga sekolah.',
    features: [
      'Penyempurnaan 4 Gaya Renang',
      'Latihan Stamina & Ketahanan Fisik',
      'Koreksi Teknik Renang Efisien',
      'Target Kecepatan & Evaluasi'
    ],
    tag: 'Kebutuhan Sekolah & Hobi'
  },
  {
    id: 'dewasa',
    title: 'Dewasa & Umum',
    target: 'Usia 19–40+ Tahun',
    iconName: 'UserCheck',
    description: 'Kelas privat khusus dewasa untuk belajar dari nol, mengatasi trauma air, atau terapi kesehatan tulang belakang.',
    features: [
      'Privasi Terjaga di Kolam Hotel',
      'Penyesuaian Pace Belajar Individual',
      'Mengatasi Trauma & Cemas Air',
      'Jadwal Sesi Sangat Fleksibel'
    ],
    tag: 'Privat & Nyaman'
  },
  {
    id: 'tni-polri',
    title: 'Persiapan Tes TNI / Polri',
    target: 'Calon Peserta Ujian Fisik',
    iconName: 'ShieldAlert',
    description: 'Bimbingan intensif target waktu renang 50 meter gaya dada untuk lolos seleksi ketangkasan renang TNI/Polri/Kedinasan.',
    features: [
      'Drill Teknik Gaya Dada Khusus Ujian',
      'Latihan Kecepatan 50 Meter',
      'Simulasi Tes & Time Trial Berkala',
      'Tips Penghematan Tenaga & Pernapasan'
    ],
    popular: true,
    tag: 'Target Lolos Ujian'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Ibu Ratna Pertiwi',
    role: 'Orang Tua dari Albi (6 th)',
    category: 'Anak 5+',
    comment: 'Awalnya Albi nangis kalau disuruh masuk kolam. Setelah 3x pertemuan sama Coach Faqih, sekarang malah nggak mau selesai renang! Pembawakan pelatihnya sabar banget.',
    rating: 5,
    avatar: '/aqualux-logo.png',
    outcomeBadge: 'Bisa Mengapung 4x Pertemuan'
  },
  {
    id: '2',
    name: 'Bagas Wibowo',
    role: 'Pendaftar Bintara Polri 2024',
    category: 'Persiapan TNI/Polri',
    comment: 'Awalnya renang 50m saya 1 menit lebih dan sering kehabisan napas. Dibimbing mas Coach secara intensif, waktu saya tembus 42 detik dan lolos seleksi fisik renang!',
    rating: 5,
    avatar: '/aqualux-logo.png',
    outcomeBadge: 'Lolos Tes Renang Polri'
  },
  {
    id: '3',
    name: 'Dini Rahmadani',
    role: 'Karyawan Swasta (28 th)',
    category: 'Dewasa Pemula',
    comment: 'Sempat takut dipikir bakal malu diajarin pas gede. Ternyata suasana kelas privat di Hotel Tychi nyaman banget dan privat. Coach-nya profesional.',
    rating: 5,
    avatar: '/aqualux-logo.png',
    outcomeBadge: 'Mahir Gaya Dada & Bebas'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Bagaimana cara pembayaran tiket masuk kolam renang (HTM)?',
    answer: 'Biaya kursus dibayarkan langsung ke pihak Aqualux. Sedangkan tiket masuk kolam (HTM) dibayarkan langsung oleh peserta di loket hotel/kolam renang setiap kali kedatangan.',
    category: 'harga'
  },
  {
    question: 'Berapa durasi untuk 1 kali pertemuan?',
    answer: 'Durasi 1 kali pertemuan adalah 1 Jam 15 Menit. Durasi ini sudah dirancang ideal agar peserta mendapat pemanasan cukup, materi teknik, dan pendinginan tanpa kelelahan berlebih.',
    category: 'teknis'
  },
  {
    question: 'Bagaimana jika peserta sakit atau berhalangan hadir?',
    answer: 'Jadwal sesi bisa di-reschedule (dijadwalkan ulang) dengan syarat mengonfirmasi kepada Coach minimal 3-4 jam sebelum sesi dimulai.',
    category: 'jadwal'
  },
  {
    question: 'Apakah pelatih laki-laki atau perempuan?',
    answer: 'Kami memiliki tim pelatih profesional berpengalaman dan bersertifikat. Anda bisa mengonfirmasi kebutuhan pelatih saat berkonsultasi via WhatsApp.',
    category: 'teknis'
  },
  {
    question: 'Berapa lama sampai anak/peserta bisa berenang?',
    answer: 'Rata-rata peserta anak-anak maupun dewasa sudah bisa mengapung dan meluncur mandiri dalam 4x pertemuan, serta menguasai 1 gaya penuh dalam 8x pertemuan.',
    category: 'garansi'
  }
];
