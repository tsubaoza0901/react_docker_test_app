import axios from 'axios';

export const READ_USERS = 'READ_USERS';
export const CREATE_USER = 'CREATE_USER';

const ROOT_URL = 'http://localhost:8080/api/v1';
// const QUERYSTRING =

export const readUsers = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/user`);
  dispatch({ type: READ_USERS, response });
};

export const postUser = (values) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/user`, values);
  dispatch({ type: CREATE_USER, response });
};
