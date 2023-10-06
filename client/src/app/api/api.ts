import ky from "ky";
import config from '@/config/config';
import APIError, { APIErrorConstructor } from './APIError';
import useStore from '../store';

const api = ky.create({
  prefixUrl: config.VITE_API_URL,
  credentials: 'include',
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      (request) => useStore.getState().isGuestMode ? new Response() : request
    ],
    beforeError: [
      async (error) => {
        const errorResponse: APIErrorConstructor = await error.response.json();
        return Promise.reject(new APIError(errorResponse));
      }
    ]
  },
});

export default api;