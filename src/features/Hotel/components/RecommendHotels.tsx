import { Button } from '@/components/ui/button';
import useRecommendedHotels from '@/hooks/hotel/use-RecommendedHotels';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RecommendHotels = ({
  recommendHotelList,
}: {
  recommendHotelList: string[];
}) => {
  const { data, isLoading } = useRecommendedHotels({
    hotelIds: recommendHotelList,
  });

  const [showMore, setShowMore] = useState(false);

  if (isLoading || !data) {
    return null;
  }

  const displayedHotels =
    showMore || data.length <= 3 ? data : data.slice(0, 3);

  return (
    <div className="px-4 py-4">
      <h3 className="text-xl font-semibold mb-4">추천 호텔</h3>
      <ul className="flex flex-col gap-4">
        {displayedHotels.map(hotel => (
          <li key={hotel.id}>
            <Link to={`/hotel/${hotel.id}`}>
              <div className="flex justify-between gap-4 items-center">
                <img
                  src={hotel.mainImage}
                  alt={`${hotel.name}의 객실 이미지`}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="space-y-2 w-full">
                  <h4 className="text-xl font-bold">{hotel.name}</h4>
                  <p className="text-sm font-semibold">{hotel.comment}</p>
                  <p className="text-sm">{hotel.price.toLocaleString()}원</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {data.length > 3 && !showMore && (
        <Button onClick={() => setShowMore(true)} className="mt-4 w-full">
          더보기
        </Button>
      )}
    </div>
  );
};

export default RecommendHotels;
