import { PayloadAction } from '../../payload-action';
import { CurrentVideoState } from './current-video';
import { CurrentVideoActionTypes } from './current-video.actions';

const INITIAL_STATE: CurrentVideoState = {
  video: null,
  loading: true,
  saving: false,
  error: null
};

export function currentVideoReducer(state: CurrentVideoState = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case CurrentVideoActionTypes.LoadStart: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      }
    }
    case CurrentVideoActionTypes.LoadSucceeded: {
      return {
        ...state,
        ...{
          loading: false,
          video: action.payload,
          error: null
        }
      }
    }
    case CurrentVideoActionTypes.LoadFailed: {
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
