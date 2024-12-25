import { getReviews, writeReview } from '@/apis/review';
import useUserStore from '@/stores/user';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const useReviews = ({ hotelId }: { hotelId: string }) => {
  const { user } = useUserStore();
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  });

  const { mutateAsync: write } = useMutation({
    mutationFn: async (text: string) => {
      const newReview = {
        hotelId,
        createdAt: new Date(),
        userId: user?.uid as string,
        text,
      };

      await writeReview(newReview);

      return true;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] });
    },
  });

  return { data, isLoading, write };
};

export default useReviews;
