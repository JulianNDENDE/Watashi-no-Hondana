import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';
import { StatusBar } from 'react-native';

import { UserProvider } from '../context/UserContext';
import { MangaProvider } from '../context/MangaContext';

import { colors } from '../constants/SCHEME';
import config from '../tamagui.config';

export default function Layout() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(systemColorScheme ?? 'dark');
  }, [systemColorScheme]);

  return (
    <UserProvider>
      <MangaProvider>
        <TamaguiProvider config={config}>
          <StatusBar barStyle="light-content" backgroundColor={theme === 'dark' ? colors.dark.background : colors.light.background} />
          <Theme name={theme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth/login" options={{ title: "Login" }} />
              <Stack.Screen name="auth/register" options={{ title: "Register" }} />
            </Stack>
          </Theme>
        </TamaguiProvider>
      </MangaProvider>
    </UserProvider>
  );
}
