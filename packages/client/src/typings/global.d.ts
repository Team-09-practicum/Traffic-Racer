import type { IStateSchema } from './IStateSchema';

declare global {
  interface Window {
    __PRELOADED_STATE__?: IStateSchema;
  }

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
}
