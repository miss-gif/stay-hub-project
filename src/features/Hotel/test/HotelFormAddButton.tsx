import { Button } from '@/components/ui/button';
import { COLLECTIONS } from '@/constants';
import { FORMS } from '@/mock/data';
import { db } from '@/remote/firebaseConfig';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

const HotelFormAddButton = () => {
  const handleButtonClick = async () => {
    try {
      const batch = writeBatch(db);
      const hotelRef = collection(db, COLLECTIONS.HOTEL);
      const snapshot = await getDocs(hotelRef);

      snapshot.docs.forEach(hotel => {
        batch.update(hotel.ref, {
          forms: FORMS,
        });
      });
      await batch.commit();
      alert('폼 데이터가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('폼 데이터 추가 중 오류가 발생했습니다:', error);
    }
  };

  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>;
};

export default HotelFormAddButton;
