import { PayloadAction } from '../../payload-action';
import { User } from './user';

export enum UserActionTypes {
  LoadProfile = '[USER]LOAD_PROFILE',
  LoadStarted = '[USER]LOAD_STARTED',
  LoadSucceeded = '[USER]LOAD_SUCCEEDED',
  LoadFailed = '[USER]LOAD_FAILED',
  SaveStarted = '[USER]SAVE_STARTED',
  SaveSucceeded = '[USER]SAVE_SUCCEEDED',
  SaveFailed = '[USER]SAVE_FAILED'
}

export class UserActions {
  static loadProfile(): PayloadAction {
    return {
      type: UserActionTypes.LoadProfile,
    }
  }
  static loadStart(userId: number): PayloadAction {
    return {
      type: UserActionTypes.LoadStarted,
      payload: userId
    }
  }
  static loadSucceeded(user: User): PayloadAction {
    return {
      type: UserActionTypes.LoadSucceeded,
      payload: user
    }
  }
  static loadFailed(error: any): PayloadAction {
    return {
      type: UserActionTypes.LoadFailed,
      error: error
    }
  }
  static saveStart(user: User, password: string): PayloadAction {
    return {
      type: UserActionTypes.SaveStarted,
      payload: {
        user,
        password
      }
    }
  }
  static saveSucceeded(user: User): PayloadAction {
    return {
      type: UserActionTypes.SaveSucceeded,
      payload: user
    }
  }
  static saveFailed(error: any): PayloadAction {
    return {
      type: UserActionTypes.SaveFailed,
      error: error
    }
  }
}
