import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Hotel as HotelType } from '@/types/hotel';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import { HeartIcon } from 'lucide-react';

function HotelItem({
  hotel,
  isLike,
  onLike,
}: {
  hotel: HotelType;
  isLike: boolean;
  onLike: ({
    hotel,
  }: {
    hotel: Pick<HotelType, 'name' | 'id' | 'mainImage'>;
  }) => void;
}) {
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    // 프로모션 종료 시간이 없거나 null인 경우
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return;
    }

    const promoEndTime = hotel.events.promoEndTime; // 프로모션 종료 시간

    // 1초마다 남은 시간을 계산
    const timer = setInterval(() => {
      const remainingTime = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      );
      setRemainedTime(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer); // 프로모션 종료 후 타이머를 멈춤
      }
    }, 1000);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, [hotel.events]);

  // 좋아요 버튼 클릭 시
  const handleLike = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    onLike({
      hotel: {
        name: hotel.name,
        mainImage: hotel.mainImage,
        id: hotel.id,
      },
    });
  };

  return (
    <li>
      <Link to={`/hotel/${hotel.id}`}>
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="sr-only">{hotel.name}</CardTitle>
            <CardDescription className="sr-only">
              {hotel.name}
              {hotel.comment}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="space-y-2">
              <Tag hotel={hotel} remainedTime={remainedTime} />
              <h3 className="text-xl font-bold">{hotel.name}</h3>
              <p className="text-sm font-semibold">{hotel.comment}</p>
              <p className="text-xs text-neutral-400 font-semibold">
                {hotel.starRating} Stars
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="relative">
                <HeartIcon
                  className={`absolute top-2 right-2 text-red-500 ${isLike ? 'fill-red-500' : ''}`}
                  onClick={handleLike}
                />
                <img
                  src={hotel.mainImage}
                  alt={hotel.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <p className="font-semibold text-base px-2">
                {hotel.price.toLocaleString()}원
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </Link>
    </li>
  );
}

export default HotelItem;
