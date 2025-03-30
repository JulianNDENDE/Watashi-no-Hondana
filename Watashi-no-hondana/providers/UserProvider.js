import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import useUserStore from '../store/userStore';
import { getUserFromDatabase } from '../api/users';

const UserProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getUserFromDatabase(firebaseUser.uid);
        setUser({ ...userData, uid: firebaseUser.uid });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return children;
};

export default UserProvider;
