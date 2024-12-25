import { updateLikeOrder } from '@/apis/like';
import { Like } from '@/types/like';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import useLike from './use-Like';

const useEditLike = () => {
  const { data } = useLike();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]);
  const client = useQueryClient();

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data);
    }
  }, [data]);

  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true);
    setUpdatedLikes(prevUpdatedLikes => {
      const newItems = [...prevUpdatedLikes];
      const [removed] = newItems.splice(from, 1);

      if (removed != null) {
        newItems.splice(to, 0, removed);
      }

      newItems.forEach((like, index) => {
        like.order = index + 1;
      });

      return newItems;
    });
  }, []);

  const save = async () => {
    try {
      await updateLikeOrder({ likes: updatedLikes });
      client.setQueryData(['likes'], updatedLikes); // 캐시 업데이트
      await client.invalidateQueries({ queryKey: ['likes'] }); // 캐시 데이터를 다시 가져오도록 트리거
      setIsEdit(false);
    } catch (error) {
      alert('순서 저장에 실패했습니다.');
      setIsEdit(false);
    }
  };

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save };
};

export default useEditLike;
