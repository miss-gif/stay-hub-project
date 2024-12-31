import HotelFormAddButton from '../test/HotelFormAddButton';
import HotelListAddButton from '../test/HotelListAddButton';
import RecommendHotelButton from '../test/RecommendHotelButton';

const TestPage = () => {
  return (
    <div className="flex  gap-2">
      <HotelListAddButton />
      <RecommendHotelButton />
      <HotelFormAddButton />
    </div>
  );
};

export default TestPage;
