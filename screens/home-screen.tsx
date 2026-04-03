import OtpCard from '@/components/otp/otpCard';
import { useOtp } from '@/context/otp-context';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreenR() {
    const router = useRouter();
    const { items, removeItem } = useOtp();
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => router.navigate('/addManual')}>
                    <Text style={styles.primaryBtnText}>Add Manual</Text>
                </TouchableOpacity>
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyTitle}>No OTP accounts yet</Text>
                    <Text style={styles.emptyText}>Add manually or scan a QR code.</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <OtpCard item={item} onDelete={() => removeItem(item.id)} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: '700',
    },
    secondaryBtn: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    secondaryBtnText: {
        color: '#111827',
        fontWeight: '700',
    },
    emptyBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 6,
    },
    emptyText: {
        color: '#6b7280',
    },
});