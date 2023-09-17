import { useQuery } from '@tanstack/react-query';
import api from '@/app/api/api';
import APIError from '@/app/api/APIError';
import { WinLossResponse } from '../types';
import { UseQueryResult } from '@tanstack/react-query';

type UseWinLossResult = Omit<UseQueryResult<WinLossResponse, APIError>, 'data'> & {
  wins?: number;
  losses?: number;
};

export default function useWinLoss(): UseWinLossResult {
  const { data, ...rest } = useQuery<WinLossResponse, APIError>({
    queryKey: ['winLoss'],
    queryFn: () => api.get('winLoss').json(),
  });

  return {
    wins: data?.wins,
    losses: data?.losses,
    ...rest
  };
}