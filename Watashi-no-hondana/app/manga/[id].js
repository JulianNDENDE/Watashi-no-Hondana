import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "tamagui";
import { useManga } from "../../context/MangaContext";
import MangaHeader from "../../components/manga/MangaHeader";
import MangaDescription from "../../components/manga/MangaDescription";
import GenreList from "../../components/manga/GenreList";
import ChapterList from "../../components/manga/ChapterList";

const MangaDetails = () => {
  const { currentManga, coverUrl: contextCoverUrl } = useManga();
  const theme = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.background.val }}>
      <MangaHeader
        title={currentManga?.title || "Manga"}
        coverUrl={contextCoverUrl}
        year={currentManga?.year}
        status={currentManga?.status}
        demographic={currentManga?.demographic}
        rating={currentManga?.contentRating}
        mangaId={currentManga?.id}
      />
      <MangaDescription description={currentManga?.description} />
      <GenreList tags={currentManga?.tags} />
      <ChapterList mangaId={currentManga?.id} />
    </ScrollView>
  );
};

export default MangaDetails;
