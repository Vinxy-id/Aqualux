const SAFE_EXTERNAL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', 'whatsapp:'];

export const isSafeExternalUrl = (url: string): boolean => {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return SAFE_EXTERNAL_SCHEMES.includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const sanitizeExternalUrl = (url: string): string => {
  return isSafeExternalUrl(url) ? url.trim() : '';
};
