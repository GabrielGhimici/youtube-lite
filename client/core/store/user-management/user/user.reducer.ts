import { UserState } from './user';
import { PayloadAction } from '../../payload-action';
import { UserActionTypes } from './user.actions';

const INITIAL_STATE: UserState = {
  user: null,
  loading: false,
  saving: false,
  error: null
};

export function userReducer(state: UserState = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case UserActionTypes.LoadProfile:
    case UserActionTypes.LoadStarted: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      }
    }
    case UserActionTypes.LoadSucceeded: {
      return {
        ...state,
        ...{
          loading: false,
          error: null,
          user: action.payload
        }
      }
    }
    case UserActionTypes.LoadFailed: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      }
    }
    case UserActionTypes.SaveStarted: {
      return {
        ...state,
        ...{
          saving: true,
          error: null
        }
      }
    }
    case UserActionTypes.SaveSucceeded: {
      return {
        ...state,
        ...{
          saving: false,
          error: null,
          user: action.payload
        }
      }
    }
    case UserActionTypes.SaveFailed: {
      return {
        ...state,
        ...{
          saving: false,
          error: action.error
        }
      }
    }
    default:
      return state;
  }
}
