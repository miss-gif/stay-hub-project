import { Hotel } from '@/types/hotel';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoolgleMap = ({ location }: { location: Hotel['location'] }) => {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOLE_MAP_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pb-4">
      <h3 className="text-xl font-semibold">위치 정보</h3>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '200px',
          margin: '20px 0',
          boxSizing: 'border-box',
        }}
        center={{
          lat: y,
          lng: x,
        }}
        zoom={15}
      >
        <Marker position={{ lat: y, lng: x }} />
      </GoogleMap>
      <div className="text-sm">{directions}</div>
    </div>
  );
};

export default GoolgleMap;
