import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import api from '@/app/api/api';
import APIError from '@/app/api/APIError';
import { WinLossResponse } from '../types';
import useStore from '@/app/store';

type Options = {
  refetch?: boolean;
};


type UseWinLossResult = Omit<UseQueryResult<WinLossResponse, APIError>, 'data'> & {
  wins?: number;
  losses?: number;
};

export default function useWinLoss(options?: Options): UseWinLossResult {
  const refetch = options?.refetch ?? true;
  const queryClient = useQueryClient();
  const isGuestMode = useStore.use.isGuestMode();

  const { data, ...rest } = useQuery<WinLossResponse, APIError>({
    queryKey: ['winLoss'],
    queryFn: async () => {
      if (!isGuestMode) return api.get('winLoss').json();
      const winLossData = queryClient.getQueryData<WinLossResponse>(['winLoss']);
      return winLossData || { wins: 0, losses: 0 };
    },
    refetchOnMount: refetch,
    refetchOnReconnect: refetch,
    refetchOnWindowFocus: refetch,
  });

  return {
    wins: data?.wins,
    losses: data?.losses,
    ...rest
  };
}