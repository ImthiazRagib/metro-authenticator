import { useOtp } from '@/context/otp-context';
import { parseOtpAuthUrl } from '@/utils/otpAuth';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannerScreen() {
    const router = useRouter()
  const { addItem } = useOtp();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const onScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    const parsed = parseOtpAuthUrl(data);

    if (!parsed) {
      Alert.alert('Invalid QR', 'This QR code is not a valid OTPAuth QR.');
      setScanned(false);
      return;
    }

    await addItem(parsed);
    Alert.alert('Success', 'OTP account imported from QR code.', [
      {
        text: 'OK',
        onPress: () => router.canGoBack() ? router.back() : router.push('/'),
      },
    ]);
  };

  if (!permission) {
    return <View style={styles.center}><Text>Loading camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionTitle}>Camera permission required</Text>
        <Text style={styles.permissionText}>Allow camera access to scan OTP QR codes.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : onScanned}
      />

      {scanned && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  permissionText: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
});