import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const settingsOptions = [
    {
      path: '/settings/like',
      title: '찜하기',
      description: '찜한 호텔 순서 변경',
    },
    {
      path: '/settings/like',
      title: '테스트',
      description: 'UI 테스트',
    },
  ];

  return (
    <div>
      <ul className="p-4 space-y-4">
        {settingsOptions.map((option, index) => (
          <li key={index}>
            <Link to={option.path}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{option.title}</p>
                  <p className="text-sm">{option.description}</p>
                </div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
