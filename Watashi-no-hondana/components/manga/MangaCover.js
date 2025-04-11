import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { getCoverFilename } from "../../api/manga/mangaApi";
import { View, Text, Image, useTheme } from "tamagui";
import { useRouter } from "expo-router";
import { normalizeManga } from "../../utils/normalizeManga";
import { useManga } from "../../context/MangaContext";

const MangaCover = ({ manga, source }) => {
  const theme = useTheme();
  const router = useRouter();
  const { setCurrentManga, setCoverUrl } = useManga();
  const [localCoverUrl, setLocalCoverUrl] = useState(null);

  const normalizedManga = normalizeManga(manga, source);
  if (!normalizedManga) return null;

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const filename = await getCoverFilename(normalizedManga.id, source);
        if (filename && source === "mangadex") {
          setLocalCoverUrl(`https://uploads.mangadex.org/covers/${normalizedManga.id}/${filename}.256.jpg`);
        } else if (filename && source === "jikan") {
          setLocalCoverUrl(filename);
        } else {
          setLocalCoverUrl("https://via.placeholder.com/120x180?text=No+Cover");
        }
      } catch (error) {
        console.error("Error fetching cover filename:", error);
        setLocalCoverUrl("https://via.placeholder.com/120x180?text=No+Cover");
      }
    };

    fetchCover();
  }, [normalizedManga.id]);

  const handlePress = () => {
    setCurrentManga(normalizedManga);
    setCoverUrl(localCoverUrl);
    router.push({
      pathname: `/manga/${normalizedManga.id}`,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        flexDirection="row"
        alignItems="center"
        backgroundColor={theme.backgroundLight}
        padding={10}
        borderRadius={8}
        marginVertical={5}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
      >
        {/* Cover Image */}
        <Image
          source={{ uri: localCoverUrl }}
          width={100}
          height={150}
          borderRadius={8}
          resizeMode="cover"
        />

        {/* Manga Information */}
        <View flex={1} marginLeft={10}>
          <Text fontSize={16} fontWeight="bold" color={theme.color} numberOfLines={2}>
            {normalizedManga.title}
          </Text>
          {normalizedManga.altTitles && (
            <Text fontSize={12} color={theme.colorMuted} numberOfLines={1}>
              {normalizedManga.altTitles}
            </Text>
          )}
          <Text fontSize={12} color={theme.colorMuted}>Year: {normalizedManga.year}</Text>
          <Text fontSize={12} color={theme.colorMuted}>Status: {normalizedManga.status}</Text>
          <Text fontSize={12} color={theme.colorMuted}>Demographic: {normalizedManga.demographic}</Text>
          <Text fontSize={12} color={theme.colorMuted}>Rating: {normalizedManga.contentRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MangaCover;
