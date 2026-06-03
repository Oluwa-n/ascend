import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, db, googleProvider } from '../firebase/config';

/*
|--------------------------------------------------------------------------
| SIGNUP
|--------------------------------------------------------------------------
*/
export const signup = async (name, email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(result.user, {
    displayName: name,
  });

  await setDoc(doc(db, 'users', result.user.uid), {
    displayName: name,
    email,
    photoURL: '',
    createdAt: Date.now(),
  });

  return result.user;
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user;
};

/*
|--------------------------------------------------------------------------
| GOOGLE LOGIN (FIXED FOR MOBILE)
|--------------------------------------------------------------------------
*/
export const loginWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider);
};

/*
|--------------------------------------------------------------------------
| HANDLE REDIRECT RESULT
|--------------------------------------------------------------------------
*/
export const handleGoogleRedirect = async () => {
  const result = await getRedirectResult(auth);

  if (!result?.user) return null;

  const user = result.user;

  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      displayName: user.displayName || '',
      email: user.email,
      photoURL: user.photoURL || '',
      createdAt: Date.now(),
    });
  }

  return user;
};

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
export const logout = async () => {
  await signOut(auth);
};
