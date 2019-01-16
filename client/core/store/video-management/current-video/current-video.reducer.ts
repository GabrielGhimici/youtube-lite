import { PayloadAction } from '../../payload-action';
import { CurrentVideoState } from './current-video';
import { CurrentVideoActionTypes } from './current-video.actions';
import * as _ from 'lodash';

const INITIAL_STATE: CurrentVideoState = {
  video: null,
  loading: true,
  saving: false,
  error: null
};

export function currentVideoReducer(state: CurrentVideoState = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case CurrentVideoActionTypes.LikeStart:
    case CurrentVideoActionTypes.DislikeStart:
    case CurrentVideoActionTypes.AddCommentStart:
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
    case CurrentVideoActionTypes.LikeSucceeded: {
      const newState = _.cloneDeep(state);
      newState.video.metadata.likes = action.payload;
      newState.loading = false;
      newState.error = null;
      return {
        ...state,
        ...newState
      }
    }
    case CurrentVideoActionTypes.AddCommentSucceeded: {
      const newState = _.cloneDeep(state);
      newState.video.addComment(action.payload);
      newState.loading = false;
      newState.error = null;
      return {
        ...state,
        ...newState
      }
    }
    case CurrentVideoActionTypes.DislikeSucceeded: {
      const newState = _.cloneDeep(state);
      newState.video.metadata.dislikes = action.payload;
      newState.loading = false;
      newState.error = null;
      return {
        ...state,
        ...newState
      }
    }
    case CurrentVideoActionTypes.LikeFailed:
    case CurrentVideoActionTypes.DislikeFailed:
    case CurrentVideoActionTypes.AddCommentFailed:
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
