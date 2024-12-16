import { Button } from '@/components/ui/button';
import { COLLECTIONS } from '@/constants';
import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@/mock/data';
import { random } from '@/utils/random';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '@/remote/firebaseConfig';

const HotelListAddButton = () => {
  const batch = writeBatch(db); // writeBatch를 사용하여 여러개의 데이터를 한번에 추가할 수 있습니다.

  const handButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName: string, index: number) => {
      return {
        name: hotelName,
        mainImage: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        image: IMAGES,
        price: random(100000, 500000),
        starRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[index] != null && { events: EVENTS[index] }),
      };
    });

    hotels.forEach(hotel => {
      const hotelRef = doc(collection(db, COLLECTIONS.HOTEL));

      batch.set(hotelRef, hotel);

      ROOMS.forEach(room => {
        const roomRef = doc(collection(hotelRef, COLLECTIONS.ROOMS));

        batch.set(roomRef, {
          ...room,
        });
      });
    });
    batch.commit();
  };

  return <Button onClick={handButtonClick}>호텔리스트 추가</Button>;
};

export default HotelListAddButton;
