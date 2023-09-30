import api from '@/app/api/api';
import { AccountsResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';

export default function useAccounts() {
  const query = useQuery<AccountsResponse, APIError>({
    queryKey: ['accounts'],
    queryFn: () => api.get('auth/accounts').json(),
  });

  return query;
}