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
      (request) => {
        // console.log("BEFORE REQUEST");
        return useStore.getState().isGuestMode ? new Response() : request;
      }
    ],
    beforeRetry: [
      (options) => {
        // console.log("BEFORE RETRY");
        // console.log('options in before retry:', options);
      }
    ],
    beforeError: [
      async (error) => {
        // console.log("BEFORE ERROR");
        // console.log('ky error:', error);
        const errorResponse: APIErrorConstructor = await error.response.json();
        return Promise.reject(new APIError(errorResponse));
      }
    ],
    afterResponse: [
      async (req, options, res) => {
        // console.log("AFTER RESPONSE");
        // console.log('options in after response:', options);
        // console.log('request:', req);
        // console.log('response:', res);
        return res;
      }
    ]
  },
});

export default api;