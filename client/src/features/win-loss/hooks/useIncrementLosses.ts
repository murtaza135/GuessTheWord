import { useMutation, useQueryClient, UseMutationResult, UseMutateFunction } from '@tanstack/react-query';
import api from '@/app/api/api';
import APIError from '@/app/api/APIError';
import { WinLossResponse } from '../types';

type IncrementLossesVariable = { losses: number; };
type WinLossContext = { previousData: WinLossResponse; };

type UseIncrementLossesResult = Omit<UseMutationResult<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>, 'data' | 'mutate'> & {
  wins?: number;
  losses?: number;
  incrementLosses: UseMutateFunction<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>;
};

export default function useIncrementLosses(): UseIncrementLossesResult {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation<WinLossResponse, APIError, IncrementLossesVariable, WinLossContext>({
    mutationKey: ['incrementLoss'],
    mutationFn: (args) => api.post('losses/increment', { json: args }).json(),
    onMutate: async ({ losses }) => { // i.e. incremented losses
      await queryClient.cancelQueries({ queryKey: ['winLoss'] });
      const previousData = queryClient.getQueryData<WinLossResponse>(['winLoss']) ?? { wins: 0, losses: 0 };
      queryClient.setQueryData<WinLossResponse>(['winLoss'], { ...previousData, losses: previousData.losses + losses });
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