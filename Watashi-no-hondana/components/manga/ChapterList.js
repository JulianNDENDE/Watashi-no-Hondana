import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { View, Text, useTheme } from "tamagui";
import { useRouter } from "expo-router";
import { getChapters } from "../../api/manga/mangaApi";

const ChapterList = ({ mangaId }) => {
  const [chapters, setChapters] = useState([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const { chapters: chapterData, totalChapters } = await getChapters(mangaId);
        setChapters(chapterData);
        setTotalChapters(totalChapters);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      }
    };

    fetchChapters();
  }, [mangaId]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text fontSize={18} fontWeight="bold" color={theme.color} marginBottom={10}>
        Chapters ({totalChapters})
      </Text>
      {chapters.length > 0 ? (
        chapters.map((chapter) => {
          const chapterListJson = JSON.stringify(chapters);
          return (
            <TouchableOpacity
              key={chapter.id}
              onPress={() =>
                router.push({
                  pathname: `/manga/chapter/${chapter.id}`,
                  params: {
                    chapterTitle: chapter.title,
                    chapterNumber: chapter.number,
                    mangaId,
                    chapterListJson,
                  },
                })
              }
            >
              <View
                backgroundColor={theme.backgroundLight}
                padding={10}
                borderRadius={8}
                marginVertical={5}
              >
                <Text fontSize={16} fontWeight="bold" color={theme.color}>
                  {`${chapter.title} (N°${chapter.number})`}
                </Text>
                <Text fontSize={12} color={theme.colorMuted}>
                  {`${chapter.pages} page(s) • ${chapter.publishedAt}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text fontSize={14} color={theme.colorMuted}>
          No chapters available.
        </Text>
      )}
    </ScrollView>
  );
};

export default ChapterList;
