import { Button } from '@/components/ui/button';
import useShare from '@/hooks/use-Share';
import { Hotel } from '@/types/hotel';
import { CopyIcon, HeartIcon } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ActionButtonProps {
  hotel: Hotel;
}

const ActionButton: React.FC<ActionButtonProps> = ({ hotel }) => {
  const share = useShare();
  const { name, comment, mainImage } = hotel;

  const handleShare = () => {
    share({
      title: name,
      description: comment,
      imageUrl: mainImage,
      buttonLabel: '자세히보기',
    });
  };

  const handleCopy = () => {
    alert('링크가 복사되었습니다.');
  };

  const handleFavorite = () => {
    alert('찜하기 버튼이 클릭되었습니다.');
  };

  return (
    <div className="flex px-4 gap-4">
      <Button
        variant="outline"
        className="flex-1 border-none"
        onClick={handleFavorite}
      >
        <div className="flex items-center flex-col">
          <HeartIcon />
          찜하기
        </div>
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-none"
        onClick={handleShare}
      >
        <div className="flex items-center flex-col">
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡"
            className="w-4 h-4"
          />
          공유하기
        </div>
      </Button>
      <CopyToClipboard text={window.location.href} onCopy={handleCopy}>
        <Button variant="outline" className="flex-1 border-none">
          <div className="flex items-center flex-col">
            <CopyIcon />
            링크복사
          </div>
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default ActionButton;
