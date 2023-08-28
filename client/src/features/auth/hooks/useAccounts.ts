import API from '@/app/api/api';
import { AccountsResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ErrorResponse } from '@/app/api/types';

export default function useAccounts() {
  const query = useQuery<AccountsResponse, ErrorResponse>({
    queryKey: ['accounts'],
    queryFn: () => API.get('/auth/accounts'),
  });
  return query;
}