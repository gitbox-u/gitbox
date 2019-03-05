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
      username: "MuradS",
      id: 2,
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
        color: getRandomColor(),
      },
      {
        key: "2",
        name: "Eric",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: getRandomColor(),
      },
      {
        key: "3",
        name: "Linwen",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: getRandomColor(),
      },
      {
        key: "4",
        name: "Howard",
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: getRandomColor(),
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
    }
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export async function apiLogout(auth) {
  return {
    secret: undefined,
    loggedIn: false,
    admin: false,
  }
}