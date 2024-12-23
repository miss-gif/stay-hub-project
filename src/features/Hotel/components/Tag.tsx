import TagComponent from '@/components/TagComponent';
import { Hotel } from '@/types/hotel';
import { formatTime } from '@/utils/formatTime';

interface TagProps {
  hotel: Hotel;
  remainedTime: number;
}

const Tag = ({ hotel, remainedTime }: TagProps) => {
  // 이벤트가 없는 경우
  if (hotel.events == null) {
    return null;
  }

  const { name, tagThemeStyle } = hotel.events;

  const promotionTime =
    remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''; // 남은 시간을 포함

  return (
    <TagComponent
      name={name}
      tagThemeStyle={tagThemeStyle}
      promotionTime={promotionTime} // 남은 시간을 포함
    />
  );
};

export default Tag;
