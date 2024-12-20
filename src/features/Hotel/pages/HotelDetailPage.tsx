import Carousel from '@/components/Carousel';
import useHotel from '@/hooks/hotel/use-Hotel';
import { useParams } from 'react-router-dom';
import HotelContents from '../components/HotelContents';
import HotelRooms from '../components/HotelRooms';
import GoolgleMap from '../components/GoolgleMap';

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading } = useHotel(id as string);

  if (hotel == null || isLoading) {
    return <div>Loading...</div>;
  }

  const { name, image, comment, contents, location } = hotel;

  return (
    <div>
      <div className="p-4">
        <h2 className="font-semibold text-2xl">{name}</h2>
        <p>{comment}</p>
      </div>
      <Carousel image={image} />
      {id && <HotelRooms hotelId={id} />}
      <HotelContents contents={contents} />
      <GoolgleMap location={location} />
    </div>
  );
};

export default HotelDetailPage;
