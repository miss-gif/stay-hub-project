import { Route, Routes } from 'react-router-dom';
import HotelDetailPage from './features/Hotel/pages/HotelDetailPage';
import HotelPage from './features/Hotel/pages/HotelPage';
import useLoadKakao from './hooks/use-LoadKakao';
import SigninPage from './features/Hotel/pages/SigninPage';
import MyPage from './features/Hotel/pages/MyPage';
import AuthGuard from './components/auth/AuthGuard';
import Navbar from './components/Navbar';

const App = () => {
  useLoadKakao();

  return (
    <AuthGuard>
      <Navbar />
      <Routes>
        <Route path="/" element={<HotelPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </AuthGuard>
  );
};

export default App;
