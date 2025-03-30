import React from 'react';
import { View, Text, useTheme  } from 'tamagui';

const Home = () => {
  const theme = useTheme();

  return (
    <View padding={16} backgroundColor={theme.background.val} height={'100%'}>
      <Text fontSize={24} color={theme.color.val}>
        Welcome to the Home Screen!
      </Text>
    </View>
  );
};

export default Home;
