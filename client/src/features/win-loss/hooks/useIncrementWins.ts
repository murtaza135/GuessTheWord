import { useMutation, useQueryClient, UseMutationResult, UseMutateFunction } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import { APIError } from '@/app/errors/APIError';
import { WinLossResponse } from '@/features/win-loss/types';

type IncrementWinsVariable = { wins: number; };
type WinLossContext = { previousData: WinLossResponse; };

type UseIncrementWinsResult = Omit<
  UseMutationResult<WinLossResponse, APIError, IncrementWinsVariable, WinLossContext>,
  'data' | 'mutate'
> & {
  wins?: number;
  losses?: number;
  incrementWins: UseMutateFunction<WinLossResponse, APIError, IncrementWinsVariable, WinLossContext>;
};

export function useIncrementWins(): UseIncrementWinsResult {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation<WinLossResponse, APIError, IncrementWinsVariable, WinLossContext>({
    mutationFn: (args) => api.post('wins/increment', { json: args }).json(),
    onMutate: async ({ wins: numWinsToIncrement }) => {
      await queryClient.cancelQueries({ queryKey: ['winLoss'] });
      const previousData = queryClient.getQueryData<WinLossResponse>(['winLoss']) ?? { wins: 0, losses: 0 };
      queryClient.setQueryData<WinLossResponse>(['winLoss'], { ...previousData, wins: previousData.wins + numWinsToIncrement });
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
    incrementWins: mutate,
    ...rest
  };
}