import api from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useStore from '@/app/store';
import { clear, createStore } from "idb-keyval";
import Cookies from 'js-cookie';
import config from '@/config/config';

const workboxBackgroundSyncDB = createStore('workbox-background-sync', 'requests');

export default function useLogout() {
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

  return mutation;
}