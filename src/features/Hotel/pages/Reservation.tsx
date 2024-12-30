import useReservation from '@/hooks/reservation/use-Reservation';
import { parse } from 'qs';
import { useEffect } from 'react';
import Summary from '../components/Summary';

const Reservation = () => {
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    startDate: string;
    endDate: string;
    nights: string;
    roomId: string;
    hotelId: string;
  };

  useEffect(() => {
    if (
      [startDate, endDate, nights, roomId, hotelId].some(
        param => param === null,
      )
    ) {
      window.history.back();
    }
  }, [startDate, endDate, nights, roomId, hotelId]);

  const { data, isLoading } = useReservation({ hotelId, roomId });

  if (data === null || isLoading === true) {
    return null;
  }

  return (
    <div>
      <Summary />
    </div>
  );
};

export default Reservation;
