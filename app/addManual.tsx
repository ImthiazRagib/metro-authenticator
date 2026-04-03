import { useOtp } from '@/context/otp-context';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddManualScreen() {
  const { addItem } = useOtp();
  const router = useRouter();

  const [issuer, setIssuer] = useState('');
  const [label, setLabel] = useState('');
  const [secret, setSecret] = useState('');
  const [digits, setDigits] = useState('6');
  const [period, setPeriod] = useState('30');

  const onSave = async () => {
    if (!issuer.trim() || !label.trim() || !secret.trim()) {
      Alert.alert('Validation', 'Issuer, label, and secret are required.');
      return;
    }

    await addItem({
      id: `${Date.now()}`,
      issuer: issuer.trim(),
      label: label.trim(),
      secret: secret.trim().replace(/\s+/g, ''),
      digits: Number(digits) || 6,
      period: Number(period) || 30,
      algorithm: 'SHA1',
    });

    Alert.alert('Success', 'OTP account added.');
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.label}>Issuer</Text>
          <TextInput
            style={styles.input}
            value={issuer}
            onChangeText={setIssuer}
            placeholder="Google"
          />

          <Text style={styles.label}>Account label</Text>
          <TextInput
            style={styles.input}
            value={label}
            onChangeText={setLabel}
            placeholder="name@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Secret</Text>
          <TextInput
            style={styles.input}
            value={secret}
            onChangeText={setSecret}
            placeholder="JBSWY3DPEHPK3PXP"
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <Text style={styles.label}>Digits</Text>
          <TextInput
            style={styles.input}
            value={digits}
            onChangeText={setDigits}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Period</Text>
          <TextInput
            style={styles.input}
            value={period}
            onChangeText={setPeriod}
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save OTP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});