import type { IStateSchema } from './IStateSchema';

declare global {
  interface Window {
    __PRELOADED_STATE__?: IStateSchema;
  }
}
