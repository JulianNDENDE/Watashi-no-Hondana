import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, useTheme } from "tamagui";

const MangaDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const placeholder = "No description available for this manga.";

  return (
    <View padding={15}>
      <Text fontSize={16} color={theme.colorMuted} numberOfLines={expanded ? undefined : 3}>
        {description?.trim() ? description : placeholder}
      </Text>
      {description && description.length > 100 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text color={theme.primary}>{expanded ? "Show Less" : "Read More"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MangaDescription;
