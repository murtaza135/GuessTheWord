import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLosses } from '@/app/api/old-api';

export default function useLossesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLosses,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['losses'] });
      const previousData = queryClient.getQueryData(['losses']);
      queryClient.setQueryData(['losses'], newData);
      return { previousData };
    },
    onError: (_error, _newData, context) => {
      queryClient.setQueryData(['losses'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['losses'] });
    }
  });
}