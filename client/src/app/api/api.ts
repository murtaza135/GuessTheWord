import ky from "ky";
import config from '@/config/config';
import APIError, { APIErrorConstructor } from './APIError';

const api = ky.create({
  prefixUrl: config.VITE_API_URL,
  credentials: 'include',
  throwHttpErrors: true,
  hooks: {
    beforeError: [
      async (error) => {
        const errorResponse: APIErrorConstructor = await error.response.json();
        return Promise.reject(new APIError(errorResponse));
      }
    ]
  }
});

export default api;