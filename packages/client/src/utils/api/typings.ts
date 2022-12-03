import { apiPaths } from '../constants';

export interface IDefParams {
  type: 'get' | 'delete' | 'post' | 'put';
  url: typeof apiPaths[keyof typeof apiPaths];
  baseURL?: string;
  headers?: Record<string, string>;
}

export interface IRequestParams<E> {
  urlParams?: object | URLSearchParams;
  data?: string | object | ArrayBuffer;
  onSuccess?: (response: E) => void;
  onError?: (err: unknown) => void;
}

export type IMakeRequestParams<T> = IDefParams & IRequestParams<T>;

export interface ErrorResProps {
  [x: string]: ErrorResProps;
}
