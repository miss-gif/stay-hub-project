import { Route, Routes } from 'react-router-dom';
import HotelDetailPage from './features/Hotel/pages/HotelDetailPage';
import HotelPage from './features/Hotel/pages/HotelPage';
import useLoadKakao from './hooks/use-LoadKakao';

const App = () => {
  useLoadKakao();

  return (
    <Routes>
      <Route path="/" element={<HotelPage />} />
      <Route path="/hotel/:id" element={<HotelDetailPage />} />
    </Routes>
  );
};

export default App;
