import { ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES } from '../data/aqualuxData';

const DEFAULT_ADMIN_NUMBERS = [
  { name: 'Faqih', phone: '6282142698440' },
  { name: 'Abed', phone: '628995911927' }
];

function sanitizePhone(phoneStr: string): string {
  const digits = phoneStr.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '62' + digits.slice(1);
  }
  return digits;
}

export function getRotatedAdminPhone(): string {
  let adminNumbers = DEFAULT_ADMIN_NUMBERS;
  try {
    const savedContacts = localStorage.getItem('aqualux_admin_contacts_v1');
    if (savedContacts) {
      const parsed = JSON.parse(savedContacts);
      if (parsed.faqihPhone || parsed.abedPhone) {
        adminNumbers = [
          { name: 'Faqih', phone: sanitizePhone(parsed.faqihPhone || '082142698440') },
          { name: 'Abed', phone: sanitizePhone(parsed.abedPhone || '08995911927') }
        ];
      }
    }
  } catch (e) {
    // Fallback
  }

  try {
    const lastIndexStr = localStorage.getItem('aqualux_wa_index');
    const lastIndex = lastIndexStr ? parseInt(lastIndexStr, 10) : 0;
    const nextIndex = (lastIndex + 1) % adminNumbers.length;
    localStorage.setItem('aqualux_wa_index', nextIndex.toString());
    return adminNumbers[nextIndex].phone;
  } catch (e) {
    return adminNumbers[0].phone;
  }
}

export function buildWhatsAppUrl(
  categoryName: string,
  classType: ClassType,
  sessions: SessionCount,
  locationKey: LocationKey,
  phoneOverride?: string
): string {
  const phone = phoneOverride || getRotatedAdminPhone();
  const location = LOCATIONS_DATA[locationKey];
  const rateInfo = COURSE_RATES[classType][sessions];
  
  const classLabel = classType === 'privat' ? 'Privat (1-on-1)' : 'Reguler (3-4 Orang)';
  const totalHtm = location.htm * sessions;
  const grandTotal = rateInfo.price + totalHtm;

  const textMessage = `Halo Admin Aqualux, saya tertarik konsultasi / ambil slot kursus renang.\n\n` +
    `[DETAIL PILIHAN SAYA]\n` +
    `• Kategori: ${categoryName}\n` +
    `• Tipe Kelas: ${classLabel}\n` +
    `• Jumlah Pertemuan: ${sessions}x Pertemuan (1 Jam 15 Menit/sesi)\n` +
    `• Pilihan Lokasi: ${location.name} (HTM Rp${location.htm.toLocaleString('id-ID')}/sesi)\n\n` +
    `[RINCIAN ESTIMASI BIAYA]\n` +
    `• Kursus Aqualux: Rp ${rateInfo.price.toLocaleString('id-ID')}\n` +
    `• Est. Tiket Kolam: Rp ${totalHtm.toLocaleString('id-ID')} (${sessions}x @Rp${location.htm.toLocaleString('id-ID')})\n` +
    `• TOTAL ESTIMASI: Rp ${grandTotal.toLocaleString('id-ID')}\n\n` +
    `Bisa bantu cek ketersediaan jam & slot coach minggu ini? Terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(textMessage)}`;
}

export function buildGeneralWhatsAppUrl(messageCustom?: string): string {
  const phone = getRotatedAdminPhone();
  const msg = messageCustom || "Halo Admin Aqualux, saya mau tanya-tanya informasi kursus renang privat/reguler di Malang.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
