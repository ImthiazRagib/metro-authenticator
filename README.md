# 🔐 React Native Authenticator App

A secure and lightweight OTP (One-Time Password) authenticator application built with **React Native (Expo)**.  
This app allows users to generate time-based authentication codes (TOTP), scan QR codes, and securely manage OTP accounts on their device.

---

## 🚀 Features

- 🔐 TOTP (Time-based One-Time Password) generation (RFC 6238)
- 📷 Scan QR codes to add accounts instantly
- ➕ Add OTP accounts manually
- 🔄 Auto-refresh OTP codes every 30 seconds
- 🗑️ Delete OTP accounts
- 🔒 Secure local storage using encrypted device storage
- ⚡ Optimized performance using FlatList (virtualized rendering)
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

- React Native
- Expo
- Expo Router
- SecureStore (Encrypted storage)
- Crypto-based TOTP implementation

---

## 📱 Screens

- OTP List Screen (Home)
- Add OTP (Manual Entry)
- QR Scanner Screen

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/rn-authenticator.git

# Navigate to project
cd rn-authenticator

# Install dependencies
npm install

# Start the app
npx expo start
```

---

## 📷 QR Code Format Supported

This app supports standard OTPAuth URLs:

```
otpauth://totp/Issuer:Account?secret=XXXX&issuer=Issuer
```

---

## 🔐 Security

- Secrets are stored using **Expo SecureStore**
- No external server communication (fully local)
- No sensitive data leaves the device

---

## 📌 Future Improvements

- 🔐 Biometric authentication (Face ID / Fingerprint)
- ☁️ Cloud backup & sync
- 🌙 Dark mode support
- 📋 Copy OTP to clipboard
- 🔎 Search and filter accounts
- 🏷️ Group OTP accounts

---

## 👨‍💻 Author

**Imthiaz Ragib**  
Frontend / Fullstack Developer  

- GitHub: https://github.com/ImthiazRagib
- LinkedIn: https://www.linkedin.com/in/eftekar-raghib/

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.
