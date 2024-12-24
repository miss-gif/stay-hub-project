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

      if (removed) {
        newItems.splice(to, 0, removed);
      }

      newItems.forEach((item, index) => {
        item.order = index + 1;
      });

      return newItems;
    });
  }, []);

  const save = async () => {
    try {
      await updateLikeOrder({ likes: updatedLikes });
      client.setQueryData(['likes'], updatedLikes);
      setIsEdit(false);
    } catch (error) {
      alert('순서 저장에 실패했습니다.');
    }
  };

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save };
};

export default useEditLike;
