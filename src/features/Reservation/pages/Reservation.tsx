import useReservation from '@/hooks/reservation/use-Reservation';
import { parse } from 'qs';
import { useEffect } from 'react';
import ReservationForm from '../components/ReservationForm';
import Summary from '../components/Summary';
import { ReservationFormData } from '@/types/form';
import useUserStore from '@/stores/user';

const Reservation = () => {
  const { user } = useUserStore();
  console.log('user', user);

  // URL 쿼리 파라미터를 파싱하여 예약 정보를 가져옵니다.
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
    // 필수 파라미터가 누락된 경우 이전 페이지로 돌아갑니다.
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some(
        param => param === null,
      )
    ) {
      window.history.back();
    }
  }, [startDate, endDate, nights, roomId, hotelId, user]);

  // 예약 정보를 가져오는 커스텀 훅을 사용합니다.
  const { data, isLoading } = useReservation({ hotelId, roomId });

  // 데이터가 로딩 중이거나 없는 경우 null을 반환합니다.
  if (isLoading || !data) {
    return null;
  }

  const { hotel, room } = data;

  const SubmitData = (data: ReservationFormData) => {
    console.log('예약 정보', data);
    const reservationData = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      nights,
      ...data,
    };
    // 예약 데이터를 서버로 전송하는 로직을 추가하세요.
    console.log('전송할 예약 데이터', reservationData);

  const buttonLabel = `${nights}박 ${Number(room.price * Number(nights)).toLocaleString()}원 결제하기`;

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={parseInt(nights)}
      />
      <ReservationForm buttonLabel={buttonLabel} SubmitData={SubmitData} />
    </div>
  );
};

export default Reservation;
