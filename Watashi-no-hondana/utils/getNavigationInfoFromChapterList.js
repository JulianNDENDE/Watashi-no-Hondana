export const getNavigationInfoFromChapterList = (chapters, currentChapterId) => {
  const index = chapters.findIndex(ch => ch.id === currentChapterId);
  if (index === -1) {
    return {
      nextChapter: null,
      prevChapter: null,
    };
  }
  const nextChapter = index > 0 ? chapters[index - 1] : null;
  const prevChapter = index < chapters.length - 1 ? chapters[index + 1] : null;

  return {
    nextChapter: nextChapter
      ? {
          id: nextChapter.id,
          title: nextChapter.title,
          number: nextChapter.number,
        }
      : null,
    prevChapter: prevChapter
      ? {
          id: prevChapter.id,
          title: prevChapter.title,
          number: prevChapter.number,
        }
      : null,
  };
};
