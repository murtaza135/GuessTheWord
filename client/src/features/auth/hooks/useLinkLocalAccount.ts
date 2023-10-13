import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '@/app/api/api';
import { RegisterSchema } from "@/features/auth/schema";
import { APIError } from '@/app/errors/APIError';

type Options = {
  successRedirect?: string;
};

export function useLinkLocalAccount(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<null, APIError, RegisterSchema>({
    mutationFn: (args) => api.post('auth/local/link', { json: args }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast.error(error.message, { id: 'link-local-account' })
  });

  return mutation;
}
