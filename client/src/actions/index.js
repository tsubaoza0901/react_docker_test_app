import axios from 'axios';

export const READ_USERS = 'READ_USERS';

const ROOT_URL = 'http://localhost:8080/api/v1';
// const QUERYSTRING =

export const readUsers = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/user`);
  console.log(response);
  dispatch({ type: READ_USERS, response });
};
