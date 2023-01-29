export enum LoadingStatus {
  Unsent = 'unsent',
  Pending = `pending`,
  Success = `success`,
  Failure = `failure`,
}

export interface IAppStatusState {
  loading: LoadingStatus;
  isAuth: boolean;
  isSoundOn: boolean;
  isFeedbackOpen: boolean;
}
