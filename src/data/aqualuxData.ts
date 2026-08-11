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
    comment: 'Awalnya Albi takut dan nangis kalau disuruh masuk kolam. Alhamdulillah setelah 3x pertemuan sama Coach Faqih, anaknya malah ketagihan renang dan udah berani meluncur sendiri. Pembawakan pelatihnya sabar dan ramah.',
    rating: 5,
    avatar: './aqualux-logo.png',
    outcomeBadge: 'Bisa Mengapung 4x Pertemuan'
  },
  {
    id: '2',
    name: 'Mas Bagas',
    role: 'Persiapan Fisik Tes Kedinasan',
    category: 'Persiapan Fisik',
    comment: 'Awalnya renang 50m saya sering kehabisan napas di tengah kolam. Setelah dibimbing intensif sama Coach Abed, pernapasan jadi lebih teratur dan fisik jauh lebih siap untuk tes renang.',
    rating: 5,
    avatar: './aqualux-logo.png',
    outcomeBadge: 'Stamina & Fisik Renang Meningkat'
  },
  {
    id: '3',
    name: 'Dini Rahmadani',
    role: 'Lulusan Sekolah (20 th)',
    category: 'Dewasa Pemula',
    comment: 'Sempat minder mau les renang pas baru lulus sekolah, takut canggung diajarin pas udah gede. Pas cobain privat sama Coach Abed di Hotel Tychi, suasananya enak banget, santai, dan coach-nya telaten ngajarin dari nol. Sekarang udah berani dan lancar gaya dada!',
    rating: 5,
    avatar: './aqualux-logo.png',
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
    answer: 'Durasi 1 kali pertemuan adalah 1 Jam 15 Menit. Durasi ini sudah dirancang ideal agar peserta mendapat pemanasan cukup, materi teknik berenang, dan pendinginan. **Peserta diharapkan hadir 15 menit sebelum latihan dimulai untuk melakukan stretching.**',
    category: 'teknis'
  },
  {
    question: 'Bagaimana jika peserta sakit atau berhalangan hadir?',
    answer: 'Jadwal sesi bisa di-reschedule (dijadwalkan ulang) dengan syarat mengonfirmasi kepada Coach minimal H-1 sebelum sesi dimulai.',
    category: 'jadwal'
  },
  {
    question: 'Apakah biaya kursus sudah termasuk tiket masuk kolam renang?',
    answer: 'Belum. **Note: Harga paket kursus belum termasuk tiket masuk kolam renang!** Tiket masuk kolam (HTM) dibayarkan secara terpisah oleh peserta di loket hotel/kolam renang pada setiap kedatangan.',
    category: 'harga'
  },
  {
    question: 'Berapa lama sampai anak/peserta bisa berenang?',
    answer: 'Progres setiap peserta tidak bisa dipastikan secara mutlak karena sangat bergantung pada tumbuh kembang motorik, keberanian, dan kecepatan adaptasi air masing-masing anak. Namun secara umum, rata-rata peserta sudah bisa mengapung & meluncur mandiri dalam 4x pertemuan, serta menguasai 1 gaya penuh dalam 8x pertemuan.',
    category: 'garansi'
  },
  {
    question: 'Apa saja perlengkapan yang perlu dibawa saat latihan renang?',
    answer: 'Berikut perlengkapan yang **perlu dibawa** peserta saat datang latihan:\n• Pakaian Renang\n• Kacamata Renang\n• Handuk\n• Air Minum',
    category: 'teknis'
  },
  {
    question: 'Apakah peralatan renang & pelampung difasilitasi oleh Aqualux?',
    answer: 'Ya, pihak kursus Aqualux **memfasilitasi peralatan latihan** yang dapat digunakan peserta selama sesi bimbingan, antara lain:\n• Pelampung\n• Pool Buoy\n• Pelampung Punggung\n\nPeserta tidak perlu membeli pelampung sendiri.',
    category: 'teknis'
  },
  {
    question: 'Apakah jadwal latihan bisa ditentukan sesuai waktu luang kami/anak?',
    answer: 'Ya, jadwal bimbingan **sangat fleksibel**. Anda dapat memilih hari dan jam latihan (sesi pagi atau sore) sesuai kesepakatan dengan Coach.',
    category: 'jadwal'
  },
  {
    question: 'Apakah orang tua boleh mendampingi anak saat latihan di pinggir kolam?',
    answer: 'Sangat diperbolehkan. Orang tua dapat duduk santai di area tribun atau kafe/restoran kolam hotel untuk **memantau langsung** perkembangan anak selama sesi bimbingan.',
    category: 'teknis'
  },
  {
    question: 'Bagaimana jika anak sangat takut air atau punya trauma?',
    answer: 'Pelatih Aqualux terlatih menangani anak takut air dengan **metode yang aman & ramah** (water familiarity). Latihan dilakukan secara bertahap tanpa paksaan hingga anak merasa nyaman dan percaya diri.',
    category: 'teknis'
  },
  {
    question: 'Berapa lama masa berlaku untuk paket 4x atau 8x pertemuan?',
    answer: 'Masa berlaku paket adalah **1-2 bulan** sejak sesi pertama dimulai. Jika peserta berhalangan hadir atau sakit, sesi latihan tidak hangus dan bisa di-reschedule.',
    category: 'jadwal'
  }
];
