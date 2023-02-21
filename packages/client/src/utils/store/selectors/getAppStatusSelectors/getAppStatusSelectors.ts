import { IStateSchema } from '@/typings/IStateSchema';

export const getLoadingStatus = (state: IStateSchema) => state.appStatus.loading;

export const getIsSoundOn = (state: IStateSchema) => state.appStatus.isSoundOn;

export const getIsFeedbackOpen = (state: IStateSchema) => state.appStatus.isFeedbackOpen;
