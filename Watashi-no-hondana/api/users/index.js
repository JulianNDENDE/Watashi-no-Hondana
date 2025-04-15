import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getUserFromDatabase = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'Users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user from database:", error);
    return null;
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const userRef = doc(db, 'Users', uid);
    await updateDoc(userRef, profileData);
    const updatedUserDoc = await getDoc(userRef);
    return updatedUserDoc.exists() ? updatedUserDoc.data() : null;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile: " + error.message);
  }
};

export const deleteAccount = async (uid) => {
  try {
    await deleteDoc(doc(db, 'Users', uid));
    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, message: error.message };
  }
};
