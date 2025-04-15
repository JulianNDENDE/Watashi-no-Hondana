import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, useTheme } from 'tamagui';
import { useUser } from '../../context/UserContext';
import UserProfileForm from '../../components/settings/profile/UserProfileForm';
import PasswordChangeForm from '../../components/settings/profile/PasswordChangeForm';
import LogoutButton from '../../components/buttons/LogoutButton';
import DeleteAccountButton from '../../components/buttons/DeleteAccountButton';

export default function ProfileSettingsScreen() {
  const theme = useTheme();
  const { user } = useUser(); 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.val, padding: 16 }}>
      <Text fontSize={22} fontWeight="bold" color={theme.color.val} marginBottom={20}>
        Profile Settings
      </Text>
      <UserProfileForm />
      <PasswordChangeForm />
      <View marginTop={30}>
        <LogoutButton />
        <DeleteAccountButton />
      </View>
    </ScrollView>
  );
}
