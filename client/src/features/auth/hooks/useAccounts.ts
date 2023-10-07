import api from '@/app/api/api';
import { AccountsResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';

type Options = {
  refetch?: boolean;
};

export default function useAccounts(options?: Options) {
  const refetch = options?.refetch ?? true;

  const query = useQuery<AccountsResponse, APIError>({
    queryKey: ['accounts'],
    queryFn: () => api.get('auth/accounts').json(),
    refetchOnMount: refetch,
    refetchOnReconnect: refetch,
    refetchOnWindowFocus: refetch,
  });

  return query;
}