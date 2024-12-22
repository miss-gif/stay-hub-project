import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useRecommendedHotels from '@/hooks/hotel/use-RecommendedHotels';
import { Link } from 'react-router-dom';

const RecommendHotels = ({
  recommendHotelList,
}: {
  recommendHotelList: string[];
}) => {
  const { data, isLoading } = useRecommendedHotels({
    hotelIds: recommendHotelList,
  });

  if (data == null || isLoading) {
    return null;
  }

  return (
    <div>
      <h3>추천 호텔</h3>
      <ul>
        {data.map(hotel => (
          <li key={hotel.id}>
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
                    <h4 className="text-xl font-bold">{hotel.name}</h4>
                    <p className="text-sm font-semibold">{hotel.comment}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendHotels;
