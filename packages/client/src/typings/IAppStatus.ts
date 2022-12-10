export enum LoadingStatus {
  Unsent = 'unsent',
  Pending = `pending`,
  Success = `success`,
  Failure = `failure`,
}

export interface IAppStatus {
  loading: LoadingStatus;
  isAuth: boolean;
}
