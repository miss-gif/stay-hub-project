import { Route, Routes } from 'react-router-dom';
import HotelDetailPage from './features/Hotel/pages/HotelDetailPage';
import HotelPage from './features/Hotel/pages/HotelPage';
import useLoadKakao from './hooks/use-LoadKakao';
import SigninPage from './features/Hotel/pages/SigninPage';
import MyPage from './features/Hotel/pages/MyPage';

const App = () => {
  useLoadKakao();

  return (
    <Routes>
      <Route path="/" element={<HotelPage />} />
      <Route path="/hotel/:id" element={<HotelDetailPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
};

export default App;
