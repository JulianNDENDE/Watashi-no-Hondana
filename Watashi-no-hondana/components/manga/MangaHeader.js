import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { View, Text, Image, useTheme } from "tamagui";
import FavoriteButton from "../../components/buttons/FavoriteButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MangaHeader = ({ title, coverUrl, year, status, demographic, rating, mangaId }) => {
  const theme = useTheme();
  const router = useRouter();

  const goHome = () => {
    router.push("/home");
  };

  return (
    <ImageBackground
      source={{ uri: coverUrl }}
      style={{ width: "100%", height: 250 }}
      blurRadius={10}
    >
      <View
        backgroundColor="rgba(0,0,0,0.6)"
        padding={15}
        justifyContent="center"
        height="100%"
      >
        {/* Home arrow in the top left (absolutely positioned) */}
        <TouchableOpacity
          style={{ position: "absolute", top: 15, left: 15, zIndex: 10 }}
          onPress={goHome}
        >
          <Ionicons name="arrow-back" size={28} color={theme.color.val} />
        </TouchableOpacity>

        <View flexDirection="row" alignItems="center">
          {/* Framed Manga Cover */}
          <Image
            source={{ uri: coverUrl }}
            width={100}
            height={150}
            borderRadius={8}
            borderColor={theme.primary}
            borderWidth={2}
          />
          {/* Manga Information */}
          <View marginLeft={15}>
            <Text fontSize={22} fontWeight="bold" color={theme.color} numberOfLines={2}>
              {title || "Unknown Title"}
            </Text>
            <Text fontSize={14} color={theme.colorMuted}>
              {year || "N/A"} • {status || "Unknown"} • {demographic || "N/A"}
            </Text>
            <Text fontSize={14} color={theme.primary}>
              Rating: {rating || "N/A"}
            </Text>
          </View>
        </View>
        {/* Favorite Button */}
        <FavoriteButton mangaId={mangaId} />
      </View>
    </ImageBackground>
  );
};

export default MangaHeader;
