import axios from 'axios';

const MANGADEX_BASE_URL = 'https://api.mangadex.org';


export const getMangasBySearch = async (query) => {
  try {
    const response = await axios.get(`${MANGADEX_BASE_URL}/manga`, {
      params: {
        title: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from MangaDex:", error);
    throw new Error("Failed to fetch manga data");
  }
};

export const getCoverFilename = async (mangaId) => {
  try {
    const response = await axios.get(`${MANGADEX_BASE_URL}/manga/${mangaId}?includes[]=cover_art`);
    const coverArt = response.data.data.relationships.find(
      (rel) => rel.type === 'cover_art'
    );

    if (coverArt) {
      return coverArt.attributes.fileName || null;
    }

    return null;
  } catch (error) {
    console.error('Error fetching cover filename:', error);
    return null;
  }
};
