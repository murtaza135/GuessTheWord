import api from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import APIError from '@/app/api/APIError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useStore from '@/app/store';
import { clear, createStore } from "idb-keyval";
const workboxBackgroundSyncDB = createStore('workbox-background-sync', 'requests');

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setGuestMode = useStore.use.setGuestMode();

  const mutation = useMutation<null, APIError, null>({
    mutationFn: () => api.post('auth/logout').json(),
    onSuccess: async () => {
      setGuestMode(false);
      queryClient.clear();
      await clear(workboxBackgroundSyncDB);
      navigate('/login');
    },
    onError: (error) => toast.error(error.message, { id: 'logout' })
  });

  return mutation;
}