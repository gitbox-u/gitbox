import { getUsers } from '../api/api';

const ACTIONS = {
  SET_USERS: 'USERS_SET_USER',
  REMOVE_USER: 'USERS_REMOVE_USER',
  UPDATE_SEARCH: 'USERS_UPDATE_SEARCH',
};

const initial = {
  users: [],
  filter: '',
};

function filterUsers(users, filter) {
  return users.filter(user => user.username.toLowerCase().includes(filter.toLowerCase()));
}

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

const updateSearch = filter => dispatch => {
  dispatch({
    type: ACTIONS.UPDATE_SEARCH,
    filter
  })
};

const users = (state = initial, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return {users: action.users, filter: ''};
    case ACTIONS.REMOVE_USER:
      return {users: state.filter(user => user.id !== action.id), filter: ''};
    case ACTIONS.UPDATE_SEARCH:
      return {users: state.users, filter: action.filter};
    default:
      return state;
  }
};

export { removeUser, initUsers, filterUsers, updateSearch };
export default users