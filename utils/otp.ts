// Simple TOTP generator using crypto-js.
import CryptoJS from 'crypto-js';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32ToBytes(base32: string): number[] {
  const cleaned = base32.replace(/=+$/, '').replace(/\s+/g, '').toUpperCase();
  let bits = '';

  for (const char of cleaned) {
    const val = BASE32_ALPHABET.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }

  return bytes;
}

function bytesToWordArray(bytes: number[]) {
  const words: number[] = [];
  for (let i = 0; i < bytes.length; i += 1) {
    words[(i / 4) | 0] |= bytes[i] << (24 - 8 * (i % 4));
  }
  return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function intToBytes(num: number): number[] {
  const bytes = new Array(8).fill(0);
  for (let i = 7; i >= 0; i--) {
    bytes[i] = num & 0xff;
    num = Math.floor(num / 256);
  }
  return bytes;
}

export function generateTOTP(
  secret: string,
  digits: number = 6,
  period: number = 30
): string {
  const counter = Math.floor(Date.now() / 1000 / period);

  const keyBytes = base32ToBytes(secret);
  const counterBytes = intToBytes(counter);

  const key = bytesToWordArray(keyBytes);
  const message = bytesToWordArray(counterBytes);

  const hmac = CryptoJS.HmacSHA1(message, key);
  const hex = hmac.toString(CryptoJS.enc.Hex);

  const offset = parseInt(hex.slice(-1), 16);
  const binary =
    (parseInt(hex.substr(offset * 2, 8), 16) & 0x7fffffff) % 10 ** digits;

  return binary.toString().padStart(digits, '0');
}

export function getSecondsRemaining(period: number = 30): number {
  const now = Math.floor(Date.now() / 1000);
  return period - (now % period);
}