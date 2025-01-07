import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Reservation } from '@/types/form';
import { Room } from '@/types/rooms';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const makeReservation = async (newReservation: Reservation) => {
  const hotelSnapshot = doc(db, COLLECTIONS.HOTEL, newReservation.hotelId);
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOMS, newReservation.roomId),
  );

  const room = roomSnapshot.data() as Room;
  const 현재객실잔여수 = room.avaliableCount;

  if (현재객실잔여수 === 0) {
    throw new Error('객실이 모두 예약되었습니다.');
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: 현재객실잔여수 - 1,
    }),

    setDoc(doc(db, COLLECTIONS.RESERVATION), newReservation),
  ]);
};

export default makeReservation;
