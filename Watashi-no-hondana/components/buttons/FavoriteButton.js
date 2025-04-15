import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "tamagui";
import { useUser } from "../../context/UserContext";
import { getUserFromDatabase } from "../../api/users/index";
import { addMangaToFavorites, removeMangaFromFavorites } from "../../api/users/favorites";

const FavoriteButton = ({ mangaId, source }) => {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const uid = user?.uid;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!uid) return;

      try {
        const userData = await getUserFromDatabase(uid);
        if (userData && Array.isArray(userData.favorites)) {
          const favExists = userData.favorites.some(
            (fav) => fav.mangaId === mangaId && fav.source === source
          );
          setIsFavorite(favExists);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [uid, mangaId, source]);

  const toggleFavorite = async () => {
    if (!uid) {
      console.warn("User must be logged in to toggle favorites");
      return;
    }

    try {
      if (isFavorite) {
        await removeMangaFromFavorites(uid, mangaId, source);
        setIsFavorite(false);
      } else {
        await addMangaToFavorites(uid, mangaId, source);
        setIsFavorite(true);
      }
      const updatedUserData = await getUserFromDatabase(uid);
      setUser({ ...updatedUserData, uid });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={{
        position: "absolute",
        top: 15,
        right: 15,
        padding: 8,
        paddingTop: 5,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 20,
      }}
    >
      <Text fontSize={24} color={theme.primary}>
        {isFavorite ? "★" : "☆"}
      </Text>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
