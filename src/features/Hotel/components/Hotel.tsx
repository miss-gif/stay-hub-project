import TagComponent from '@/components/TagComponent';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Hotel as HotelType } from '@/types/hotel';
import { formatTime } from '@/utils/formatTime';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

function Hotel({ hotel }: { hotel: HotelType }) {
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

  const tag = () => {
    // 이벤트가 없는 경우
    if (hotel.events == null) {
      return null;
    }

    const { name, tagThemeStyle } = hotel.events;

    const promotionTime =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''; // 남은 시간을 포함

    return (
      <TagComponent
        name={name}
        tagThemeStyle={tagThemeStyle}
        promotionTime={promotionTime} // 남은 시간을 포함
      />
    );
  };

  return (
    <li>
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
            {tag()}
            <h3 className="text-xl font-bold">{hotel.name}</h3>
            <p className="text-sm font-semibold">{hotel.comment}</p>
            <p className="text-xs text-neutral-400 font-semibold">
              {hotel.starRating} Stars
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <img
              src={hotel.mainImage}
              alt={hotel.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <p className="font-semibold text-base px-2">
              {hotel.price.toLocaleString()}원
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </li>
  );
}

export default Hotel;
