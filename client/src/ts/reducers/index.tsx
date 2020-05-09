// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './users';

export default combineReducers({ users, form });
