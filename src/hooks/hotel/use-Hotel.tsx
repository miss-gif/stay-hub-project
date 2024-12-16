import { getHotel } from '@/apis/hotel';
import { useQuery } from '@tanstack/react-query';

const useHotel = (id: string) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id),
  });
};

export default useHotel;
