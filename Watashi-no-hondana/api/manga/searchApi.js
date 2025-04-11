import { getMangasBySearch as getMangasBySearchMangaDex } from "./sources/mangaDexApi";
import { getMangasBySearch as getMangasBySearchJikan } from "./sources/jikanApi";

const searchManga = async (query) => {
  try {
    const [mangaDexResults, jikanResults] = await Promise.all([
      getMangasBySearchMangaDex(query),
      getMangasBySearchJikan(query)
    ]);

    const mangaDexResultsWithSource = { ...mangaDexResults, source: "mangadex" };
    const jikanResultsWithSource = { ...jikanResults, source: "jikan" };

    return {
      mangaDex: mangaDexResultsWithSource,
      jikan: jikanResultsWithSource,
    };
  } catch (error) {
    console.error("Error searching for manga:", error);
    throw new Error("Failed to search for manga");
  }
};

export default searchManga;
