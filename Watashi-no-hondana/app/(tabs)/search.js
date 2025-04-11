import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, useTheme } from 'tamagui';
import searchManga from '../../api/manga/searchApi';
import MangaCover from '../../components/manga/MangaCover';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [mangas, setMangas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const results = await searchManga(query);
      setMangas(results);
    } catch (error) {
      setError('Failed to fetch manga data');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View padding={16} backgroundColor={theme.background.val} height="100%">
      <CustomInput
        value={query}
        onChangeText={setQuery}
        placeholder="Enter manga name"
        type="search"
      />
      <CustomButton
        onPress={handleSearch}
        title={loading ? 'Searching...' : 'Search'}
        disabled={loading}
      />

      {error && <Text color="red">{error}</Text>}

      <ScrollView marginTop={16} showsVerticalScrollIndicator={false}>
        {mangas && mangas.mangaDex && mangas.mangaDex.data?.length > 0 && (
          <>
            <Text
              fontSize={20}
              fontWeight="bold"
              marginBottom={8}
              color={theme.color.val}
            >
              MangaDex API results ({mangas.mangaDex.total})
            </Text>
            {mangas.mangaDex.data.map((manga) => (
              <MangaCover key={manga.id} manga={manga} source="mangadex" />
            ))}
          </>
        )}

        {mangas && mangas.jikan && mangas.jikan.data?.length > 0 && (
          <>
            <Text
              fontSize={20}
              fontWeight="bold"
              marginBottom={8}
              color={theme.color.val}
            >
              Jikan API results ({mangas.jikan.data.length})
            </Text>
            {mangas.jikan.data.map((manga) => (
              <MangaCover key={manga.mal_id || manga.id} manga={manga} source="jikan" />
            ))}
          </>
        )}

        {mangas &&
          (!mangas.mangaDex || mangas.mangaDex.data?.length === 0) &&
          (!mangas.jikan || mangas.jikan.data?.length === 0) &&
          query &&
          !loading && (
            <Text
              color={theme.colorMuted.val}
              textAlign="center"
              marginTop={20}
              fontSize={16}
            >
              No results found. Try searching for something else.
            </Text>
          )}
      </ScrollView>
    </View>
  );
};

export default Search;
