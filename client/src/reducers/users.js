import { getUsers } from '../api/api';

const ACTIONS = {
  SET_USERS: "USERS_SET_USER",
  REMOVE_USER: "USERS_REMOVE_USER",
};

const initial = {
  users: [],

};

const initUsers = () => (dispatch, getState) => {
  const {secret} = getState().login;

  return getUsers(secret).then(
    res => {
      dispatch({
        type: ACTIONS.SET_USERS,
        users: res,
      });
    }
  )
};

const removeUser = id => dispatch => {
  dispatch({
    type: ACTIONS.REMOVE_USER,
    id
  })
};

const users = (state = initial, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return action.users;
    case ACTIONS.REMOVE_USER:
      return state.filter(user => user.id !== action.id);
    default:
      return state;

  }
};

export { removeUser, initUsers };
export default users