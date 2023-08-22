import { API_URL } from '@/config/constants';
import APIError from './APIError';
import { ErrorResponse } from './types';
import { TokenResponse } from '@/components/auth/types';

type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE';
type APIBody = BodyInit | Record<string, unknown>;
type APIConfig = Omit<RequestInit, 'method' | 'body'>;

type APIConfigWithoutBody = {
  config?: APIConfig;
};

type APIConfigWithBody = {
  body?: APIBody;
  config?: APIConfig;
};

const JSON_MIME_TYPE = 'application/json';

export default class API {
  private static async handleRequest<SuccessResponse>(endpoint: string, method: APIMethod, { body, config }: APIConfigWithBody) {
    const url = `${API_URL}${endpoint}`;
    const token = localStorage.getItem('token');

    const headers = new Headers({
      ...config?.headers,
      'Content-Type': JSON_MIME_TYPE,
      'Authorization': token ? `Bearer ${token}` : '',
    });

    const fetchConfig = {
      ...config,
      headers,
      method,
      body: body ? JSON.stringify(body) : undefined
    } as RequestInit;

    const response = await window.fetch(url, fetchConfig);

    if (response.ok) {
      const data: SuccessResponse = await response.json();
      if (endpoint === '/auth/login' || endpoint === '/auth/register') {
        const token = (data as TokenResponse).token;
        localStorage.setItem('token', token);
      }
      return data;
    } else {
      if (response.status === 401) localStorage.removeItem('token');
      const errorResponse: ErrorResponse = await response.json();
      return Promise.reject(new APIError(errorResponse));
    }
  }

  static async get<SuccessResponse>(endpoint: string, { config }: APIConfigWithoutBody = {}) {
    return API.handleRequest<SuccessResponse>(endpoint, 'GET', { config });
  }

  static async post<SuccessResponse>(endpoint: string, { body, config }: APIConfigWithBody = {}) {
    return API.handleRequest<SuccessResponse>(endpoint, 'POST', { body, config });
  }

  static async put<SuccessResponse>(endpoint: string, { body, config }: APIConfigWithBody = {}) {
    return API.handleRequest<SuccessResponse>(endpoint, 'PUT', { body, config });
  }

  static async delete<SuccessResponse>(endpoint: string, { config }: APIConfigWithoutBody = {}) {
    return API.handleRequest<SuccessResponse>(endpoint, 'DELETE', { config });
  }

  static async fetch<SuccessResponse>(endpoint: string, method: APIMethod, { body, config }: APIConfigWithBody = {}) {
    return API.handleRequest<SuccessResponse>(endpoint, method, { body, config });
  }
}