export const normalizeManga = (manga, source) => {
  if (!manga) return null;

  if (source === "mangadex") {
    if (!manga.id || !manga.attributes) return null;
    const authors = Array.isArray(manga.relationships)
      ? manga.relationships
          .filter(rel => rel.type === "author")
          .map(rel => rel.attributes?.name)
          .filter(Boolean)
          .join(", ")
      : null;
    return {
      id: manga.id,
      title: manga.attributes.title?.en || "Unknown Title",
      altTitles:
        manga.attributes.altTitles
          ?.map((alt) => alt.en)
          .filter(Boolean)
          .join(", ") || null,
      description: manga.attributes.description?.en || "No description available.",
      year: manga.attributes.year || "N/A",
      status: manga.attributes.status || "Unknown",
      demographic: manga.attributes.publicationDemographic || "General",
      contentRating: manga.attributes.contentRating || "Unrated",
      tags: manga.attributes.tags?.map((tag) => tag.attributes.name.en) || [],
      authors,
      source: "mangadex",
    };
  } else if (source === "jikan") {
    const data = manga.data || manga;
    const authors = Array.isArray(data.authors)
      ? data.authors.map((author) => author.name).join(", ")
      : null;
    return {
      id: data.mal_id,
      title: data.title_english || data.title || "Unknown Title",
      altTitles:
        data.titles && Array.isArray(data.titles)
          ? data.titles.map((t) => t.title).join(", ")
          : null,
      description: data.synopsis || "No description available.",
      year: data.published?.prop?.from?.year || "N/A",
      status: data.status || "Unknown",
      demographic:
        data.demographics && data.demographics.length > 0
          ? data.demographics[0].name
          : "General",
      contentRating: data.score ? data.score.toString() : "Unrated",
      tags: data.genres ? data.genres.map((genre) => genre.name) : [],
      authors,
      source: "jikan",
    };
  } else {
    if (!manga.id || !manga.attributes) return null;
    const authors = Array.isArray(manga.relationships)
      ? manga.relationships
          .filter(rel => rel.type === "author")
          .map(rel => rel.attributes?.name)
          .filter(Boolean)
          .join(", ")
      : null;
    return {
      id: manga.id,
      title: manga.attributes.title?.en || "Unknown Title",
      altTitles:
        manga.attributes.altTitles
          ?.map((alt) => alt.en)
          .filter(Boolean)
          .join(", ") || null,
      description: manga.attributes.description?.en || "No description available.",
      year: manga.attributes.year || "N/A",
      status: manga.attributes.status || "Unknown",
      demographic: manga.attributes.publicationDemographic || "General",
      contentRating: manga.attributes.contentRating || "Unrated",
      tags: manga.attributes.tags?.map((tag) => tag.attributes.name.en) || [],
      authors,
      source: "mangadex",
    };
  }
};
