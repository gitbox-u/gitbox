const ACTIONS = {
  UPDATE: 'LOGIN_UPDATE',
  AUTH: 'LOGIN_AUTH',
  DEAUTH: 'LOGIN_DEAUTH',
};

const initial = {
  username: '',
  password: '',

  loggedIn: false,
  isAdmin: false,
};

const updateLoginField = (field, value) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.UPDATE,
      field,
      value
    });
  }
};

const tryLogin = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.AUTH,
    });
  }
};

const logout = () => {
  return (dispatch) => {
    console.log('logged out');
    dispatch({
      type: ACTIONS.DEAUTH,
    });
  }
}

const login = (state = initial, action) => {
  const {type} = action;
  if (type === ACTIONS.UPDATE) {
    const {field, value} = action;
    return {
      ...state,
      [field]: value,
    }
  } else if (type === ACTIONS.AUTH) {
    const {username, password} = state;

    console.log(`Auth ${username} ${password}`);

    if (username === "user" && password === "user") {
      return {
        ...state,
        loggedIn: true,
        isAdmin: false,
      }
    } else if (username === "admin" && password === "admin") {
      return {
        ...state,
        loggedIn: true,
        isAdmin: true,
      }
    }
  } else if (type === ACTIONS.DEAUTH) {

    console.log(`Deauth`);
    return {
      ...state,
      username: '',
      password: '',
      loggedIn: false,
      isAdmin: false, 
    }
  }
  return state;
};

export {updateLoginField, tryLogin, logout};
export default login;