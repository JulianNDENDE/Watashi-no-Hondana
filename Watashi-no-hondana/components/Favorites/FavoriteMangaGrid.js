import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import useUserStore from "../../store/userStore";
import shallow from 'zustand/shallow';
import { getMangaById, getCoverFilename } from "../../api/manga/mangaApi";
import { normalizeManga } from "../../utils/normalizeManga";
import { useRouter } from "expo-router";
import { View, useTheme } from "tamagui";

const FavoriteMangaGrid = () => {
  const favorites = useUserStore((state) => state.user?.favorites ?? [], shallow);
  const [mangaList, setMangaList] = useState([]);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteMangas = async () => {
      try {
        const fetches = favorites.map(async (mangaId) => {
          try {
            const response = await getMangaById(mangaId);
            const normalized = normalizeManga(response.data ? response.data : response);
            if (!normalized) return null;
            const filename = await getCoverFilename(normalized.id);
            const coverUrl = filename
              ? `https://uploads.mangadex.org/covers/${normalized.id}/${filename}.256.jpg`
              : "https://via.placeholder.com/120x180?text=No+Cover";
            return { ...normalized, coverUrl };
          } catch (err) {
            console.error(`Error fetching manga with id ${mangaId}:`, err);
            return null;
          }
        });
        const results = await Promise.all(fetches);
        setMangaList(results.filter((manga) => manga !== null));
      } catch (error) {
        console.error("Error fetching favorite mangas:", error);
      }
    };

    if (favorites.length) {
      fetchFavoriteMangas();
    } else {
      setMangaList([]);
    }
  }, [favorites]);

  const handlePress = (manga) => {
    router.push({
      pathname: `/manga/${manga.id}`,
      params: { manga: JSON.stringify(manga), coverUrl: manga.coverUrl },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: "100%", marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.color.val, textAlign: "center" }}>
          Favorites Mangas ({mangaList.length})
        </Text>
      </View>
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
        <View style={{ width: "100%", marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: theme.colorMuted.val, textAlign: "center" }}>
            No favorite mangas found.
          </Text>
        </View>
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
