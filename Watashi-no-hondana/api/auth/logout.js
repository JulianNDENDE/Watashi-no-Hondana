import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import useUserStore from '../../store/userStore';

export const logoutUser = async () => {
  try {
    await signOut(auth);
    useUserStore.getState().logout();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error.message);
    return { success: false, message: error.message };
  }
};
