import { getRooms } from '@/apis/room';
import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Room } from '@/types/rooms';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

const useRooms = ({ hotelId }: { hotelId: string }) => {
  const client = useQueryClient();

  useEffect(() => {
    const hotelRef = doc(db, COLLECTIONS.HOTEL, hotelId); // 호텔 문서 참조 생성
    const roomRef = collection(hotelRef, COLLECTIONS.ROOMS); // 호텔 하위의 객실 컬렉션 참조 생성

    // 실시간 Firestore 스냅샷 구독
    const unsubscribe = onSnapshot(roomRef, snapshot => {
      const newRooms = snapshot.docs.map(doc => {
        return {
          id: doc.id, // 각 문서의 ID 저장
          ...(doc.data() as Room), // 문서 데이터를 Room 타입으로 변환하여 저장
        };
      });

      // React Query의 캐시를 갱신
      client.setQueryData(['rooms', hotelId], newRooms);
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트되거나 hotelId가 변경될 때 구독 해제
    };
  }, [hotelId, client]);

  // React Query를 사용한 객실 데이터 가져오기
  return useQuery({
    queryKey: ['rooms', hotelId], // 쿼리 키로 호텔 ID를 포함하여 유일성 보장
    queryFn: () => getRooms(hotelId), // 객실 데이터를 비동기로 가져오는 함수
  });
};

export default useRooms;
