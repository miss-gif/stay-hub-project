import { Route, Routes } from 'react-router-dom';
import HotelPage from './features/Hotel/pages/HotelPage';
import HotelDetailPage from './features/Hotel/pages/HotelDetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HotelPage />} />
      <Route path="/hotel/:id" element={<HotelDetailPage />} />
    </Routes>
  );
};

export default App;
