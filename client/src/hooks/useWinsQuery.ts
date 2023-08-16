import { useQuery } from '@tanstack/react-query';
import { getWins } from '@/app/api/api';

export default function useWinsQuery() {
  const { data: wins, ...rest } = useQuery({
    queryKey: ['wins'],
    queryFn: getWins
  });

  return { wins, ...rest };
}