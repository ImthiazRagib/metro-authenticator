// Expo SecureStore is the documented encrypted local storage option.
import * as SecureStore from 'expo-secure-store';
import { OtpItem } from '../types/otp';

const OTP_STORAGE_KEY = 'otp_accounts';

export const saveOtps = async (items: OtpItem[]) => {
  await SecureStore.setItemAsync(OTP_STORAGE_KEY, JSON.stringify(items));
};

export const loadOtps = async (): Promise<OtpItem[]> => {
  const raw = await SecureStore.getItemAsync(OTP_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};