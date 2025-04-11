import axios from 'axios';

const MANGADEX_BASE_URL = 'https://api.mangadex.org';


export const getMangasBySearch = async (query) => {
  try {
    const response = await axios.get(`${MANGADEX_BASE_URL}/manga?includes[]=author`, {
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

export const getMangaById = async (mangaId) => {
  try {
    const response = await axios.get(`${MANGADEX_BASE_URL}/manga/${mangaId}?includes[]=cover_art&includes[]=author`);
    return response.data;
  } catch (error) {
    console.error("Error fetching manga by id:", error);
    throw new Error("Failed to fetch manga by id");
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

export const getChapterImages = async (chapterId) => {
  try {
    const response = await axios.get(`${MANGADEX_BASE_URL}/at-home/server/${chapterId}`);
    const { baseUrl, chapter } = response.data;
    const imageFilenames = chapter.data;
    // Construct full URLs: baseUrl + '/data/' + chapter.hash + '/' + filename
    const imageUrls = imageFilenames.map(
      filename => `${baseUrl}/data/${chapter.hash}/${filename}`
    );
    return imageUrls;
  } catch (error) {
    console.error("Error fetching chapter images:", error);
    throw new Error("Failed to fetch chapter images");
  }
};
