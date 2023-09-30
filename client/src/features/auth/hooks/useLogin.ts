import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '../schema';
import APIError from '@/app/api/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/app/api/api';

type Options = {
  successRedirect?: string;
};

export default function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<null, APIError, LoginSchema>({
    mutationFn: (args) => api.post('auth/local/login', { json: args }).json(),
    onSuccess: async () => {
      console.log("login success");
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      await queryClient.refetchQueries({ queryKey: ['profile'] });
      // TODO is this how you want to handle refetch of profile data?
      // await queryClient.fetchQuery({ queryKey: ['profile'], queryFn: () => api.get('auth/profile').json() });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'login' })
  });

  return mutation;
}