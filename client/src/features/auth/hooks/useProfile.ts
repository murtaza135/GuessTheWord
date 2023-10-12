import api from '@/app/api/api';
import { ProfileResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { CustomUseQueryOptions } from '@/types/custom-react-query';
import APIError from '@/app/errors/APIError';
import useStore from '@/app/store';

type Options = CustomUseQueryOptions<ProfileResponse, APIError>;

export default function useProfile(options?: Options) {
  const isGuestMode = useStore.use.isGuestMode();

  const query = useQuery<ProfileResponse, APIError>({
    queryKey: ['profile'],
    queryFn: () => {
      if (!isGuestMode) return api.get('auth/profile').json();
      return { userId: -1, name: 'Guest' } as ProfileResponse;
    },
    ...options
  });

  return query;
}