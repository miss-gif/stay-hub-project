import qs from 'qs';
import { useEffect, useState } from 'react';
import RangePicker from '../components/RangePicker';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId?: string; hotelId?: string };

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  });

  // 예약 페이지로 이동하는 함수
  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        roomId,
        hotelId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    );
    navigate(`/reservation${params}`);
  };

  useEffect(() => {
    // roomId 또는 hotelId가 없으면 이전 페이지로 이동
    if (roomId === '' || hotelId === '') {
      window.history.back();
    }
  }, [roomId, hotelId]);

  return (
    <div className="px-4 pb-20">
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={dateRange => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          });
        }}
      />
      <div className="fixed bottom-0 left-0 w-full p-4">
        <Button
          className="w-full"
          disabled={!selectedDate.startDate && !selectedDate.endDate}
          onClick={moveToReservationPage}
        >
          {selectedDate.startDate || '시작 날짜'} ~{' '}
          {selectedDate.endDate || '종료 날짜'} ({selectedDate.nights}박)
        </Button>
      </div>
    </div>
  );
};

export default Schedule;
