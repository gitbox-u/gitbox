const initial = [
  {
    username: "What's",
    id: 0,
    repos: 30,
    commits: 554
  },

  {
    username: "Up",
    id: 1,
    repos: 3000,
    commits: 1
  },

  {
    username: "Dude",
    id: 2,
    repos: 0,
    commits: 0
  }
];

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

export default users