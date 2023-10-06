import api from '@/app/api/api';
import { ProfileResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';
import useStore from '@/app/store';

export default function useProfile() {
  const isGuestMode = useStore.use.isGuestMode();

  const query = useQuery<ProfileResponse, APIError>({
    queryKey: ['profile'],
    queryFn: () => {
      if (!isGuestMode) return api.get('auth/profile').json();
      return { userId: -1, name: 'Guest' } as ProfileResponse;
    },
  });

  return query;
}