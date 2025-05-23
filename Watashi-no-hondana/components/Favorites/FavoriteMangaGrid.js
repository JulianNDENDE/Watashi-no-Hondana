import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity, Image, Text, StyleSheet, View as RNView } from "react-native";
import { useUser } from "../../context/UserContext";
import { useManga } from "../../context/MangaContext";
import { getMangaById, getCoverFilename } from "../../api/manga/mangaApi";
import { normalizeManga } from "../../utils/normalizeManga";
import { useRouter } from "expo-router";
import { useTheme } from "tamagui";

const FavoriteMangaGrid = () => {
  const { user } = useUser();
  const favorites = user?.favorites ?? [];
  const favoritesCount = favorites.length;
  const favoritesKey = useMemo(
    () => favorites.map((fav) => `${fav.mangaId}-${fav.source}`).join(","),
    [favorites]
  );

  const { setCurrentManga, setCoverUrl } = useManga();
  const [mangaList, setMangaList] = useState([]);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteMangas = async () => {
      try {
        const fetches = favorites.map(async (fav) => {
          const { mangaId, source } = fav;
          try {
            const response = await getMangaById(mangaId, source);
            const normalized = normalizeManga(response.data ? response.data : response, source);
            if (!normalized) return null;
            const filename = await getCoverFilename(normalized.id, source);
            const coverUrl = filename
              ? (source === 'mangadex'
                  ? `https://uploads.mangadex.org/covers/${normalized.id}/${filename}.256.jpg`
                  : filename)
              : "https://via.placeholder.com/120x180?text=No+Cover";
            return { ...normalized, coverUrl };
          } catch (err) {
            console.error(`Error fetching manga with id ${mangaId} from ${source}:`, err);
            return null;
          }
        });
        const results = await Promise.all(fetches);
        setMangaList(results.filter((manga) => manga !== null));
      } catch (error) {
        console.error("Error fetching favorite mangas:", error);
      }
    };

    if (favoritesCount) {
      fetchFavoriteMangas();
    } else {
      setMangaList([]);
    }
  }, [favoritesCount, favoritesKey]);

  const handlePress = (manga) => {
    setCurrentManga(manga);
    setCoverUrl(manga.coverUrl);
    router.push({
      pathname: `/manga/${manga.id}`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RNView style={{ width: "100%", marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.color.val,
            textAlign: "center",
          }}
        >
          Favorites Mangas ({mangaList.length})
        </Text>
      </RNView>
      {mangaList.length > 0 ? (
        mangaList.map((manga) => (
          <TouchableOpacity
            key={manga.id}
            style={styles.item}
            onPress={() => handlePress(manga)}
          >
            <Text style={[styles.title, { color: theme.color.val }]} numberOfLines={1}>
              {manga.title}
            </Text>
            <Image
              source={{ uri: manga.coverUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))
      ) : (
        <RNView style={{ width: "100%", marginTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              color: theme.colorMuted.val,
              textAlign: "center",
            }}
          >
            No favorite mangas found.
          </Text>
        </RNView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    width: "40%",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  coverImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
});

export default FavoriteMangaGrid;
