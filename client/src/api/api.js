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
};

/// ADMIN
export function getUsers() {
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

export function refresh(id) {
  return getData(`${apiRoot}${repoEnd}refresh/${id}`);
}

export function getRepositoryData(id) {
  return getData(`${apiRoot}${repoEnd}stats/${id}`);
}

export function deleteRepo(id) {
  const req = {id};
  return postData(`${apiRoot}${repoEnd}delete`, req);
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
      Cookies.set('admin', ret.admin);
      return ret;
    }
  );
}

export async function apiLogout() {
  Cookies.remove('token');
  Cookies.remove('admin');

  return {
    token: undefined,
    auth: false,
    admin: false,
  }
}

export function removeUser(uuid_delete) {
  const req = {uuid_delete};
  return postData(`${apiRoot}${adminEnd}users/remove`, req);
}

export function promoteUser(uuid_promote, admin) {
  const req = {uuid_promote, admin};
  return postData(`${apiRoot}${adminEnd}users/promote`, req);
}

/*router.post("/users/change", 
  bodyHasParameters(["uuid_change", "new_username"]),
*/
export function changeUser(uuid_change, new_username) {
  const req = {uuid_change, new_username};
  return postData(`${apiRoot}${adminEnd}users/change`, req);
}
