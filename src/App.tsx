import { Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth/AuthGuard';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/Navbar';
import HotelDetailPage from './features/Hotel/pages/HotelDetailPage';
import HotelPage from './features/Hotel/pages/HotelPage';
import SigninPage from './features/Hotel/pages/SigninPage';
import useLoadKakao from './hooks/use-LoadKakao';
import MyPage from './pages/MyPage';
import LikePage from './pages/settings/LikePage';
import SettingsPage from './pages/settings/SettingsPage';
import Schedule from './features/Hotel/pages/Schedule';
import Reservation from './features/Hotel/pages/Reservation';

const App = () => {
  useLoadKakao();

  return (
    <AuthGuard>
      <Navbar />
      <Routes>
        <Route path="/" element={<HotelPage />} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/like"
          element={
            <PrivateRoute>
              <LikePage />
            </PrivateRoute>
          }
        />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <Schedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </AuthGuard>
  );
};

export default App;
