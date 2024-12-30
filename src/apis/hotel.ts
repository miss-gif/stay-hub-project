import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Hotel } from '@/types/hotel';
import { Room } from '@/types/rooms';
import {
  QuerySnapshot,
  collection,
  getDocs,
  getDoc,
  limit,
  query,
  startAfter,
  doc,
  where,
  documentId,
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

// 단일 호텔 가져오는 함수
export const getHotel = async (id: string) => {
  const docRef = doc(db, COLLECTIONS.HOTEL, id);
  const snapshot = await getDoc(docRef);

  return {
    id,
    ...snapshot.data(),
  } as Hotel;
};

// 추천 호텔 목록을 가져오는 함수
export const getRecommendedHotels = async (hotelIds: string[]) => {
  const recommendQuery = query(
    collection(db, COLLECTIONS.HOTEL),
    where(documentId(), 'in', hotelIds), // 호텔 아이디가 hotelIds에 포함되어 있는 경우
  );

  const recommendSnapshot = await getDocs(recommendQuery);

  return recommendSnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  );
};

// 호텔과 방 정보를 가져오는 함수
export const getHotelWithRoom = async (hotelId: string, roomId: string) => {
  const hotelRef = doc(db, COLLECTIONS.HOTEL, hotelId);
  const hotelSnapshot = await getDoc(hotelRef);
  const roomRef = doc(hotelSnapshot.ref, COLLECTIONS.ROOMS, roomId);
  const roomSnapshot = await getDoc(roomRef);

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  };
};
