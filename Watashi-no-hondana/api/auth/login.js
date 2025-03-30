import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUserFromDatabase } from '../users';

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    const userData = await getUserFromDatabase(user.uid);

    return { success: true, userData };
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, message: error.message };
  }
};
