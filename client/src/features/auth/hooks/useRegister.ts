import { api } from '@/app/api/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { RegisterSchema } from "@/features/auth/schema";
import { APIError } from '@/app/errors/APIError';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useStore } from '@/app/store';

type Options = {
  successRedirect?: string;
};

export function useRegister(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, RegisterSchema>({
    mutationFn: (args) => api.post('auth/local/register', { json: args }).json(),
    onSuccess: async () => {
      setGuestMode(false);
      await queryClient.refetchQueries({ queryKey: ['profile'] });
      await queryClient.refetchQueries({ queryKey: ['accounts'] });
      await queryClient.refetchQueries({ queryKey: ['winLoss'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'register' })
  });

  return mutation;
}