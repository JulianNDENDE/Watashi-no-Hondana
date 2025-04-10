import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, useTheme } from 'tamagui'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export const ReaderBottomBar = ({
  onShowReadingModeMenu,
  onNextChapter,
  onPrevChapter,
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
      borderTopWidth={1}
      borderTopColor={theme.border.val}
    >
      {/* Previous Chapter Arrow */}
      <TouchableOpacity onPress={onPrevChapter}>
        <Ionicons name="arrow-back-circle" size={28} color={theme.color.val} />
      </TouchableOpacity>

      {/* Reading Mode Icon */}
      <TouchableOpacity onPress={onShowReadingModeMenu}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={28}
          color={theme.color.val}
        />
      </TouchableOpacity>

      {/* Next Chapter Arrow */}
      <TouchableOpacity onPress={onNextChapter}>
        <Ionicons name="arrow-forward-circle" size={28} color={theme.color.val} />
      </TouchableOpacity>
    </View>
  )
}
