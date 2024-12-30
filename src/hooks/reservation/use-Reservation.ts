import { getHotelWithRoom } from '@/apis/hotel';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useReservation = ({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['hotelWithRoom', hotelId, roomId],
    queryFn: () => getHotelWithRoom(hotelId, roomId),
  });

  useEffect(() => {
    if (data?.room?.avaliableCount === 0) {
      alert('해당 방은 예약이 불가능합니다.');
    }
  }, [data]);

  return { data, isLoading };
};

export default useReservation;
