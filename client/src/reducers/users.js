import { getUsers } from '../api/api';

const ACTIONS = {
  ADD_USER: "USERS_ADD_USER",
  REMOVE_USER: "USERS_REMOVE_USER",
}

const initial = [];

const initUsers = () => (dispatch) => {
  return getUsers().then(
    res => {
      res.forEach(i => dispatch({
        ...i,
        type: ACTIONS.ADD_USER,
      }));
    }
  )
}

const users = (state = initial, action) => {
  let { username, id, repos, commits } = action;
  // console.log(state);

  switch (action.type) {
    case ACTIONS.ADD_USER:
      return [
        ...state,
        { username, repos, commits }
      ];
    case ACTIONS.REMOVE_USER:
      return state.filter(user => user.id !== id);
    default:
      return state;
  }
};

export { initUsers };
export default users