import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '../schema';
import APIError from '@/app/errors/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/app/api/api';
import useStore from '@/app/store';

type Options = {
  successRedirect?: string;
};

export default function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, LoginSchema>({
    mutationFn: (args) => api.post('auth/local/login', { json: args }).json(),
    onSuccess: async () => {
      setGuestMode(false);
      // TODO is this how you want to handle refetch of profile data?
      await queryClient.refetchQueries({ queryKey: ['profile'] });
      await queryClient.refetchQueries({ queryKey: ['accounts'] });
      await queryClient.refetchQueries({ queryKey: ['winLoss'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'login' })
  });

  return mutation;
}