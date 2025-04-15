import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'tamagui';
import { Home, Search, Settings } from '@tamagui/lucide-icons';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.val,
        },
        headerTintColor: theme.color.val,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.backgroundLight.val,
        },
        tabBarLabelStyle: { fontWeight: 'bold', color: theme.color.val },
        tabBarActiveTintColor: theme.primary.val,
        tabBarInactiveTintColor: theme.colorMuted.val,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
