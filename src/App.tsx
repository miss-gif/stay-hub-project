import { Route, Routes } from 'react-router-dom';
import HotelPage from './features/Hotel/pages/HotelPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HotelPage />} />
    </Routes>
  );
};

export default App;
