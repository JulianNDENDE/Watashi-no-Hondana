import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, useTheme } from 'tamagui'
import Slider from '@react-native-community/slider'

export const BrightnessMenu = ({ visible, brightness, onChangeBrightness, onClose }) => {
  const theme = useTheme()
  const [localBrightness, setLocalBrightness] = useState(brightness)

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
      <View flexDirection="row" justifyContent="space-between" marginBottom={10}>
        <Text fontSize={16} fontWeight="bold" color={theme.color.val}>
          Custom brightness
        </Text>
        <Text color={theme.color.val}>{Math.round(localBrightness)}</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40, marginBottom: 10 }}
        value={localBrightness}
        minimumValue={0}
        maximumValue={100}
        onValueChange={setLocalBrightness}
        minimumTrackTintColor={theme.primary.val}
        maximumTrackTintColor={theme.border.val}
        thumbTintColor={theme.primary.val}
      />
      {/* Additional filters (optional) */}
      <Text fontSize={16} fontWeight="bold" color={theme.color.val} marginTop={10}>
        Custom filter
      </Text>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <Text color={theme.color.val}>Grayscale</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginVertical: 5 }}>
        <Text color={theme.color.val}>Inverted</Text>
      </TouchableOpacity>
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
        onPress={() => {
          onChangeBrightness(localBrightness)
          onClose()
        }}
      >
        <Text color="#fff">Apply</Text>
      </TouchableOpacity>
    </View>
  )
}
