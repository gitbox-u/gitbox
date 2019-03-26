import {apiLogin, apiLogout, apiRegister} from './../api/api';
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
  confirm: '',

  token: undefined,
  auth: Cookies.get('token') !== undefined,
  admin: false,
};

const initLogin = () => (dispatch) => {
  const login = Cookies.get('token');
  console.log(login);
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

const tryRegister = () => (dispatch, getState) => {
  const { username, password, confirm } = getState().login; 
  if (password !== confirm) {
    return Promise.reject();
  }

  return apiRegister(username, password);
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
  return apiLogout().then(
    result => dispatch({
      type: ACTIONS.DEAUTH,
      result,
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
      confirm: '',
      ...result,
    }

  } else if (type === ACTIONS.DEAUTH) {
    const { result } = action;

    return {
      ...state,
      username: '',
      password: '',
      confirm: '',
      ...result,
    }
  }

  return state;
};

export { updateLoginField, tryLogin, tryRegister, logout, initLogin };
export default login;