import API from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/app/api/types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<null, ErrorResponse, null>({
    mutationFn: () => API.post('/auth/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/');
    }
  });
  return mutation;
}