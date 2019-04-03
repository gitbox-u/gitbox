import Cookies from 'js-cookie';
// Replace all of this with server calls.

// auth: authentication token for a user

let host = 'localhost';
if (process.env.REACT_APP_APIHOST) {
  host = process.env.REACT_APP_APIHOST;
}

const apiRoot = 'http://' + host + ':3000/api/';
const authEnd = 'auth/';
const userEnd = 'user/';
const adminEnd = 'admin/';
const repoEnd = 'repo/';

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('token'),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match 'Content-Type' header
  })
    .then(response => response.json())// parses JSON response into native Javascript objects
};

const getData = (url = ``) => {
  console.log(url);
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('token'),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => response.json())
  // .catch(err => err);// parses JSON response into native Javascript objects
  // TODO: INVOKE DEAUTH EVENT IF THE SERVER INDICATES IT
};

/// ADMIN
export function getUsers() {
  // return [
  //   {
  //     username: 'Linwen',
  //     id: 0,
  //     repos: 30,
  //     commits: 554
  //   },

  //   {
  //     username: 'Eric',
  //     id: 1,
  //     repos: 3000,
  //     commits: 1
  //   },

  //   {
  //     username: 'Howard',
  //     id: 2,
  //     repos: 0,
  //     commits: 0
  //   },

  //   {
  //     username: 'Murad',
  //     id: 3,
  //     repos: 0,
  //     commits: 0
  //   }
  // ];
  return getData(`${apiRoot}${adminEnd}users`);
}

/// USER REPOSITORIES
export async function getRepositories() {
  return getData(`${apiRoot}${userEnd}repos`);
}

export async function addRepo(name, remoteUrl, auth) {
  if (auth !== undefined) {
    return postData(`${apiRoot}${repoEnd}add`, {name, remoteUrl, auth});
  } else {
    return postData(`${apiRoot}${repoEnd}add`, {name, remoteUrl});
  }
}

export async function getRepositoryData(id, auth) {
  const data = await getData(`${apiRoot}${repoEnd}stats/${id}`);
  return data;
}

export function apiRegister(username, password) {
  const req = {
    username, password,
  };

  return postData(`${apiRoot}${authEnd}register`, req);
}

export function apiLogin(username, password) {
  const req = {
    username, password,
  };

  return postData(`${apiRoot}${authEnd}login`, req).then(
    ret => {
      Cookies.set('token', ret.token);
      return ret;
    }
  );
}

export async function apiLogout(auth) {
  Cookies.remove('token');

  return {
    token: undefined,
    auth: false,
    admin: false,
  }
}

export function removeUser(uuid) {
  const req = {uuid};
  return postData(`${apiRoot}${adminEnd}users/remove/user`, req);
}

// this is just a small helper function.
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
