import type { AxiosError } from 'axios';
import { apiPaths } from '../constants';

export interface IDefParams {
  type: 'get' | 'delete' | 'post' | 'put';
  url: typeof apiPaths[keyof typeof apiPaths];
  baseURL?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  parse_mode?: string;
}

export interface IApiError {
  reason: string;
}

export type IErrorReq = AxiosError<IApiError>;

export interface IRequestParams<E> {
  urlParams?: object | URLSearchParams;
  data?: string | object | ArrayBuffer;
  code?: string;
  redirect_uri?: string;
  onSuccess?: (response: E) => void;
  onError?: (err: IErrorReq) => void;
}

export type IMakeRequestParams<T> = IDefParams & IRequestParams<T>;
