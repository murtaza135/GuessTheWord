import API from '@/app/api/api2';
import { ProfileResponse } from './types';
import { useQuery } from '@tanstack/react-query';
import { ErrorResponse } from '@/app/api/types';

export default function useProfile() {
  const query = useQuery<ProfileResponse, ErrorResponse>({
    queryKey: ['profile'],
    queryFn: () => API.get('/auth/me'),
  });
  return query;
}