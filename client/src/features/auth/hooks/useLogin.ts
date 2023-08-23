import API from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '@/features/auth/schema';
import { ErrorResponse } from '@/app/api/types';
import { useNavigate } from 'react-router-dom';

// TODO add redirect based on params

type Options = {
  successRedirect?: string;
};

export default function useLogin(options?: Options) {
  const navigate = useNavigate();
  const mutation = useMutation<null, ErrorResponse, LoginSchema>({
    mutationFn: (args) => API.post('/auth/login/local', { body: args }),
    onSuccess: () => {
      if (options?.successRedirect) navigate(options.successRedirect);
    }
  });
  return mutation;
}