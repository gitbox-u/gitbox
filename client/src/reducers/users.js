import { getUsers } from '../api/api';

const ACTIONS = {
  SET_USERS: "USERS_SET_USER",
}

const initial = [];

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
}

const users = (state = initial, action) => {
  const { type } = action;

  if (type === ACTIONS.SET_USERS) {
    const { users } = action;
    return users

  }

  return state;
};

export { initUsers };
export default users