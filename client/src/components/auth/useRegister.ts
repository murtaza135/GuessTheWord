import API from '@/app/api/api';
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
  const mutation = useMutation<null, ErrorResponse, RegisterSchema>({
    mutationFn: (args) => API.post('/auth/register/local', { body: args }),
    onSuccess: () => {
      if (options?.successRedirect) navigate(options.successRedirect);
    }
  });
  return mutation;
}