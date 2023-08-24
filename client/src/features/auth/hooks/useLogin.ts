import API from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '../schema';
import { ErrorResponse } from '@/app/api/types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Options = {
  successRedirect?: string;
};

export default function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<null, ErrorResponse, LoginSchema>({
    mutationFn: (args) => API.post('/auth/login/local', { body: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message ?? 'Something went wrong', { id: 'login' })
  });
  return mutation;
}