import { apiLogin, apiLogout } from './../api/api';
import Cookies from 'js-cookie';

const ACTIONS = {
  INIT: 'LOGIN_INIT',
  UPDATE: 'LOGIN_UPDATE',
  AUTH: 'LOGIN_AUTH',
  DEAUTH: 'LOGIN_DEAUTH',
};

const initial = {
  username: '',
  password: '',

  secret: undefined,
  loggedIn: false,
  isAdmin: false,
};

const initLogin = () => (dispatch) => {
  const login = Cookies.getJSON('login');
  if (login === undefined) return;

  dispatch({
    type: ACTIONS.INIT,
    login,
  })
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

const tryLogin = () => (dispatch, getState) => {
  const { username, password } = getState().login;
  return apiLogin(username, password).then(
    result => dispatch({
      type: ACTIONS.AUTH,
      result
    })
  );
};

const logout = () => (dispatch, getState) => {
  const { secret } = getState().login;
  return apiLogout(secret).then(
    result => dispatch({
      type: ACTIONS.DEAUTH,
      result
    })
  )
};

const login = (state = initial, action) => {
  const { type } = action;
  if (type === ACTIONS.INIT) {
    const { login } = action;
    return {
      ...state,
      ...login,
    }
  } else if (type === ACTIONS.UPDATE) {
    const { field, value } = action;
    return {
      ...state,
      [field]: value,
    }
  } else if (type === ACTIONS.AUTH) {
    const { result } = action;

    return {
      ...state,
      password: '',
      ...result,
    }

  } else if (type === ACTIONS.DEAUTH) {
    const { result } = action;

    return {
      ...state,
      username: '',
      password: '',
      ...result,
    }
  }

  return state;
};

export { updateLoginField, tryLogin, logout, initLogin };
export default login;