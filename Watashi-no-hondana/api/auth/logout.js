import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export const logoutUser = async (logoutCallback) => {
  try {
    await signOut(auth);
    logoutCallback();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error.message);
    return { success: false, message: error.message };
  }
};
