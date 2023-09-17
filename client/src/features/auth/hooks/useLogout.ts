import api from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<null, APIError, null>({
    mutationFn: () => api.post('auth/logout').json(),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
    onError: (error) => toast.error(error.message, { id: 'logout' })
  });
  return mutation;
}