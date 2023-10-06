import api from '@/app/api/api';
import { ProfileResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';
import useStore from '@/app/store';

type Options = {
  enabled?: boolean;
};

export default function useProfile(options?: Options) {
  const enabled = options?.enabled ?? true;
  const isGuestMode = useStore.use.isGuestMode();

  const query = useQuery<ProfileResponse, APIError>({
    queryKey: ['profile'],
    queryFn: () => {
      if (!isGuestMode) return api.get('auth/profile').json();
      return { userId: -1 };
    },
    enabled
  });

  return query;
}