import { repos, gitNodes } from './sampleData';
import { useDebugValue } from 'react';

// Replace all of this with server calls.

// auth: authentication token for a user

/// ADMIN
export async function getUsers(auth) {
  return [
    {
      username: "What's",
      id: 0,
      repos: 30,
      commits: 554
    },

    {
      username: "Up",
      id: 1,
      repos: 3000,
      commits: 1
    },

    {
      username: "Dude",
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
        deletions: 400
      },
      {
        key: "2",
        name: "Eric",
        commits: 300,
        additions: 2000,
        deletions: 400
      },
      {
        key: "3",
        name: "Lin",
        commits: 300,
        additions: 2000,
        deletions: 400
      },
      {
        key: "4",
        name: "Howard",
        commits: 300,
        additions: 2000,
        deletions: 400
      },
    ],
    stats: [
      {
        "Murad": 93,
        "Eric": 155,
        "Lin": 20,
        "Howard": 135,
      },
      {
        "Murad": 42,
        "Eric": 4,
        "Lin": 57,
        "Howard": 140,

      },
      {
        "Murad": 170,
        "Eric": 44,
        "Lin": 2,
        "Howard": 77,

      },
      {
        "Murad": 55,
        "Eric": 4,
        "Lin": 140,
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