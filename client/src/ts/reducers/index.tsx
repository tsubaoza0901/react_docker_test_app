// ------------------------------
// 以下、js → tsへ第二弾
// ------------------------------
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './users';

export default combineReducers({ users, form });

// ------------------------------
// 以下、js → tsへ第一弾
// ------------------------------
// import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
// import users from './users';

// export default combineReducers({ users, form });
