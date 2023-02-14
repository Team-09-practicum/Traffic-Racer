export enum LoadingStatus {
  Unsent = 'unsent',
  Pending = `pending`,
  Success = `success`,
  Failure = `failure`,
}

export interface IAppStatusState {
  loading: LoadingStatus;
  isSoundOn: boolean;
  isFeedbackOpen: boolean;
}
