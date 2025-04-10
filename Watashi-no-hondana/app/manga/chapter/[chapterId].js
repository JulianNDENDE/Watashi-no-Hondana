import React, { useState, useEffect } from 'react'
import { ScrollView, Image, ActivityIndicator, Dimensions, View as RNView, Alert } from 'react-native'
import { View, useTheme } from 'tamagui'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { ReaderHeader } from '../../../components/reader/ReaderHeader'
import { ReaderBottomBar } from '../../../components/reader/ReaderBottomBar'
import { ReadingModeMenu } from '../../../components/reader/ReadingModeMenu'
import { getChapterImages } from '../../../api/manga/mangaApi'
import { getNavigationInfoFromChapterList } from '../../../utils/getNavigationInfoFromChapterList';

const { width: deviceWidth } = Dimensions.get('window');
const imageHeight = deviceWidth * 1.45;

const MangaReader = () => {
  const theme = useTheme();
  const router = useRouter();

  const { chapterId, chapterTitle, chapterNumber, mangaId, chapterListJson } = useLocalSearchParams();

  let chapters = [];
  if (chapterListJson) {
    try {
      chapters = JSON.parse(chapterListJson);
    } catch (error) {
      console.error("Error parsing chapterListJson:", error);
    }
  }
  const navInfo = getNavigationInfoFromChapterList(chapters, chapterId);

  const [fullScreenMode, setFullScreenMode] = useState(false);

  const [readingMode, setReadingMode] = useState('Paged (left to right)');
  const [isRotationEnabled, setIsRotationEnabled] = useState(true);

  const [isReadingModeMenuVisible, setIsReadingModeMenuVisible] = useState(false);
  const [isBrightnessMenuVisible, setIsBrightnessMenuVisible] = useState(false);

  const [chapterImages, setChapterImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullScreenMode = () => setFullScreenMode(prev => !prev);

  const goBackToDetails = () => {
    router.replace(`/manga/${mangaId}`);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getChapterImages(chapterId);
        setChapterImages(images);
      } catch (error) {
        console.error('Error fetching chapter images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [chapterId]);

  const loadNextChapter = () => {
    if (navInfo.nextChapter && navInfo.nextChapter.id) {
      router.push({
        pathname: `/manga/chapter/${navInfo.nextChapter.id}`,
        params: {
          chapterTitle: navInfo.nextChapter.title,
          chapterNumber: navInfo.nextChapter.number,
          mangaId,
          chapterListJson,
        },
      });
    } else {
      Alert.alert("No Next Chapter", "This is the last chapter available.");
    }
  };

  const loadPreviousChapter = () => {
    if (navInfo.prevChapter && navInfo.prevChapter.id) {
      router.push({
        pathname: `/manga/chapter/${navInfo.prevChapter.id}`,
        params: {
          chapterTitle: navInfo.prevChapter.title,
          chapterNumber: navInfo.prevChapter.number,
          mangaId,
          chapterListJson,
        },
      });
    } else {
      Alert.alert("No Previous Chapter", "This is the first chapter available.");
    }
  };

  return (
    <View flex={1} backgroundColor={theme.background.val}>
      <StatusBar hidden={fullScreenMode} />

      {/* Overlay to block touches when menus are open */}
      {(isReadingModeMenuVisible || isBrightnessMenuVisible) && (
        <RNView
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 500,
          }}
        />
      )}

      {/* Header (absolutely positioned) */}
      {!fullScreenMode && !isReadingModeMenuVisible && !isBrightnessMenuVisible && (
        <ReaderHeader
          onBack={goBackToDetails}
          chapterTitle={chapterTitle}
          chapterNumber={chapterNumber}
        />
      )}

      {/* Manga Pages */}
      <ScrollView
        removeClippedSubviews={true}
        contentContainerStyle={{ padding: 0 }}
        onTouchEnd={toggleFullScreenMode}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.primary.val} />
        ) : (
          chapterImages.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: deviceWidth,
                height: imageHeight,
                resizeMode: 'contain',
              }}
            />
          ))
        )}
      </ScrollView>

      {/* Bottom Bar with arrow buttons for chapter navigation */}
      {!fullScreenMode && !isReadingModeMenuVisible && !isBrightnessMenuVisible && (
        <ReaderBottomBar
          isRotationEnabled={isRotationEnabled}
          onToggleRotation={() => setIsRotationEnabled(!isRotationEnabled)}
          onShowReadingModeMenu={() => setIsReadingModeMenuVisible(true)}
          onShowBrightnessMenu={() => setIsBrightnessMenuVisible(true)}
          onToggleFullScreen={toggleFullScreenMode}
          onNextChapter={loadNextChapter}
          onPrevChapter={loadPreviousChapter}
        />
      )}

      {/* Reading Mode Menu */}
      <ReadingModeMenu
        visible={isReadingModeMenuVisible}
        currentMode={readingMode}
        onSelectMode={(mode) => setReadingMode(mode)}
        onClose={() => setIsReadingModeMenuVisible(false)}
      />
    </View>
  );
};

export default MangaReader;
