import APIError from './APIError';
import { ErrorResponse } from './types';
import appConfig from '@/config/config';

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
  private static async handleRequest<SuccessResponse>(endpoint: string, method: APIMethod, { body, config }: APIConfigWithBody): Promise<SuccessResponse> {
    const url = `${appConfig.VITE_API_URL}${endpoint}`;

    const headers = new Headers({
      ...config?.headers,
      'Content-Type': JSON_MIME_TYPE,
    });

    const fetchConfig = {
      ...config,
      headers,
      method,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include'
    } as RequestInit;

    const response = await window.fetch(url, fetchConfig);

    if (response.status === 204) {
      return null as SuccessResponse;
    } else if (response.ok) {
      return response.json();
    } else {
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