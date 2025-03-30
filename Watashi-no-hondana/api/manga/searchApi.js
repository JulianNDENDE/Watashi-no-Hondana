import { getMangasBySearch } from "./mangaApi";

const searchManga = async (query) => {
  try {
    // First, search in MangaDex
    const mangaDexResults = await getMangasBySearch(query);

    // You can later add more APIs here, for example:
    // const aniListResults = await aniListApi.getMangasBySearch(query);

    return {
      mangaDex: mangaDexResults,
      // aniList: aniListResults,
    };
  } catch (error) {
    console.error("Error searching for manga:", error);
    throw new Error("Failed to search for manga");
  }
};

export default searchManga;
