import { useMutation, useQueryClient, UseMutationResult, UseMutateFunction } from '@tanstack/react-query';
import API from '@/app/api/api';
import { ErrorResponse } from '@/app/api/types';
import { WinLossResponse } from '../types';

type IncrementWinsVariable = { wins: number; };
type WinLossContext = { previousData: WinLossResponse; };

type UseIncrementWinsResult = Omit<UseMutationResult<WinLossResponse, ErrorResponse, IncrementWinsVariable, WinLossContext>, 'data' | 'mutate'> & {
  wins?: number;
  losses?: number;
  incrementWins: UseMutateFunction<WinLossResponse, ErrorResponse, IncrementWinsVariable, WinLossContext>;
};

export default function useIncrementWins(): UseIncrementWinsResult {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation<WinLossResponse, ErrorResponse, IncrementWinsVariable, WinLossContext>({
    mutationFn: (args) => API.post('/wins/increment', { body: args }),
    onMutate: async ({ wins }) => { // i.e. incremented wins
      await queryClient.cancelQueries({ queryKey: ['winLoss'] });
      const previousData = queryClient.getQueryData<WinLossResponse>(['winLoss']) ?? { wins: 0, losses: 0 };
      queryClient.setQueryData<WinLossResponse>(['winLoss'], { ...previousData, wins: previousData.wins + wins });
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