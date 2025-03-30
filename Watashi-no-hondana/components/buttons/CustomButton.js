import React from 'react';
import { Button, useTheme } from 'tamagui';

export default function CustomButton({ title, onPress, ...props }) {
  const theme = useTheme();

  return (
    <Button
      backgroundColor={theme.primary}
      color="white"
      fontSize="$4"
      fontWeight="bold"
      onPress={onPress}
      padding="$2"
      borderRadius="$4"
      marginTop="$4"
      {...props}
    >
      {title}
    </Button>
  );
}
