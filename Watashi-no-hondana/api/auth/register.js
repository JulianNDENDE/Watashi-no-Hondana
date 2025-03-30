import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    await updateProfile(user, { displayName: username });

    const userData = {
      uid: user.uid,
      username,
      email,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'Users', user.uid), userData);

    return { success: true, userData };
  } catch (error) {
    console.error('Error in registerUser:', error);
    return { success: false, message: error.message };
  }
};
