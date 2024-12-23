import { useState, useCallback } from 'react';
import { auth, db } from '@/remote/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '@/constants';
import { useNavigate } from 'react-router-dom';

const useGoogleSignin = () => {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signin = useCallback(async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();

    try {
      // Google로 로그인
      const { user } = await signInWithPopup(auth, provider);

      // 새로운 사용자 객체 생성
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      // Firestore에 사용자 저장
      const userRef = doc(collection(db, COLLECTIONS.USERS), user.uid);
      await setDoc(userRef, newUser, { merge: true });

      // 홈 페이지로 이동
      navigate('/');

      console.log('user', user);
    } catch (error: unknown) {
      console.error(error);
      if ((error as { code: string }).code === 'auth/popup-closed-by-user') {
        return;
      }
      throw new Error('로그인에 실패했습니다.');
    } finally {
      setIsSigningIn(false);
    }
  }, [isSigningIn, navigate]);

  const signout = useCallback(() => {
    // Firebase에서 로그아웃
    signOut(auth);
  }, []);

  return { signin, signout };
};

export default useGoogleSignin;
