import { ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES } from '../data/aqualuxData';

export function sanitizePhone(phoneStr: string): string {
  const digits = (phoneStr || '').replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '62' + digits.slice(1);
  }
  return digits;
}

export function buildWhatsAppMessageText(
  categoryName: string,
  classType: ClassType,
  sessions: SessionCount,
  locationKey: LocationKey
): string {
  const location = LOCATIONS_DATA[locationKey];
  const rateInfo = COURSE_RATES[classType][sessions];
  
  const classLabel = classType === 'privat' ? 'Privat (1-on-1)' : 'Reguler (3-4 Orang)';
  const totalHtm = location.htm * sessions;
  const grandTotal = rateInfo.price + totalHtm;

  return `Halo Admin Aqualux, saya tertarik konsultasi / ambil slot kursus renang.\n\n` +
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
}

export function buildWhatsAppUrlForPhone(phone: string, textMessage: string): string {
  const clean = sanitizePhone(phone);
  return `https://wa.me/${clean}?text=${encodeURIComponent(textMessage)}`;
}

// Fallback legacy functions for backwards compatibility
export function buildWhatsAppUrl(
  categoryName: string,
  classType: ClassType,
  sessions: SessionCount,
  locationKey: LocationKey,
  phoneOverride?: string
): string {
  const message = buildWhatsAppMessageText(categoryName, classType, sessions, locationKey);
  const phone = phoneOverride || '6282142698440';
  return buildWhatsAppUrlForPhone(phone, message);
}

export function buildGeneralWhatsAppUrl(messageCustom?: string): string {
  const msg = messageCustom || "Halo Admin Aqualux, saya mau tanya-tanya informasi kursus renang privat/reguler di Malang.";
  return buildWhatsAppUrlForPhone('6282142698440', msg);
}
