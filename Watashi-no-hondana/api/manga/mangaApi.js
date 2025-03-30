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

export const getChapters = async (mangaId) => {
  try {
    const response = await axios.get(
      `${MANGADEX_BASE_URL}/manga/${mangaId}/feed?translatedLanguage[]=en&order[chapter]=desc`
    );

    return {
      chapters: response.data.data.map((chapter) => {
        const scanlationGroup = chapter.relationships.find(
          (rel) => rel.type === "scanlation_group"
        )?.attributes?.name || "Unknown Group";

        return {
          id: chapter.id,
          number: chapter.attributes.chapter || "?",
          title: chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`,
          publishedAt: new Date(chapter.attributes.publishAt).toLocaleDateString(),
          pages: chapter.attributes.pages,
          scanlationGroup,
        };
      }),
      totalChapters: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return { chapters: [], totalChapters: 0 };
  }
};
