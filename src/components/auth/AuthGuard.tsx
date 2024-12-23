import { auth } from '@/remote/firebaseConfig';
import useUserStore from '@/stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [initialized, setInitialized] = useState(false); // 초기화 상태
  const setUser = useUserStore(state => state.setUser); // 사용자 정보 설정
  const clearUser = useUserStore(state => state.clearUser); // 사용자 정보 초기화

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('user', user);

      if (user) {
        setUser({
          uid: user.uid || '',
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        });
      } else {
        clearUser(); // 사용자 정보 초기화
      }
      setInitialized(true); // 초기화 완료
    });

    return () => unsubscribe(); // 구독 해제
  }, [setUser, clearUser]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
