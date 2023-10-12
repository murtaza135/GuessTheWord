import api from '@/app/api/api';
import { AccountsResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { CustomUseQueryOptions } from '@/types/custom-react-query';
import APIError from '@/app/errors/APIError';

type Options = CustomUseQueryOptions<AccountsResponse, APIError>;

export default function useAccounts(options?: Options) {
  const query = useQuery<AccountsResponse, APIError>({
    queryKey: ['accounts'],
    queryFn: () => api.get('auth/accounts').json(),
    ...options
  });

  return query;
}