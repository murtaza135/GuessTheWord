import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { APIError } from '@/app/errors/APIError';
import { api } from '@/app/api/api';
import { useStore } from '@/app/store';
import { LoginSchema } from '@/features/auth/schema';

type Options = {
  successRedirect?: string;
};

export function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, LoginSchema>({
    mutationFn: (args) => api.post('auth/local/login', { json: args }).json(),
    onSuccess: async () => {
      setGuestMode(false);
      await queryClient.refetchQueries({ queryKey: ['profile'] });
      await queryClient.refetchQueries({ queryKey: ['accounts'] });
      await queryClient.refetchQueries({ queryKey: ['winLoss'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'login' })
  });

  return mutation;
}