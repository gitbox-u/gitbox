import { getUsers } from '../api/api';

const initial = [];

const initUsers = () => (dispatch) => {
  return getUsers().then(
    res => {
      res.forEach(i => dispatch({
        ...i,
        type: 'ADD_USER',
      }));
    }
  )
}

const users = (state = initial, action) => {
  let { username, id, repos, commits } = action;
  // console.log(state);

  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        { username, repos, commits }
      ];
    case 'REMOVE_USER':
      return state.filter(user => user.id !== id);
    default:
      return state;
  }
};

export { initUsers };
export default users