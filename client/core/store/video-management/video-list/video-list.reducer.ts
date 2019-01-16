import { PayloadAction } from '../../payload-action';
import { VideoListState } from './video-list';
import { VideoListActionTypes } from './video-list.actions';

const INITIAL_STATE: VideoListState = {
  items: [],
  loading: false,
  searchParam: null,
  error: null
};

export let videoListReducer = (type: string) => createVideoListReducer(type);

export function createVideoListReducer(type: string) {
  return function listReducer(state: VideoListState = INITIAL_STATE, action: PayloadAction) {
    if (!action.meta || action.meta !== type) {
      return state;
    }
    switch (action.type) {
      case VideoListActionTypes.LoadStart: {
        return {
          ...state,
          ...{
            loading: true,
            error: null
          }
        }
      }
      case VideoListActionTypes.LoadSucceeded: {
        return {
          ...state,
          ...{
            loading: false,
            items: action.payload,
            error: null
          }
        }
      }
      case VideoListActionTypes.LoadFailed: {
        return {
          ...state,
          ...{
            loading: false,
            error: action.error
          }
        }
      }
      default:
        return state;
    }
  }
}
