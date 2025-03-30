import React, { useState } from 'react';
import { View, ScrollView, useTheme, Text } from 'tamagui';
import searchManga from '../../api/manga/searchApi';
import MangaCover from '../../components/manga/MangaCover';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const results = await searchManga(query);
      setMangas(results.mangaDex.data);
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
      <CustomButton onPress={handleSearch} title={loading ? 'Searching...' : 'Search'} disabled={loading} />

      {error && <Text color="red">{error}</Text>}

      <ScrollView marginTop={16} showsVerticalScrollIndicator={false}>
        {mangas.length === 0 && query && !loading && (
          <Text color={theme.colorMuted.val} textAlign="center" marginTop={20}>
            No results found. Try searching for something else.
          </Text>
        )}
        {mangas.map((manga) => (
          <MangaCover key={manga.id} manga={manga} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Search;
