import { PayloadAction } from '../../payload-action';

export enum VideoListActionTypes {
  LoadStart = '[VIDEO_LIST]LOAD_START',
  LoadSucceeded = '[VIDEO_LIST]LOAD_SUCCEEDED',
  LoadFailed = '[VIDEO_LIST]LOAD_FAILED'
}

export class VideoListActions {
  static loadData(type: string, params?: any): PayloadAction {
    return {
      type: VideoListActionTypes.LoadStart,
      meta: type,
      payload: params || {}
    };
  }

  static loadSucceeded(type: string, payload: any): PayloadAction {
    return {
      type: VideoListActionTypes.LoadSucceeded,
      meta: type,
      payload
    };
  }

  static loadFailed(type: string, error: any): PayloadAction {
    return {
      type: VideoListActionTypes.LoadFailed,
      meta: type,
      error,
    };
  }
}
