import { AuthorizationState } from './authorization';
import { PayloadAction } from '../../payload-action';
import { AuthorizationActionTypes } from './authorization.actions';

const INITIAL_STATE: AuthorizationState = {
  isLoggedIn: null,
  loading: false,
  error: null
};

export function authorizzationReducer(state: AuthorizationState = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case AuthorizationActionTypes.LoginStarted: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      }
    }
    case AuthorizationActionTypes.LoginSucceeded: {
      return {
        ...state,
        ...{
          loading: false,
          error: null,
          isLoggedIn: true
        }
      }
    }
    case AuthorizationActionTypes.LoginFailed: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error,
          isLoggedIn: false
        }
      }
    }
    case AuthorizationActionTypes.LogoutStarted: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      }
    }
    case AuthorizationActionTypes.LogoutSucceeded: {
      return {
        ...state,
        ...{
          loading: false,
          error: null,
          isLoggedIn: false
        }
      }
    }
    case AuthorizationActionTypes.LogoutFailed: {
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
