import React, { useState } from 'react';
import { View, Text } from 'tamagui';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'tamagui';

const LanguageSettingsScreen = () => {
  const theme = useTheme();
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  return (
    <View flex={1} padding={16} backgroundColor={theme.background.val}>
      <Text fontSize={22} fontWeight="bold" color={theme.color.val} marginBottom={10}>
        Language Settings
      </Text>
      <Picker
        selectedValue={language}
        style={{ height: 50, width: 200, color: theme.color.val, backgroundColor: theme.backgroundLight.val }}
        onValueChange={handleLanguageChange}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
      </Picker>
      {/* Optionally add a save button if you want to confirm changes */}
    </View>
  );
};

export default LanguageSettingsScreen;
