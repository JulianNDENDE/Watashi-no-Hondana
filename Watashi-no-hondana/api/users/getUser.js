import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function getUserData(uid) {
  const userRef = doc(db, 'Users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
}
