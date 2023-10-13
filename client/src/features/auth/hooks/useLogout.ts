import { api } from '@/app/api/api';
import { useQueryClient, useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { config } from '@/app/config';
import { APIError } from '@/app/errors/APIError';
import { useStore } from '@/app/store';
import { clear, createStore } from "idb-keyval";
import Cookies from 'js-cookie';

type UseLogoutResult = UseMutationResult<null, APIError, null> & {
  logout: () => void;
};

const workboxBackgroundSyncDB = createStore('workbox-background-sync', 'requests');

export function useLogout(): UseLogoutResult {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, null>({
    mutationFn: () => api.post('auth/logout').json(),
    onMutate: async () => {
      setGuestMode(false);
      Cookies.remove(config.NON_HTTP_SESSION_COOKIE_NAME);
      queryClient.clear();
      await clear(workboxBackgroundSyncDB);
      navigate('/login');
    }
  });

  const logout = () => mutation.mutate(null);

  return { ...mutation, logout };
}