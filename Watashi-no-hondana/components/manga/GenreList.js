import React from "react";
import { ScrollView } from "react-native";
import { View, Text, useTheme } from "tamagui";

const GenreList = ({ tags }) => {
  const theme = useTheme();
  const genres = tags?.length > 0 ? tags : ["Unknown"];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
      {genres.map((genre, index) => (
        <View
          key={index}
          padding={8} margin={5} borderRadius={5}
          borderColor={theme.primary} borderWidth={1}
          backgroundColor="transparent"
        >
          <Text color={theme.color}>{genre}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default GenreList;
