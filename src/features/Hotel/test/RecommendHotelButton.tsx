import { Button } from '@/components/ui/button';
import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

const RecommendHotelButton = () => {
  const handleButtonClick = async () => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.HOTEL));
      const batch = writeBatch(db); // writeBatch를 사용하여 여러개의 데이터를 한번에 추가할 수 있습니다.
      const hotelDocs = snapshot.docs;

      hotelDocs.forEach(hotel => {
        const recommendHotelList = hotelDocs
          .filter(doc => doc.id !== hotel.id)
          .slice(0, 5)
          .map(doc => doc.id);

        batch.update(hotel.ref, {
          recommendHotelList: recommendHotelList,
        });
      });

      await batch.commit();
      alert('추천호텔 데이터 추가 완료');
    } catch (error) {
      console.error('Error updating recommended hotels:', error);
      alert('추천호텔 데이터 추가 실패');
    }
  };

  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가</Button>;
};

export default RecommendHotelButton;
