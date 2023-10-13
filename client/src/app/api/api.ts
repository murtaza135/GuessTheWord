import ky from "ky";
import { config } from '@/app/config';
import { APIError, APIErrorConstructor, } from '@/app/errors/APIError';
import { OfflineError } from '@/app/errors/OfflineError';
import { useStore } from '@/app/store';

export const api = ky.create({
  prefixUrl: config.VITE_API_URL,
  credentials: 'include',
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      (request) => {
        return useStore.getState().isGuestMode ? new Response() : request;
      }
    ],
    beforeRetry: [
      (options) => {
        const isNoInternetError = (
          options.error instanceof TypeError
          && options.error.message === 'Failed to fetch'
        );

        if (isNoInternetError) throw new OfflineError();
      }
    ],
    beforeError: [
      async (error) => {
        const errorResponse: APIErrorConstructor = await error.response.json();
        return Promise.reject(new APIError(errorResponse));
      }
    ],
  },
});
