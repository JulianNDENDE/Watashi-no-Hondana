import React from "react";
import { ImageBackground } from "react-native";
import { View, Text, Image, useTheme } from "tamagui";
import FavoriteButton from "../../components/buttons/FavoriteButton";

const MangaHeader = ({ title, coverUrl, year, status, demographic, rating, mangaId }) => {
  const theme = useTheme();

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
