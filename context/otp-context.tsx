import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadOtps, saveOtps } from '../storage/otpStorage';
import { OtpItem } from '../types/otp';

type OtpContextType = {
  items: OtpItem[];
  addItem: (item: OtpItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const OtpProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<OtpItem[]>([]);

  const refresh = async () => {
    const stored = await loadOtps();
    setItems(stored);
  };

  useEffect(() => {
    refresh();
  }, []);

  const addItem = async (item: OtpItem) => {
    const next = [...items, item];
    setItems(next);
    await saveOtps(next);
  };

  const removeItem = async (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    await saveOtps(next);
  };

  const value = useMemo(
    () => ({ items, addItem, removeItem, refresh }),
    [items]
  );

  return <OtpContext.Provider value={value}>{children}</OtpContext.Provider>;
};

export const useOtp = () => {
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error('useOtp must be used inside OtpProvider');
  }
  return context;
};