import _ from 'lodash';
import { CREATE_USER, READ_USERS } from '../actions';

export default (users = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      const data = action.response.data;
      return { ...users, [data.id]: data };
    case READ_USERS:
      // console.log(action.response.data);
      return _.mapKeys(action.response.data, 'id');
    default:
      return users;
  }
};
