import React, { useState, useEffect } from 'react'
import { ScrollView, View as RNView, Image, ActivityIndicator, Dimensions } from 'react-native'
import { View, useTheme } from 'tamagui'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// Import external reader components
import { ReaderHeader } from '../../../components/reader/ReaderHeader'
import { ReaderPageSlider } from '../../../components/reader/ReaderPageSlider'
import { ReaderBottomBar } from '../../../components/reader/ReaderBottomBar'
import { ReadingModeMenu } from '../../../components/reader/ReadingModeMenu'
import { BrightnessMenu } from '../../../components/reader/BrightnessMenu'

// Import the API function to get chapter images
import { getChapterImages } from '../../../api/manga/mangaApi'

// Get device width for full-immersion images
const { width: deviceWidth } = Dimensions.get('window')

const MangaReader = () => {
  const theme = useTheme()
  const router = useRouter()
  const { chapterId, chapterTitle, chapterNumber } = useLocalSearchParams()

  // State for full-screen mode (hides overlays)
  const [fullScreenMode, setFullScreenMode] = useState(false)

  // Other reader settings
  const [readingMode, setReadingMode] = useState('Paged (left to right)')
  const [isRotationEnabled, setIsRotationEnabled] = useState(true)
  const [brightness, setBrightness] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  // Menu visibility states
  const [isReadingModeMenuVisible, setIsReadingModeMenuVisible] = useState(false)
  const [isBrightnessMenuVisible, setIsBrightnessMenuVisible] = useState(false)

  // Chapter images and loading state
  const [chapterImages, setChapterImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Toggling full-screen mode by tapping content
  const toggleFullScreenMode = () => setFullScreenMode((prev) => !prev)

  // Fetch chapter images when chapterId changes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getChapterImages(chapterId)
        setChapterImages(images)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [chapterId])

  return (
    <View flex={1} backgroundColor={theme.background.val}>
      {/* Hide system status bar in full screen */}
      <StatusBar hidden={fullScreenMode} />

      {/* Block touches when a menu is open */}
      {(isReadingModeMenuVisible || isBrightnessMenuVisible) && (
        <RNView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 500,
          }}
        />
      )}

      {/* Header */}
      {!fullScreenMode && !isReadingModeMenuVisible && !isBrightnessMenuVisible && (
        <ReaderHeader
          onBack={() => router.back()}
          chapterTitle={chapterTitle}
          chapterNumber={chapterNumber}
        />
      )}

      {/* Manga Pages */}
      <ScrollView
        onTouchEnd={toggleFullScreenMode}
        contentContainerStyle={{
          padding: 0, // remove padding to avoid gaps
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.primary.val} />
        ) : (
          chapterImages.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: deviceWidth, // full screen width
                height: deviceWidth * 1.5, // adjust height as needed
                resizeMode: 'contain',
              }}
            />
          ))
        )}
      </ScrollView>


      {/* Page Slider (only when no menu is open) */}
      {!fullScreenMode && !isReadingModeMenuVisible && !isBrightnessMenuVisible && (
        <ReaderPageSlider
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          maxPages={chapterImages.length > 0 ? chapterImages.length : 100}
        />
      )}

      {/* Bottom Bar (only when no menu is open) */}
      {!fullScreenMode && !isReadingModeMenuVisible && !isBrightnessMenuVisible && (
        <ReaderBottomBar
          isRotationEnabled={isRotationEnabled}
          onToggleRotation={() => setIsRotationEnabled(!isRotationEnabled)}
          onShowReadingModeMenu={() => setIsReadingModeMenuVisible(true)}
          onShowBrightnessMenu={() => setIsBrightnessMenuVisible(true)}
          onToggleFullScreen={toggleFullScreenMode}
        />
      )}

      {/* Reading Mode Menu */}
      <ReadingModeMenu
        visible={isReadingModeMenuVisible}
        currentMode={readingMode}
        onSelectMode={(mode) => setReadingMode(mode)}
        onClose={() => setIsReadingModeMenuVisible(false)}
      />

      {/* Brightness Menu */}
      <BrightnessMenu
        visible={isBrightnessMenuVisible}
        brightness={brightness}
        onChangeBrightness={(val) => setBrightness(val)}
        onClose={() => setIsBrightnessMenuVisible(false)}
      />
    </View>
  )
}

export default MangaReader
