import { COLLECTIONS } from '@/constants';
import { auth, db } from '@/remote/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGoogleSignin = () => {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signin = useCallback(async () => {
    if (isSigningIn) return; // UI에서 상태로만 중복 요청 방지

    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider); // 팝업으로 로그인
      const userRef = doc(collection(db, COLLECTIONS.USERS), user.uid); // 사용자 정보 참조
      const userSnapshot = await getDoc(userRef); // 사용자 정보 조회

      console.log('user', user);

      // 이미 가입한 사용자인지 확인
      if (userSnapshot.exists()) {
        navigate('/');
      } else {
        // 신규 사용자라면 추가 정보를 저장
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        // 사용자 정보를 Firestore에 저장
        await setDoc(userRef, newUser, { merge: true });
        navigate('/');
      }
    } catch (error: unknown) {
      const errCode = (error as { code?: string }).code;
      console.error('로그인 에러:', error);
      switch (errCode) {
        case 'auth/popup-closed-by-user':
          break; // 팝업 닫힘
        default:
          throw new Error('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSigningIn(false); // 상태를 정상적으로 복구
    }
  }, [isSigningIn, navigate]);

  const signout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  }, []);

  return { signin, signout };
};

export default useGoogleSignin;
