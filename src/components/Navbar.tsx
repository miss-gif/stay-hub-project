import useUserStore from '@/stores/user';
import { CircleUserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUserStore();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold text-gray-800">
        StayHub
      </Link>
      <Link to="/mypage" className="flex items-center">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={`${user.displayName} 이미지`}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <CircleUserRoundIcon className="w-8 h-8 text-gray-500" />
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
