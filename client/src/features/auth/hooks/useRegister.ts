import api from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { RegisterSchema } from "../schema";
import APIError from '@/app/errors/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useStore from '@/app/store';

type Options = {
  successRedirect?: string;
};

export default function useRegister(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, RegisterSchema>({
    mutationFn: (args) => api.post('auth/local/register', { json: args }).json(),
    onSuccess: async () => {
      setGuestMode(false);
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      await queryClient.refetchQueries({ queryKey: ['profile'] });
      // TODO is this how you want to handle refetch of profile data?
      // await queryClient.ensureQueryData({ queryKey: ['profile'], queryFn: () => api.get('auth/profile').json() });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'register' })
  });

  return mutation;
}