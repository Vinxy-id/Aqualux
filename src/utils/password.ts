const encoder = new TextEncoder();

export const generateSalt = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Hash a password with SHA-256 using a salt.
 * If no salt is provided, a cryptographically random one is generated.
 */
export const hashPassword = async (
  password: string,
  salt?: string
): Promise<{ salt: string; hash: string }> => {
  const usedSalt = salt ?? generateSalt();
  const data = encoder.encode(usedSalt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return { salt: usedSalt, hash };
};

/**
 * Timing-safe string comparison to prevent timing attacks.
 */
export const safeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
};
