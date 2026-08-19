/**
 * API client — centralised HTTP abstraction
 * Replace the base URL via VITE_API_BASE_URL to connect a real backend.
 * All components call service methods, never fetch() directly.
 */

import { env } from '../config/env';
import type { ApiResponse } from '../types/api';

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const url = `${env.apiBaseUrl}${path}`;

  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message ?? `Request failed with status ${response.status}`,
      response.status,
      errorData.code
    );
  }

  return response.json() as Promise<ApiResponse<T>>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

export { ApiError };
