import Carousel from '@/components/Carousel';
import useHotel from '@/hooks/hotel/use-Hotel';
import { useParams } from 'react-router-dom';

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hotel, isLoading } = useHotel(id as string);

  console.log(hotel);
  console.log(isLoading);

  if (hotel == null || isLoading) {
    return <div>Loading...</div>;
  }

  const { name, image } = hotel;

  console.log(name);
  console.log('image', image);

  return (
    <div>
      {name}
      <Carousel image={image} />
    </div>
  );
};

export default HotelDetailPage;
