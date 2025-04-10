import React, { createContext, useContext, useState, useMemo } from 'react';

const MangaContext = createContext(null);

export const MangaProvider = ({ children }) => {
  const [currentManga, setCurrentManga] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  const value = useMemo(() => ({ currentManga, coverUrl, setCurrentManga, setCoverUrl }), [currentManga, coverUrl]);
  return <MangaContext.Provider value={value}>{children}</MangaContext.Provider>;
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error("useManga must be used within a MangaProvider");
  }
  return context;
};

export default MangaProvider;
