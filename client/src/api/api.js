import { repos, gitNodes } from './sampleData';
import Cookies from 'js-cookie';
// Replace all of this with server calls.

// auth: authentication token for a user

const apiRoot = "http://localhost:3000/api/";
const authEnd = "auth/";
const userEnd = "user/";

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + Cookies.get('token'),
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.json())// parses JSON response into native Javascript objects
};

const getData = (url = ``) => {
  return fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + Cookies.get('token'),
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  })
    .then(response => response.json())
    // .catch(err => err);// parses JSON response into native Javascript objects
  // TODO: INVOKE DEAUTH EVENT IF THE SERVER INDICATES IT
};

/// ADMIN
export async function getUsers() {
  return [
    {
      username: "Linwen",
      id: 0,
      repos: 30,
      commits: 554
    },

    {
      username: "Eric",
      id: 1,
      repos: 3000,
      commits: 1
    },

    {
      username: "Howard",
      id: 2,
      repos: 0,
      commits: 0
    },

    {
      username: "Murad",
      id: 3,
      repos: 0,
      commits: 0
    }
  ];
}

/// USER REPOSITORIES
export async function getRepositories() {
  return getData(`${apiRoot}${userEnd}repos`);
}

export async function getRepositoryData(id, auth) {
  return {
    graph: gitNodes,
    id: id,
    name: "Sample repository",
    desc: "Name is hardcoded for now, but will be fixed in the future",
    contributors: [
      {
        key: "1",
        name: "Murad",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: "red",
      },
      {
        key: "2",
        name: "Eric",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: "blue",
      },
      {
        key: "3",
        name: "Linwen",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: "hotpink",
      },
      {
        key: "4",
        name: "Howard",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: "green",
      },
    ],
    stats: [
      {
        "Murad": 93,
        "Eric": 155,
        "Linwen": 20,
        "Howard": 135,
      },
      {
        "Murad": 42,
        "Eric": 4,
        "Linwen": 57,
        "Howard": 140,

      },
      {
        "Murad": 170,
        "Eric": 44,
        "Linwen": 2,
        "Howard": 77,

      },
      {
        "Murad": 55,
        "Eric": 4,
        "Linwen": 140,
        "Howard": 65,

      }
    ],
    calendar: [
      {
        name: "Murad",
        "1": 20,
        "2": 20,
        "3": 55,
        "4": 20,
        "5": 33,
      }, {
        name: "Linwen",
        "1": 34,
        "2": 20,
        "3": 20,
        "4": 20,
        "5": 3,
      }, {
        name: "Eric",
        "1": 20,
        "2": 20,
        "3": 21,
        "4": 20,
        "5": 20,
      }, {
        name: "Howard",
        "1": 20,
        "2": 33,
        "3": 21,
        "4": 4,
        "5": 33,
      }, {
        name: "Mark",
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 1,
      }
    ],
    languages: {
      "name": "language",
      "children": [
        {
          "name": "C++",
          "children": [
            {
              "name": "address.cpp",
              "lines": 72594
            },
            {
              "name": "city.cpp",
              "lines": 137732
            },
            {
              "name": "anima.cpp",
              "lines": 81132
            },
            {
              "name": "movie.cpp",
              "lines": 146492
            },
            {
              "name": "user.cpp",
              "lines": 49485
            }
          ]
        },
        {
          "name": "javascript",
          "children": [
            {
              "name": "clone.js",
              "lines": 48385
            },
            {
              "name": "shuffle.js",
              "lines": 116587
            },
            {
              "name": "pick.js",
              "lines": 102176
            },
            {
              "name": "plouc.js",
              "lines": 136373
            }
          ]
        },
        {
          "name": "java",
          "children": [
            {
              "name": "main.java",
              "lines": 35993
            },
            {
              "name": "hello.java",
              "lines": 146986
            },
            {
              "name": "a.java",
              "lines": 58568
            },
            {
              "name": "sa.java",
              "lines": 83987
            },
            {
              "name": "repeat.java",
              "lines": 138659
            },
            {
              "name": "padLeft.java",
              "lines": 22276
            },
            {
              "name": "padRight.java",
              "lines": 178134
            },
            {
              "name": "sanitize.java",
              "lines": 99550
            },
            {
              "name": "ploucify.java",
              "lines": 392
            }
          ]
        },
        {
          "name": "other",
          "children": [
            {
              "name": "json",
              "lines": 113195
            }
          ]
        }
      ]
    },
    addDelete: [
      {
        "id": "additions",
        "color": "green",
        "data": [
          {
            "x": 1,
            "y": 297
          },
          {
            "x": 2,
            "y": 168
          },
          {
            "x": 3,
            "y": 57
          },
          {
            "x": 4,
            "y": 259
          },
          {
            "x": 5,
            "y": 221
          },
          {
            "x": 6,
            "y": 144
          },
          {
            "x": 7,
            "y": 149
          }
        ]
      },
      {
        "id": "deletions",
        "color": "red",
        "data": [
          {
            "x": 1,
            "y": -29
          },
          {
            "x": 2,
            "y": -20
          },
          {
            "x": 3,
            "y": -57
          },
          {
            "x": 4,
            "y": -259
          },
          {
            "x": 5,
            "y": -21
          },
          {
            "x": 6,
            "y": -244
          },
          {
            "x": 7,
            "y": -300
          }
        ]
      }
    ]
  };
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

// this is just a small helper function.
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
