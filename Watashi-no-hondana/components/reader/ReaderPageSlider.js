import React from 'react'
import { View, Text, useTheme } from 'tamagui'
import Slider from '@react-native-community/slider'

export const ReaderPageSlider = ({ currentPage, onChangePage, maxPages = 100 }) => {
  const theme = useTheme()

  return (
    <View
      position="absolute"
      bottom={100}
      left={0}
      right={0}
      alignItems="center"
      backgroundColor={`${theme.backgroundStrong.val}90`}
      opacity={0.8}
      borderRadius={50}
      padding={10}
    >
      <Slider
        style={{ width: 300, height: 40 }}
        value={currentPage}
        minimumValue={1}
        maximumValue={maxPages}
        step={1}
        onValueChange={onChangePage}
        minimumTrackTintColor={theme.primary.val}
        maximumTrackTintColor={theme.border.val}
        thumbTintColor={theme.primary.val}
      />
      <Text fontSize={14} color={theme.color.val}>
        Page {currentPage}
      </Text>
    </View>
  )
}
