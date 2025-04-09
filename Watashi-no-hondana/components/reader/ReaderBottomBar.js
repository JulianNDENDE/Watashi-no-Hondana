import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, useTheme } from 'tamagui'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export const ReaderBottomBar = ({
  isRotationEnabled,
  onToggleRotation,
  onShowReadingModeMenu,
  onShowBrightnessMenu,
}) => {
  const theme = useTheme()

  return (
    <View
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      flexDirection="row"
      justifyContent="space-around"
      backgroundColor={`${theme.backgroundStrong.val}90`}
      padding={20}
    >
      {/* Reading Mode Icon */}
      <TouchableOpacity onPress={onShowReadingModeMenu}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={24}
          color={theme.color.val}
        />
      </TouchableOpacity>

      {/* Rotation Icon */}
      <TouchableOpacity onPress={onToggleRotation}>
        <MaterialCommunityIcons
          name={isRotationEnabled ? 'rotate-3d' : 'rotate-3d-variant'}
          size={24}
          color={theme.color.val}
        />
      </TouchableOpacity>

      {/* Brightness Icon */}
      <TouchableOpacity onPress={onShowBrightnessMenu}>
        <Ionicons name="sunny" size={24} color={theme.color.val} />
      </TouchableOpacity>
    </View>
  )
}
