const initial = [
  {
    username: "What's",
    repos: 30,
    commits: 554
  },

  {
    username: "Up",
    repos: 3000,
    commits: 1
  },

  {
    username: "Dude",
    repos: 0,
    commits: 0
  }
];

const users = (state = initial, action) => {
  let { username, repos, commits } = action;

  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        { username, repos, commits }
      ];
    default:
      return state;
  }
};

export default users