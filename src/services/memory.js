import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

/*
|--------------------------------------------------------------------------
| GET MEMORY
|--------------------------------------------------------------------------
*/

export const getUserMemory = async (userId) => {
  const ref = doc(db, 'users', userId, 'memory', 'data');
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
};

/*
|--------------------------------------------------------------------------
| UPDATE MEMORY
|--------------------------------------------------------------------------
*/

export const updateUserMemory = async (userId, data) => {
  const ref = doc(db, 'users', userId, 'memory', 'data');

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
};
