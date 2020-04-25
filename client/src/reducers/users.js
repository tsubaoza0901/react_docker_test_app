import { READ_USERS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case READ_USERS:
      return state;
    default:
      return state;
  }
};
