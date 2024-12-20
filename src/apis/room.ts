import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Room } from '@/types/rooms';
import { collection, doc, getDocs } from 'firebase/firestore';

export const getRooms = async (hotelId: string) => {
  const hotelDocRef = doc(db, COLLECTIONS.HOTEL, hotelId); // 호텔 문서 참조
  const roomsCollectionRef = collection(hotelDocRef, COLLECTIONS.ROOMS); // 호텔의 방 컬렉션 참조
  const roomsSnapshot = await getDocs(roomsCollectionRef); // 방 목록 가져오기

  return roomsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Room),
  }));
};
