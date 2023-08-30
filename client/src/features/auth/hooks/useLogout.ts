import API from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/app/api/types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<null, ErrorResponse, null>({
    mutationFn: () => API.post('/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
    onError: (error) => toast.error(error.message ?? 'Something went wrong', { id: 'logout' })
  });
  return mutation;
}