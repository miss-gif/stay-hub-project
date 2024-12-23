import { useState, useCallback } from 'react';
import { auth } from '@/remote/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const useGoogleSignin = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signin = useCallback(async () => {
    if (isSigningIn) return; // 중복 실행 방지

    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log('user', user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningIn(false);
    }
  }, [isSigningIn]);

  const signout = useCallback(() => {
    signOut(auth);
  }, []);

  return { signin, signout };
};

export default useGoogleSignin;
