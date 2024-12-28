import qs from 'qs';
import { useEffect } from 'react';

const Schedule = () => {
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string };

  useEffect(() => {
    if (roomId === '' || hotelId === '') {
      window.history.back();
    }
  }, [roomId, hotelId]);

  return <div>Schedule</div>;
};

export default Schedule;
