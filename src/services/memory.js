import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

/*
|--------------------------------------------------------------------------
| GET MEMORY
|--------------------------------------------------------------------------
*/

export const getUserMemory = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const ref = doc(db, 'users', uid, 'memory', 'data');

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
};

/*
|--------------------------------------------------------------------------
| UPDATE MEMORY
|--------------------------------------------------------------------------
*/

export const updateUserMemory = async (data) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const ref = doc(db, 'users', uid, 'memory', 'data');

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
};
