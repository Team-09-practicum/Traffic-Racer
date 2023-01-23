import { apiPaths } from '../constants';

export interface IDefParams {
  type: 'get' | 'delete' | 'post' | 'put';
  url: typeof apiPaths[keyof typeof apiPaths];
  baseURL?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface IErrorRes {
  response: {
    data: {
      reason: string;
    };
  };
}

export interface IRequestParams<E> {
  urlParams?: object | URLSearchParams;
  data?: string | object | ArrayBuffer;
  code?: string;
  redirect_uri?: string;
  onSuccess?: (response: E) => void;
  onError?: (err: IErrorRes) => void;
}

export type IMakeRequestParams<T> = IDefParams & IRequestParams<T>;
