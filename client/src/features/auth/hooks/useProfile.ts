import api from '@/app/api/api';
import { ProfileResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';

type Options = {
  enabled?: boolean;
};

export default function useProfile(options?: Options) {
  const enabled = options?.enabled ?? true;

  const query = useQuery<ProfileResponse, APIError>({
    queryKey: ['profile'],
    queryFn: () => api.get('auth/profile').json(),
    enabled
  });

  return query;
}