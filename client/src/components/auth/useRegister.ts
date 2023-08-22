import API from '@/app/api/api';
import { TokenResponse } from './types';
import { useMutation } from '@tanstack/react-query';
import { RegisterSchema } from '@/pages/register/schema';
import { ErrorResponse } from '@/app/api/types';
import { useNavigate } from 'react-router-dom';

// TODO add redirect based on params

type Options = {
  successRedirect?: string;
};

export default function useRegister(options?: Options) {
  const navigate = useNavigate();
  const mutation = useMutation<TokenResponse, ErrorResponse, RegisterSchema>({
    mutationFn: (args) => API.post('/auth/register', { body: args }),
    onSuccess: () => {
      if (options?.successRedirect) navigate(options.successRedirect);
    }
  });
  return mutation;
}