import { getRecommendedHotels } from '@/apis/hotel';
import { useQuery } from '@tanstack/react-query';

const useRecommendedHotels = ({ hotelIds }: { hotelIds: string[] }) => {
  return useQuery({
    queryKey: ['recommendHotelList', JSON.stringify(hotelIds)],
    queryFn: () => getRecommendedHotels(hotelIds),
    enabled: hotelIds.length > 0,
  });
};

export default useRecommendedHotels;
