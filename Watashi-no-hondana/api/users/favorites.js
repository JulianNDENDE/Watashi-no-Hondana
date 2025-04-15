import { db } from '../../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const addMangaToFavorites = async (uid, mangaId, source) => {
  try {
    const userRef = doc(db, 'Users', uid);
    await updateDoc(userRef, {
      favorites: arrayUnion({ source, mangaId })
    });
  } catch (error) {
    console.error("Error adding manga to favorites:", error);
    throw error;
  }
};

export const removeMangaFromFavorites = async (uid, mangaId, source) => {
  try {
    const userRef = doc(db, 'Users', uid);
    await updateDoc(userRef, {
      favorites: arrayRemove({ source, mangaId })
    });
  } catch (error) {
    console.error("Error removing manga from favorites:", error);
    throw error;
  }
};