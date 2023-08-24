import { useQuery } from '@tanstack/react-query';
import API from '@/app/api/api';
import { ErrorResponse } from '@/app/api/types';
import { WinLossResponse } from '../types';
import { UseQueryResult } from '@tanstack/react-query';

type UseWinLossResult = Omit<UseQueryResult<WinLossResponse, ErrorResponse>, 'data'> & {
  wins?: number;
  losses?: number;
};

export default function useWinLoss(): UseWinLossResult {
  const { data, ...rest } = useQuery<WinLossResponse, ErrorResponse>({
    queryKey: ['winLoss'],
    queryFn: () => API.get('/winLoss'),
  });

  return {
    wins: data?.wins,
    losses: data?.losses,
    ...rest
  };
}