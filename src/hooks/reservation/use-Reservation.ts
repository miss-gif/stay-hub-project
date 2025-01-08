import { getHotelWithRoom } from '@/apis/hotel';
import makeReservation from '@/apis/reservation';
import { Reservation } from '@/types/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.room?.avaliableCount === 0) {
      alert('해당 방은 예약이 불가능합니다.');
      navigate(-1);
    }
  }, [data, navigate]);

  const mutation = useMutation({
    mutationFn: (reservation: Reservation) => makeReservation(reservation),
    onError: error => {
      console.error('예약 중 오류가 발생했습니다.', error);
      navigate(-1);
    },
  });

  return { data, isLoading, makeReservation: mutation };
};

export default useReservation;
