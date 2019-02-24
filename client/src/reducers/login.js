const ACTIONS = {
  UPDATE: 0,
  AUTH: 1,
  DEAUTH: 2,
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
  console.log("logout!")
  return (dispatch) => {
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