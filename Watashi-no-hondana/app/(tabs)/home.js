import React from 'react';
import { View } from 'tamagui';
import { useTheme } from 'tamagui';
import FavoriteMangaGrid from '../../components/Favorites/FavoriteMangaGrid';

const Home = () => {
  const theme = useTheme();

  return (
    <View padding={16} backgroundColor={theme.background.val} height="100%">
      <FavoriteMangaGrid />
    </View>
  );
};

export default Home;
