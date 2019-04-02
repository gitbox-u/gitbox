import { getUsers } from '../api/api';

const ACTIONS = {
  SET_USERS: 'USERS_SET_USER',
  ADD_USER: 'USERS_ADD_USER',
  REMOVE_USER: 'USERS_REMOVE_USER',
  UPDATE_SEARCH: 'USERS_UPDATE_SEARCH',
  UPDATE_USERNAME: 'USERS_UPDATE_USERNAME',

};

const initial = {
  users: [],
  filter: '',
  username: '',
};

function filterUsers(users, filter) {
  return users.filter(user => user.user.toLowerCase().includes(filter.toLowerCase()));
}

const initUsers = () => (dispatch) => {
  return getUsers().then(
    res => {
      console.log(res);
      dispatch({
        type: ACTIONS.SET_USERS,
        users: res,
      });
    }
  )
};

const addUser = () => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_USER,
  })
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

const updateUsername = username => dispatch => {
  dispatch({
    type: ACTIONS.UPDATE_USERNAME,
    username,
  })
};

const users = (state = initial, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return { users: action.users, filter: '' };
    case ACTIONS.ADD_USER:
      return { ...state, users: [...state.users, { user: "hardcoded name", uuid: Math.floor(Math.random() * 1000000000), commits: 0, repos: 0 }] };
    case ACTIONS.REMOVE_USER:
      return { users: state.users.filter(user => user.id !== action.id), filter: '' };
    case ACTIONS.UPDATE_SEARCH:
      return { users: state.users, filter: action.filter };
    case ACTIONS.UPDATE_USERNAME:
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export { addUser, removeUser, initUsers, filterUsers, updateSearch, updateUsername };
export default users