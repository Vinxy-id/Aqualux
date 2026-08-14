import { LocationInfo, ClassType, SessionCount, LocationKey, CategoryProgram, CoachAchievement, Testimonial, FAQItem, GalleryItem } from '../types';

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
    image: './images/hotel-ubud.webp',
    mapUrl: 'https://maps.google.com/?q=Ubud+Hotel+Cottages+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Ubud%20Hotel%20%26%20Cottages%20Malang%20Sigura%20Gura&t=&z=16&ie=UTF8&iwloc=&output=embed'
  },
  tychi: {
    key: 'tychi',
    name: 'Hotel Tychi Malang',
    htm: 30000,
    days: 'Setiap Hari (Fleksibel)',
    hours: '06.00 – 17.00 WIB',
    badge: 'Favorit Peserta',
    address: 'Jl. Jaksa Agung Suprapto No.17, Rampal Celaket, Klojen, Kota Malang',
    description: 'Kolam renang bernuansa privat di pusat kota dengan fasilitas lengkap, kamar ganti bersih dan nyaman.',
    image: './images/hotel-tychi.webp',
    mapUrl: 'https://maps.google.com/?q=Tychi+Hotel+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Tychi%20Hotel%20Malang%20Jaksa%20Agung%20Suprapto&t=&z=16&ie=UTF8&iwloc=&output=embed'
  },
  savana: {
    key: 'savana',
    name: 'Hotel Savana Malang',
    htm: 50000,
    days: 'Setiap Hari (Kecuali Selasa Libur)',
    hours: '06.00 – 17.00 WIB',
    badge: 'Include Makan & Minum',
    address: 'Jl. Letjen Sutoyo No.32-34, Rampal Celaket, Klojen, Kota Malang',
    description: 'Fasilitas premium bintang 4. HTM Rp50.000 sudah termasuk voucher makan & minum gratis di hotel.',
    image: './images/hotel-savana.webp',
    mapUrl: 'https://maps.google.com/?q=Savana+Hotel+Convention+Malang',
    embedMapUrl: 'https://maps.google.com/maps?q=Savana%20Hotel%20%26%20Convention%20Malang%20Letjen%20Sutoyo&t=&z=16&ie=UTF8&iwloc=&output=embed'
  }
};

export const COURSE_RATES: Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>> = {
  privat: {
    4: { price: 500000, perSession: 125000 },
    8: { price: 850000, perSession: 106250, discount: 'Hemat & Terjangkau!' }
  },
  reguler: {
    4: { price: 350000, perSession: 87500 },
    8: { price: 550000, perSession: 68750, discount: 'Hemat & Terjangkau!' }
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
    title: 'Anak Mulai Usia 5 Tahun',
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
      'Mengatasi Trauma & Takut Air',
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
    avatar: './aqualux-icon.webp',
    outcomeBadge: 'Bisa Mengapung 4x Pertemuan'
  },
  {
    id: '2',
    name: 'Mas Bagas',
    role: 'Persiapan Fisik Tes Kedinasan',
    category: 'Persiapan Fisik',
    comment: 'Awalnya renang 50m saya sering kehabisan napas di tengah kolam. Setelah dibimbing intensif sama Coach Abed, pernapasan jadi lebih teratur dan fisik jauh lebih siap untuk tes renang.',
    rating: 5,
    avatar: './aqualux-icon.webp',
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
  },
  {
    question: 'Apakah biaya kursus renang bisa dibayar per pertemuan?',
    answer: 'Mohon maaf, **pembayaran tidak bisa dilakukan per pertemuan**. Seluruh pembayaran biaya bimbingan di Aqualux dilakukan sekaligus di awal untuk **paket bulanan (4x atau 8x pertemuan)** sebelum program bimbingan dimulai.',
    category: 'harga'
  }
];

export const INITIAL_GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sesi Latihan Adaptasi Air & Pengenalan Anak',
    description: 'Dokumentasi anak usia 5 tahun belajar meluncur dan pernapasan mandiri di kolam Ubud Hotel Malang.',
    type: 'photo',
    category: 'anak',
    thumbnailUrl: './images/carousel-kids.webp',
    mediaUrl: './images/carousel-kids.webp',
    locationBadge: 'Hotel Ubud Malang',
    dateAdded: '2026-08-01'
  },
  {
    id: 'gal-2',
    title: 'Drill Kecepatan & Stamina Tes TNI/Polri',
    description: 'Sesi time trial 50m gaya dada & gaya bebas khusus peserta persiapan seleksi fisik kedinasan.',
    type: 'photo',
    category: 'kedinasan',
    thumbnailUrl: './images/carousel-tni.webp',
    mediaUrl: './images/carousel-tni.webp',
    locationBadge: 'Hotel Tychi Malang',
    dateAdded: '2026-08-05'
  },
  {
    id: 'gal-3',
    title: 'Pendampingan Sesi Privat 1-on-1 Pelatih Berlisensi',
    description: 'Coach memberikan evaluasi teknik dorongan kaki dan pernapasan secara intensif dan sabar.',
    type: 'photo',
    category: 'teknik',
    thumbnailUrl: './images/carousel-coach.webp',
    mediaUrl: './images/carousel-coach.webp',
    locationBadge: 'Hotel Savana Malang',
    dateAdded: '2026-08-08'
  },
  {
    id: 'gal-4',
    title: 'Video Highlight Sesi Latihan Anak & Pemula',
    description: 'Tonton cuplikan keceriaan anak-anak belajar mengapung dan berenang dengan gembira.',
    type: 'video',
    category: 'anak',
    thumbnailUrl: './images/carousel-kids.webp',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '00:45',
    locationBadge: 'Hotel Ubud Malang',
    dateAdded: '2026-08-10'
  },
  {
    id: 'gal-5',
    title: 'Suasana Nyaman & Clean di Kolam Hotel Tychi',
    description: 'Fasilitas kolam renang outdoor yang bersih, ramah keluarga, dan terjaga privasinya.',
    type: 'photo',
    category: 'suasana',
    thumbnailUrl: './images/hotel-tychi.webp',
    mediaUrl: './images/hotel-tychi.webp',
    locationBadge: 'Hotel Tychi Malang',
    dateAdded: '2026-08-12'
  },
  {
    id: 'gal-6',
    title: 'Video Drill Teknik Streamline & Pernapasan',
    description: 'Tutorial posisi tubuh meluncur lurus (streamline) untuk efisiensi kayuhan gaya dada.',
    type: 'video',
    category: 'teknik',
    thumbnailUrl: './images/carousel-coach.webp',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '01:15',
    locationBadge: 'Hotel Savana Malang',
    dateAdded: '2026-08-13'
  }
];
