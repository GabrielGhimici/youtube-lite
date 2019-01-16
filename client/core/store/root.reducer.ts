import { combineReducers } from 'redux';
import { userManagementReducer } from './user-management/user-management.reducer';
import { videoManagementReducer } from './video-management/video-management.reducer';

export const rootReducer = combineReducers({
  userManagement: userManagementReducer,
  videoManagement: videoManagementReducer
});
