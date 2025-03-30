import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const getUserFromDatabase = async (uid) => {
  const userDoc = await getDoc(doc(db, 'Users', uid));
  return userDoc.exists() ? userDoc.data() : null;
};
