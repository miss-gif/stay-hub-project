import useHotels from '@/hooks/hotel/use-Hotels';
import Hotel from './Hotel';
import InfinityScroll from 'react-infinite-scroll-component';

const HotelList = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels();

  console.log(hotels);

  return (
    <div>
      <div className="px-6">
        <h2 className="text-2xl font-semibold">인기 호텔</h2>
        <p className="text-sm font-semibold">호텔부터 펜션까지 최저가</p>
      </div>

      <InfinityScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        next={loadMore}
        scrollThreshold={0.9}
      >
        <ul className="bg-neutral-200 space-y-2">
          {hotels.map(hotel => (
            <Hotel key={hotel.id} hotel={hotel} />
          ))}
        </ul>
      </InfinityScroll>
    </div>
  );
};

export default HotelList;
