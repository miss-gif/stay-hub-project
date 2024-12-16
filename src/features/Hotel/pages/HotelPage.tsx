import TabsComponent from '@/components/TabsComponent';
import HotelList from '../components/HotelList';
import TestPage from './TestPage';

const tabData = [
  { value: 'list', label: '리스트', component: <HotelList /> },
  { value: 'test', label: '테스트', component: <TestPage /> },
];

const HotelPage = () => {
  return <TabsComponent tabs={tabData} />;
};

export default HotelPage;
