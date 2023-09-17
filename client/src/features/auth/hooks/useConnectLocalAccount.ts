import api from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { RegisterSchema } from "../schema";
import APIError from '@/app/api/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Options = {
  successRedirect?: string;
};

export default function useConnectLocalAccount(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<null, APIError, RegisterSchema>({
    mutationFn: (args) => api.post('auth/local/link', { json: args }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'connect-local-account' })
  });
  return mutation;
}