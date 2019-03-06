import { repos, gitNodes } from './sampleData';
import Cookies from 'js-cookie';
// Replace all of this with server calls.

// auth: authentication token for a user

/// ADMIN
export async function getUsers(auth) {
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
export async function getRepositories(auth) {
  return repos;
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
      },{
        name: "Linwen",
        "1": 34,
        "2": 20,
        "3": 20,
        "4": 20,
        "5": 3,
      },{
        name: "Eric",
        "1": 20,
        "2": 20,
        "3": 21,
        "4": 20,
        "5": 20,
      },{
        name: "Howard",
        "1": 20,
        "2": 33,
        "3": 21,
        "4": 4,
        "5": 33,
      },{
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

export async function apiLogin(user, pass) {
  let ret;
  if (user === "user" && pass === "user") {
    ret = {
      secret: "ae9cf109-f09cda193",
      loggedIn: true,
      isAdmin: false,
    }
  } else if (user === "admin" && pass === "admin") {
    ret = {
      secret: "acdf193c-c1039c121",
      loggedIn: true,
      isAdmin: true,
    }
  } else {
    ret = {
      secret: undefined,
      loggedIn: false,
      isAdmin: false,
    }
  }

  Cookies.set('login', ret);

  return ret;
}

export async function apiLogout(auth) {
  return {
    secret: undefined,
    loggedIn: false,
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
