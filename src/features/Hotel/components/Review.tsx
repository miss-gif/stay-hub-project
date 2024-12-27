import useReviews from '@/hooks/hotel/use-Reviews';
import useUserStore from '@/stores/user';
import { ImageOffIcon, PencilLineIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface ReviewProps {
  hotelId: string;
}

export default function Review({ hotelId }: ReviewProps) {
  const { data: reviews, isLoading, write, remove } = useReviews({ hotelId });
  const { user } = useUserStore();
  const [reviewText, setReviewText] = useState('');

  const handleReviewTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setReviewText(e.target.value),
    [],
  );

  // 리뷰 삭제하기
  const handleRemove = useCallback(
    (reviewId: string) => {
      try {
        remove({ hotelId, reviewId });
      } catch (error) {
        console.error('리뷰 삭제 실패:', error);
      }
    },
    [remove, hotelId],
  );

  // 리뷰 작성하기
  const submitReview = useCallback(async () => {
    if (!reviewText.trim()) return;
    try {
      const success = await write(reviewText.trim());
      if (success) setReviewText('');
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  }, [write, reviewText]);

  if (isLoading) return null;

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold">리뷰</h3>
      {!reviews?.length ? (
        <div className="flex flex-col items-center gap-2 py-5">
          <PencilLineIcon />
          <p className="text-sm">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </p>
        </div>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className="flex justify-between gap-2 py-2">
              <div className="flex items-center gap-2">
                {review.user?.photoURL ? (
                  <img
                    src={review.user.photoURL}
                    alt={review.user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <ImageOffIcon />
                )}
                <div>
                  <p>{review.text}</p>
                  <p className="text-xs">
                    {format(new Date(review.createdAt), 'yyyy-MM-dd')}
                  </p>
                </div>
              </div>
              {user?.uid === review.user?.uid && (
                <Button onClick={() => handleRemove(review.id)}>삭제</Button>
              )}
            </li>
          ))}
        </ul>
      )}
      {user && (
        <div className="grid gap-2">
          <Textarea
            placeholder="리뷰 내용 작성하기"
            value={reviewText}
            onChange={handleReviewTextChange}
          />
          <div className="flex justify-end">
            <Button disabled={!reviewText.trim()} onClick={submitReview}>
              등록
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
