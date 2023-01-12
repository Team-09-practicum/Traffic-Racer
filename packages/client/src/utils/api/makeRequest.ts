import axios from 'axios';
import { API_HOST, API_PATH } from '../constants';
import { IErrorRes, IMakeRequestParams } from './typings';

export const makeRequest = async <T>({
  type,
  url,
  urlParams,
  data,
  baseURL,
  headers,
  withCredentials,
  onSuccess,
  onError,
}: IMakeRequestParams<T>) => {
  const options = {
    url,
    method: type,
    baseURL: baseURL || `${API_HOST}${API_PATH}`,
    timeout: 2000,
    withCredentials: typeof withCredentials === 'undefined' ? true : withCredentials,
    headers: { ...headers },
    data: data || null,
    params: urlParams || null,
  };

  try {
    const response = await axios.request<T>(options);
    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (err) {
    if (onError) {
      onError(err as IErrorRes);
    }
    return undefined;
  }
};
