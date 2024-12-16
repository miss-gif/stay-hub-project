import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Hotel as HotelType } from '@/types/hotel';

function Hotel({ hotel }: { hotel: HotelType }) {
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
