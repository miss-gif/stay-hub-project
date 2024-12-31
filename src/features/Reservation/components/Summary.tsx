import { Room } from '@/types/rooms';

interface SummaryProps {
  hotelName: string;
  room: Room;
  startDate: string;
  endDate: string;
  nights: number;
}

const Summary = ({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) => {
  return (
    <div className="px-4 py-6 flex flex-col gap-4 border-b-4">
      <p className="text-xl font-bold">{hotelName}</p>
      <img
        src={room.imageUrl}
        alt={`${room.roomName}의 이미지`}
        className="w-full h-24 object-cover rounded"
      />
      <p className="font-semibold">{room.roomName}</p>
      <ul className="flex flex-col gap-2 ">
        <li className="flex justify-between">
          <p className="text-gray-500 text-sm">일정</p>
          <p className="text-sm">
            {startDate} - {endDate} ({nights}박)
          </p>
        </li>

        {Object.keys(room.basicInfo).map(key => {
          if (key in INFO_LABEL_MAP) {
            return (
              <li key={key} className="flex justify-between">
                <p className="text-gray-500 text-sm">
                  {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}
                </p>
                <p className="text-sm">{room.basicInfo[key]}</p>
              </li>
            );
          }
          return null; // key가 INFO_LABEL_MAP에 없을 경우 null 반환
        })}
      </ul>
    </div>
  );
};

export default Summary;

// 정보 라벨 매핑 객체
const INFO_LABEL_MAP = {
  bed: '침대',
  maxOccupancy: '최대 인원',
  squareMeters: '면적',
  smoke: '흡연 여부',
};
