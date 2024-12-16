import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Hotel } from '@/types/hotel';
import {
  QuerySnapshot,
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';

// 전체 호텔 목록을 가져오는 함수
export const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  const hotelQuery =
    pageParams === null // 페이지 파라미터가 없으면 처음부터 10개를 가져옴
      ? query(collection(db, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(db, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        );

  // 호텔 목록을 가져옴
  const hotelsSnapshot = await getDocs(hotelQuery);

  // 호텔 목록을 배열로 변환
  const hotels = hotelsSnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  );

  // 마지막 호텔을 가져옴
  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

  return { hotels, lastVisible };
};

export const getHotel = async (id: string) => {
  const snapshot = await getDoc(collection(db, COLLECTIONS.HOTEL, id));

  return {
    id,
    ...snapshot.data(),
  } as Hotel;
};
