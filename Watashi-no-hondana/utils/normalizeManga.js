export const normalizeManga = (manga) => {
  if (!manga || !manga.id || !manga.attributes) {
    return null;
  }

  return {
    id: manga.id,
    title: manga.attributes.title?.en || "Unknown Title",
    altTitles: manga.attributes.altTitles
      ?.map((alt) => alt.en)
      .filter(Boolean)
      .join(", ") || null,
    description: manga.attributes.description?.en || "No description available.",
    year: manga.attributes.year || "N/A",
    status: manga.attributes.status || "Unknown",
    demographic: manga.attributes.publicationDemographic || "General",
    contentRating: manga.attributes.contentRating || "Unrated",
    tags: manga.attributes.tags?.map((tag) => tag.attributes.name.en) || [],
  };
};
