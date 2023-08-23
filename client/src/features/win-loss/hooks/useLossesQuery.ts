import { useQuery } from '@tanstack/react-query';
import { getLosses } from '@/app/api/old-api';

export default function useLossesQuery() {
  const { data: losses, ...rest } = useQuery({
    queryKey: ['losses'],
    queryFn: getLosses
  });

  return { losses, ...rest };
}