import { Button } from '@/components/ui/button';
import useRooms from '@/hooks/hotel/use-Rooms';

const HotelRooms = ({ hotelId }: { hotelId: string }) => {
  const { data: rooms } = useRooms({ hotelId });

  console.log('rooms', rooms);

  return (
    <div className="my-10">
      <div className="px-4 mb-5 flex justify-between items-center">
        <h3 className="text-xl font-bold">객실정보</h3>
        <div className=" text-gray-400">1박, 세금 포함</div>
      </div>

      <ul className="space-y-4">
        {rooms?.map(room => {
          const lastOne = room.avaliableCount === 1;
          const soldOut = room.avaliableCount === 0;

          return (
            <li
              key={room.roomName}
              className="flex justify-between px-4 items-center"
            >
              <div className="space-x-4 flex items-center">
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{room.roomName}</h4>
                    {lastOne && (
                      <div className="bg-red-500 rounded text-white px-2 py-1 text-xs">
                        마감임박
                      </div>
                    )}
                  </div>
                  <p className="text-sm ">
                    {room.price.toLocaleString()}원
                    <span> / {room.refundable ? '환불가능' : '환불불가'}</span>
                  </p>
                </div>
              </div>
              <Button disabled={soldOut} className="bg-blue-500 font-bold">
                {soldOut ? '매진' : '선택'}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HotelRooms;
