import { makeRequest } from './makeRequest';
import { IDefParams, IRequestParams } from './typings';

export const createApiDef =
  <T>(defParams: IDefParams) =>
  <E extends T>(reqParams?: IRequestParams<E>) =>
    makeRequest<E>({ ...defParams, ...reqParams });
