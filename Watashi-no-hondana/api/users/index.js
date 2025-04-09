import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const getUserFromDatabase = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'Users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user from database:", error);
    return null;
  }
};

export const addMangaToFavorites = async (uid, mangaId) => {
  const userRef = doc(db, 'Users', uid);
  await updateDoc(userRef, {
    favorites: arrayUnion(mangaId)
  });
};

export const removeMangaFromFavorites = async (uid, mangaId) => {
  const userRef = doc(db, 'Users', uid);
  await updateDoc(userRef, {
    favorites: arrayRemove(mangaId)
  });
};