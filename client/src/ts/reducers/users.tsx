// ------------------------------
// 以下、js → tsへ第二弾
// ------------------------------
import _ from 'lodash';
import {
  // CREATE_USER,
  READ_USERS,
  // READ_USER,
  // UPDATE_USER,
  // DELETE_USER,
} from '../actions';

export default (users = {}, action: any) => {
  switch (action.type) {
    // case CREATE_USER:
    // case READ_USER:
    // case UPDATE_USER:
    // const data = action.response.data;
    // return { ...users, [data.id]: data };
    case READ_USERS:
      // console.log(action.response.data);
      return _.mapKeys(action.response.data, 'id');
    // case DELETE_USER:
    //   delete users[action.id];
    //   return { ...users };
    default:
      return users;
  }
};

// ------------------------------
// 以下、js → tsへ第一弾
// ------------------------------
// import _ from 'lodash';
// import {
//   CREATE_USER,
//   READ_USERS,
//   READ_USER,
//   UPDATE_USER,
//   DELETE_USER,
// } from '../actions';

// export default (users = {}, action:any) => {
//   switch (action.type) {
//     case CREATE_USER:
//     case READ_USER:
//     case UPDATE_USER:
//       const data = action.response.data;
//       return { ...users, [data.id]: data };
//     case READ_USERS:
//       // console.log(action.response.data);
//       return _.mapKeys(action.response.data, 'id');
//     case DELETE_USER:
//       delete users[action.id];
//       return { ...users };
//     default:
//       return users;
//   }
// };
