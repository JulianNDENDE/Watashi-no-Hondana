import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, useTheme } from 'tamagui'

const readingModes = [
  'Paged (left to right)',
  'Paged (right to left)',
  'Paged (vertical)',
  'Long strip',
  'Long strip with gaps',
]

export const ReadingModeMenu = ({ visible, currentMode, onSelectMode, onClose }) => {
  const theme = useTheme()

  if (!visible) return null

  return (
    <View
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      padding={20}
      backgroundColor={theme.backgroundStrong.val}
      zIndex={1000}
    >
      <Text fontSize={16} fontWeight="bold" color={theme.color.val} marginBottom={10}>
        Reading mode
      </Text>
      {readingModes.map((mode) => (
        <TouchableOpacity
          key={mode}
          onPress={() => onSelectMode(mode)}
          style={{ marginVertical: 5 }}
        >
          <Text color={mode === currentMode ? theme.primary.val : theme.color.val}>
            {mode}
          </Text>
        </TouchableOpacity>
      ))}
      {/* "Apply" Button */}
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          backgroundColor: theme.primary.val,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 6,
          marginTop: 10,
        }}
        onPress={onClose}
      >
        <Text color="#fff">Apply</Text>
      </TouchableOpacity>
    </View>
  )
}
