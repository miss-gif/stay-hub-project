import { COLLECTIONS } from '@/constants';
import { db } from '@/remote/firebaseConfig';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

export const getReviews = async ({ hotelId }: { hotelId: string }) => {
  // 호텔 정보 참조
  const hotelRef = doc(db, COLLECTIONS.HOTEL, hotelId);

  // 호텔 리뷰 목록 조회 쿼리 생성
  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  );

  // 호텔 리뷰 목록 조회
  const reviewSnapshot = await getDocs(reviewQuery);

  // 리뷰 데이터를 변환하여 배열로 저장
  const reviews = reviewSnapshot.docs.map(doc => {
    const review = doc.data();
    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review;
  });

  // 유저 정보를 캐싱하기 위한 객체
  const userMap: { [key: string]: User } = {};

  // 최종 결과 배열
  const results: Array<Review & { user: User }> = [];

  // 각 리뷰에 대해 유저 정보를 추가
  for (const review of reviews) {
    // 캐시된 유저 정보 확인
    const cachedUser = userMap[review.userId];

    if (!cachedUser) {
      // 유저 정보가 캐시되어 있지 않으면 Firestore에서 조회
      const userRef = doc(db, COLLECTIONS.USERS, review.userId);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data() as User;

      // 유저 정보를 캐시에 저장
      userMap[review.userId] = user;
      results.push({ ...review, user });
    } else {
      // 캐시된 유저 정보 사용
      results.push({ ...review, user: cachedUser });
    }
  }

  return results;
};

export const writeReview = (review: Omit<Review, 'id'>) => {
  // 호텔 정보 참조
  const hotelRef = doc(db, COLLECTIONS.HOTEL, review.hotelId);

  // 리뷰 정보 참조
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW));

  return setDoc(reviewRef, review);
};
