import { PayloadAction } from '../../payload-action';

export enum CurrentVideoActionTypes {
  LoadStart = '[CURRENT_VIDEO]LOAD_START',
  LoadSucceeded = '[CURRENT_VIDEO]LOAD_SUCCEEDED',
  LoadFailed = '[CURRENT_VIDEO]LOAD_FAILED',
  SaveStart = '[CURRENT_VIDEO]SAVE_START',
  SaveSucceeded = '[CURRENT_VIDEO]SAVE_SUCCEEDED',
  SaveFailed = '[CURRENT_VIDEO]SAVE_FAILED',
  LikeStart = '[CURRENT_VIDEO]LIKE_START',
  LikeSucceeded = '[CURRENT_VIDEO]LIKE_SUCCEEDED',
  LikeFailed = '[CURRENT_VIDEO]LIKE_FAILED',
  DislikeStart = '[CURRENT_VIDEO]DISLIKE_START',
  DislikeSucceeded = '[CURRENT_VIDEO]DISLIKE_SUCCEEDED',
  DislikeFailed = '[CURRENT_VIDEO]DISLIKE_FAILED',
  AddCommentStart = '[CURRENT_VIDEO]ADD_COMMENT_START',
  AddCommentSucceeded = '[CURRENT_VIDEO]ADD_COMMENT_SUCCEEDED',
  AddCommentFailed = '[CURRENT_VIDEO]ADD_COMMENT_FAILED'
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

  static saveData(data: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.SaveStart,
      payload: data
    };
  }

  static saveSucceeded(): PayloadAction {
    return {
      type: CurrentVideoActionTypes.SaveSucceeded
    };
  }

  static saveFailed(error: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.SaveFailed,
      error,
    };
  }

  static likeStart(id: number): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LikeStart,
      payload: {
        id
      }
    };
  }

  static likeSucceeded(payload: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LikeSucceeded,
      payload
    };
  }

  static likeFailed(error: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.LikeFailed,
      error,
    };
  }

  static dislikeStart(id: number): PayloadAction {
    return {
      type: CurrentVideoActionTypes.DislikeStart,
      payload: {
        id
      }
    };
  }

  static dislikeSucceeded(payload: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.DislikeSucceeded,
      payload
    };
  }

  static dislikeFailed(error: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.DislikeFailed,
      error,
    };
  }

  static addCommentStart(id: number, content: string): PayloadAction {
    return {
      type: CurrentVideoActionTypes.AddCommentStart,
      payload: {
        videoId: id,
        content
      }
    };
  }

  static addCommentSucceeded(payload: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.AddCommentSucceeded,
      payload
    };
  }

  static addCommentFailed(error: any): PayloadAction {
    return {
      type: CurrentVideoActionTypes.AddCommentFailed,
      error,
    };
  }
}
