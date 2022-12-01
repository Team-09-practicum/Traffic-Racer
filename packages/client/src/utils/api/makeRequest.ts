import axios from 'axios';
import { API_HOST, API_PATH } from '../constants';
import { IMakeRequestParams } from './typings';

const defaultHeaders = {
  'content-type': 'application/json',
};

export const makeRequest = async <T>({
  type,
  url,
  urlParams,
  data,
  baseURL,
  headers,
  onSuccess,
  onError,
}: IMakeRequestParams<T>) => {
  const options = {
    url,
    method: type,
    baseURL: baseURL || `${API_HOST}${API_PATH}`,
    timeout: 2000,
    withCredentials: true,
    headers: { ...defaultHeaders, ...headers },
    data: data || null,
    params: urlParams || null,
  };

  try {
    const response = await axios.request<T>(options);
    if (onSuccess) {
      onSuccess(response.data);
    }
  } catch {
    if (onError) {
      onError();
    }
  }
};
