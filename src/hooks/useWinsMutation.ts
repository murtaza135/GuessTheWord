import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateWins } from '@/app/api/api';

export default function useWinsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWins,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['wins'] });
      const previousData = queryClient.getQueryData(['wins']);
      queryClient.setQueryData(['wins'], newData);
      return { previousData };
    },
    onError: (_error, _newData, context) => {
      queryClient.setQueryData(['wins'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wins'] });
    }
  });
}