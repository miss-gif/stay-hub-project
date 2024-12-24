import { getLikes, toggleLike } from '@/apis/like';
import useUserStore from '@/stores/user';
import { Hotel } from '@/types/hotel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLike = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const client = useQueryClient();

  // 좋아요 목록 가져오기
  const { data } = useQuery({
    queryKey: ['likes', user?.uid], // 'userId'를 포함해 고유하게 설정
    queryFn: () => getLikes({ userId: user?.uid as string }),
    enabled: user != null,
  });

  // 좋아요 추가/삭제
  const { mutate } = useMutation({
    mutationFn: ({
      hotel,
    }: {
      hotel: Pick<Hotel, 'name' | 'id' | 'mainImage'>;
    }) => {
      if (!user) {
        throw new Error('로그인 필요');
      }
      return toggleLike({ hotel, userId: user.uid });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['likes'] });
    },

    onError: (e: Error) => {
      if (e.message === '로그인 필요') {
        alert('로그인이 필요합니다.');
        navigate('/signin');
      } else {
        alert('에러가 발생했습니다.');
      }
    },
  });

  return { data, mutate };
};

export default useLike;
