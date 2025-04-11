import {
  getMangasBySearch as getMangasBySearchMangaDex,
  getMangaById as getMangaByIdMangaDex,
  getCoverFilename as getCoverFilenameMangaDex,
  getChapters as getChaptersMangaDex,
  getChapterImages as getChapterImagesMangaDex
} from "./sources/mangaDexApi";

import {
  getMangasBySearch as getMangasBySearchJikan,
  getMangaById as getMangaByIdJikan,
  getCoverFilename as getCoverFilenameJikan,
  getChapters as getChaptersJikan,
  getChapterImages as getChapterImagesJikan
} from "./sources/jikanApi";

export const getMangasBySearch = async (query, options = {}) => {
  const source = options.source || "mangadex";
  try {
    if (source === "mangadex") {
      return await getMangasBySearchMangaDex(query);
    } else if (source === "jikan") {
      return await getMangasBySearchJikan(query);
    } else if (source === "both") {
      const [mangaDexResults, jikanResults] = await Promise.all([
        getMangasBySearchMangaDex(query),
        getMangasBySearchJikan(query),
      ]);
      return {
        mangaDex: { ...mangaDexResults, source: "mangadex" },
        jikan: { ...jikanResults, source: "jikan" }
      };
    } else {
      throw new Error(`Unknown source: ${source}`);
    }
  } catch (error) {
    console.error("Error searching for manga:", error);
    throw error;
  }
};

export const getMangaById = async (mangaId, source = "mangadex") => {
  if (source === "mangadex") {
    return await getMangaByIdMangaDex(mangaId);
  } else if (source === "jikan") {
    return await getMangaByIdJikan(mangaId);
  } else {
    throw new Error(`getMangaById: Unknown source: ${source}`);
  }
};

export const getCoverFilename = async (mangaId, source = "mangadex") => {
  if (source === "mangadex") {
    return await getCoverFilenameMangaDex(mangaId);
  } else if (source === "jikan") {
    return await getCoverFilenameJikan(mangaId);
  } else {
    throw new Error(`getCoverFilename: Unknown source: ${source}`);
  }
};

export const getChapters = async (mangaId, source = "mangadex") => {
  if (source === "mangadex") {
    return await getChaptersMangaDex(mangaId);
  } else if (source === "jikan") {
    return await getChaptersJikan(mangaId);
  } else {
    throw new Error(`getChapters: Unknown source: ${source}`);
  }
};

export const getChapterImages = async (chapterId, source = "mangadex") => {
  if (source === "mangadex") {
    return await getChapterImagesMangaDex(chapterId);
  } else if (source === "jikan") {
    return await getChapterImagesJikan(chapterId); // This will throw an error.
  } else {
    throw new Error(`getChapterImages: Unknown source: ${source}`);
  }
};
