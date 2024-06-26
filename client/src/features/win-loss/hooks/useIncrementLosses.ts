import { useMutation, useQueryClient, UseMutationResult, UseMutateFunction } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import { APIError } from '@/app/errors/APIError';
import { WinLossResponse } from '@/features/win-loss/types';

type IncrementLossesVariable = { losses: number; };
type WinLossContext = { previousData: WinLossResponse; };

type UseIncrementLossesResult = Omit<
  UseMutationResult<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>,
  'data' | 'mutate'
> & {
  wins?: number;
  losses?: number;
  incrementLosses: UseMutateFunction<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>;
};

export function useIncrementLosses(): UseIncrementLossesResult {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>({
    mutationFn: (args) => api.post('losses/increment', { json: args }).json(),
    onMutate: async ({ losses: numLossesToIncrement }) => {
      await queryClient.cancelQueries({ queryKey: ['winLoss'] });
      const previousData = queryClient.getQueryData<WinLossResponse>(['winLoss']) ?? { wins: 0, losses: 0 };
      queryClient.setQueryData<WinLossResponse>(['winLoss'], { ...previousData, losses: previousData.losses + numLossesToIncrement });
      return { previousData };
    },
    onError: (_error, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<WinLossResponse>(['winLoss'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['winLoss'] });
    }
  });

  return {
    wins: data?.wins,
    losses: data?.losses,
    incrementLosses: mutate,
    ...rest
  };
}