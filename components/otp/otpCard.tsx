import { OtpItem } from '@/types/otp';
import { generateTOTP, getSecondsRemaining } from '@/utils/otp';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  item: OtpItem;
  onDelete: () => void;
};

export default function OtpCard({ item, onDelete }: Props) {
  const code = generateTOTP(item.secret, item.digits ?? 6, item.period ?? 30);
  const secondsLeft = getSecondsRemaining(item.period ?? 30);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.issuer}>{item.issuer}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.code}>{code}</Text>
      <Text style={styles.timer}>Refresh in {secondsLeft}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  issuer: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  code: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 3,
    color: '#2563eb',
  },
  timer: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
  },
  delete: {
    color: '#dc2626',
    fontWeight: '600',
  },
});