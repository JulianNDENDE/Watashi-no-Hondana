import React from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "tamagui";
import MangaHeader from "../../components/manga/MangaHeader";
import MangaDescription from "../../components/manga/MangaDescription";
import GenreList from "../../components/manga/GenreList";

const MangaDetails = () => {
  const { manga, coverUrl } = useLocalSearchParams();
  const parsedManga = JSON.parse(manga);
  const theme = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.background.val }}>
      <MangaHeader
        title={parsedManga.title}
        coverUrl={coverUrl}
        year={parsedManga.year}
        status={parsedManga.status}
        demographic={parsedManga.demographic}
        rating={parsedManga.contentRating}
      />
      <MangaDescription description={parsedManga.description} />
      <GenreList tags={parsedManga.tags} />
    </ScrollView>
  );
};

export default MangaDetails;
