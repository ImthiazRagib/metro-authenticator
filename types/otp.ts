export type OtpItem = {
  id: string;
  issuer: string;
  label: string;
  secret: string;
  digits?: number;
  period?: number;
  algorithm?: 'SHA1';
};