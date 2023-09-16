import API from '@/app/api/api';
import { ProfileResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ErrorResponse } from '@/app/api/types';

type Options = {
  enabled?: boolean;
};

export default function useProfile(options?: Options) {
  const enabled = options?.enabled ?? true;

  const query = useQuery<ProfileResponse, ErrorResponse>({
    queryKey: ['profile'],
    queryFn: () => API.get('/auth/profile'),
    enabled
  });
  return query;
}