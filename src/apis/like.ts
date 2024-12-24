import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Hotel } from '@/types/hotel';
import { Like } from '@/types/like';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

// 좋아요 목록 가져오기
export const getLikes = async ({ userId }: { userId: string }) => {
  console.log('Query userId:', userId);
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.LIKES),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  );

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  );
};

// 좋아요 추가/삭제
export const toggleLike = async ({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImage'>;
  userId: string;
}) => {
  // 사용자가 해당 호텔을 이미 좋아요 했는지 확인
  const findSnapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.LIKES),
      where('userId', '==', userId),
      where('hotelId', '==', String(hotel.id)),
    ),
  );

  if (findSnapshot.docs.length > 0) {
    // 이미 좋아요 한 경우, 좋아요를 삭제
    const removeTarget = findSnapshot.docs[0];
    const removeTargetOrder = removeTarget.data().order;

    // 삭제할 좋아요보다 순서가 큰 좋아요들을 업데이트
    const updataTargetSnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.LIKES),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    );

    if (updataTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref);
    } else {
      const batch = writeBatch(db);

      updataTargetSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { order: doc.data().order - 1 });
      });

      await batch.commit();

      return deleteDoc(removeTarget.ref);
    }
  } else {
    // 좋아요 하지 않은 경우, 좋아요 추가
    const lastLikeSnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.LIKES),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    );
    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order; // 마지막 좋아요의 order

    const newLike = {
      order: lastOrder + 1,
      hotelId: String(hotel.id),
      hotelName: hotel.name,
      hotelMainImage: hotel.mainImage,
      userId,
    };

    return setDoc(doc(collection(db, COLLECTIONS.LIKES)), newLike);
  }
};
