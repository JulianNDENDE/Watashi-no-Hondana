import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileSettingsButton = () => {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push('/settings/profile');
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.backgroundLight.val,
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={handlePress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name="person-outline"
          size={24}
          color={theme.primary.val}
          style={{ marginRight: 10 }}
        />
        <Text fontSize={16} fontWeight="600" color={theme.color.val}>
          Profile
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colorMuted.val} />
    </TouchableOpacity>
  );
};

export default ProfileSettingsButton;
