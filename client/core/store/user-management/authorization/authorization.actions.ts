import { PayloadAction } from '../../payload-action';

export enum AuthorizationActionTypes {
  LoginStarted = '[USER]LOGIN_STARTED',
  LoginSucceeded = '[USER]LOGIN_SUCCEEDED',
  LoginFailed = '[USER]LOGIN_FAILED',
  LogoutStarted = '[USER]LOGOUT_STARTED',
  LogoutSucceeded = '[USER]LOGOUT_SUCCEEDED',
  LogoutFailed = '[USER]LOGOUT_FAILED'
}

export class AuthorizationActions {
  static loginStart(loginInfos: any): PayloadAction {
    return {
      type: AuthorizationActionTypes.LoginStarted,
      payload: loginInfos
    }
  }
  static loginSucceeded(): PayloadAction {
    return {
      type: AuthorizationActionTypes.LoginSucceeded,
    }
  }
  static loginFailed(error: any): PayloadAction {
    return {
      type: AuthorizationActionTypes.LoginFailed,
      error: error
    }
  }
  static logoutStart(): PayloadAction {
    return {
      type: AuthorizationActionTypes.LogoutStarted,
    }
  }
  static logoutSucceeded(): PayloadAction {
    return {
      type: AuthorizationActionTypes.LogoutSucceeded,
    }
  }
  static logoutFailed(error: any): PayloadAction {
    return {
      type: AuthorizationActionTypes.LogoutFailed,
      error: error
    }
  }
}
