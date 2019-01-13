import { combineReducers } from 'redux';
import { userManagementReducer } from './user-management/user-management.reducer';

export const rootReducer = combineReducers({
  userManagement: userManagementReducer
});
