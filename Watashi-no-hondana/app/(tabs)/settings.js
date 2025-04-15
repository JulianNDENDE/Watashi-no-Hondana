import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'tamagui';
import ProfileSettingsButton from '../../components/settings/profile/ProfileSettingsButton';
import LanguageSettingsButton from '../../components/settings/language/LanguageSettingsButton';

const Settings = () => {
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.val, padding: 16 }}>
      <ProfileSettingsButton />
      {/* <LanguageSettingsButton /> */}
    </ScrollView>
  );
};

export default Settings;
