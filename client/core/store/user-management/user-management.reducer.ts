import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { authorizzationReducer } from './authorization/authorization.reducer';

export let userManagementReducer = combineReducers({
  userData: userReducer,
  authorization: authorizzationReducer
});
