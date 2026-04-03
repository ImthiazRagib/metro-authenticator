import { OtpItem } from '../types/otp';

export function parseOtpAuthUrl(uri: string): OtpItem | null {
  try {
    if (!uri.startsWith('otpauth://totp/')) return null;

    const [, rest] = uri.split('otpauth://totp/');
    const [labelPart, queryString] = rest.split('?');

    const labelDecoded = decodeURIComponent(labelPart || '');
    const params = new URLSearchParams(queryString || '');

    const secret = params.get('secret') || '';
    const issuerFromQuery = params.get('issuer') || '';
    const digits = Number(params.get('digits') || 6);
    const period = Number(params.get('period') || 30);

    let issuer = issuerFromQuery;
    let label = labelDecoded;

    if (labelDecoded.includes(':')) {
      const parts = labelDecoded.split(':');
      issuer = issuer || parts[0];
      label = parts.slice(1).join(':');
    }

    if (!secret) return null;

    return {
      id: `${Date.now()}`,
      issuer: issuer || 'Unknown',
      label: label || 'Account',
      secret,
      digits,
      period,
      algorithm: 'SHA1',
    };
  } catch {
    return null;
  }
}