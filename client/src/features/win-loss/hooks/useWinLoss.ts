import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/app/api/api';
import APIError from '@/app/api/APIError';
import { WinLossResponse } from '../types';
import { UseQueryResult } from '@tanstack/react-query';
import useStore from '@/app/store';

type UseWinLossResult = Omit<UseQueryResult<WinLossResponse, APIError>, 'data'> & {
  wins?: number;
  losses?: number;
};

export default function useWinLoss(): UseWinLossResult {
  const queryClient = useQueryClient();
  const isGuestMode = useStore.use.isGuestMode();

  const { data, ...rest } = useQuery<WinLossResponse, APIError>({
    queryKey: ['winLoss'],
    queryFn: async () => {
      if (!isGuestMode) return api.get('winLoss').json();
      const winLossData = queryClient.getQueryData<WinLossResponse>(['winLoss']);
      return winLossData || { wins: 0, losses: 0 };
    },
  });

  return {
    wins: data?.wins,
    losses: data?.losses,
    ...rest
  };
}