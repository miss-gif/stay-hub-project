import { events } from '@/types/hotel';
import { Badge } from './ui/badge';

const TagComponent = ({ name, tagThemeStyle, promotionTime }: events) => {
  const { backgroundColor, fontColor } = tagThemeStyle;

  return (
    <Badge className="text-xs" style={{ backgroundColor, color: fontColor }}>
      {name} {promotionTime}
    </Badge>
  );
};

export default TagComponent;
