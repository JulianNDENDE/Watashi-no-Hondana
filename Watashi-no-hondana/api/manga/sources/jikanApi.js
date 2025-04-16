import axios from 'axios';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';


export const getMangasBySearch = async (query) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/manga`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Jikan:", error);
    throw new Error("Failed to fetch manga data from Jikan");
  }
};

export const getMangaById = async (mangaId) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/manga/${mangaId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching manga by id from Jikan:", error);
    throw new Error("Failed to fetch manga by id from Jikan");
  }
};

export const getCoverFilename = async (mangaId) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/manga/${mangaId}/pictures`);
    const pictures = response.data.data;
    if (pictures && pictures.length > 0) {
      const imageUrl = pictures[0].jpg.image_url;
      return imageUrl || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching cover filename from Jikan:", error);
    return null;
  }
};

export const getChapters = async (mangaId) => {
  try {
    const mangaDetails = await getMangaById(mangaId);
    const chapters = mangaDetails.data?.chapters || [];
    return { chapters, totalChapters: chapters.length };
  } catch (error) {
    console.error("Error fetching chapters from Jikan:", error);
    return { chapters: [], totalChapters: 0 };
  }
};

/**
 * Jikan API does not provide chapter images, so this function throws an error.
 */
export const getChapterImages = async (chapterId) => {
  throw new Error("Jikan API does not provide chapter images");
};
