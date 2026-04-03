import { IconSymbol } from '@/components/ui/icon-symbol'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ title: "Home", headerBackButtonDisplayMode: 'minimal', tabBarIcon: ({ focused }) => IconSymbol({ name: "house.fill", color: focused ? "blue" : "gray", size: 24 }) }} />
            <Tabs.Screen name="scanner" options={{ title: "Scan QR", tabBarIcon: ({ focused }) => IconSymbol({ name: "qrcode.viewfinder", color: focused ? "blue" : "gray", size: 24 }) }} />
        </Tabs>
    )
}

export default TabsLayout