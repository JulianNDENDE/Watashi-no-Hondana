import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, useTheme } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'

export const ReaderHeader = ({ onBack, chapterTitle, chapterNumber }) => {
  const theme = useTheme()

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        height: 80,
        backgroundColor:`${theme.backgroundStrong.val}90`,
        opacity: 0.8,
        zIndex: 600,
      }}
      flexDirection="row"
      alignItems="flex-end"
    >
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={theme.color.val} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Text fontSize={16} fontWeight="bold" color={theme.color.val}>
          {chapterTitle} - Chapter {chapterNumber}
        </Text>
      </View>
    </View>
  )
}
