import { PayloadAction } from '../../payload-action';

export enum CurrentVideoActionTypes {
  LoadStart = '[CURRENT_VIDEO]LOAD_START',
  LoadSucceeded = '[CURRENT_VIDEO]LOAD_SUCCEEDED',
  LoadFailed = '[CURRENT_VIDEO]LOAD_FAILED'
}

export class CurrentVideoActions {
  static loadData(id: number): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LoadStart,
      payload: {
        id
      }
    };
  }

  static loadSucceeded(payload: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LoadSucceeded,
      payload
    };
  }

  static loadFailed(error: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LoadFailed,
      error,
    };
  }
}
