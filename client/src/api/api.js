import {repos, gitNodes} from './sampleData';
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

export async function getRepositoryData(id, auth) {
  return {
    graph: gitNodes,
    id: id,
    name: 'Sample repository',
    desc: 'Name is hardcoded for now, but will be fixed in the future',
    contributors: [
      {
        key: '1',
        name: 'Murad',
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: 'red',
      },
      {
        key: '2',
        name: 'Eric',
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: 'blue',
      },
      {
        key: '3',
        name: 'Linwen',
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: 'hotpink',
      },
      {
        key: '4',
        name: 'Howard',
        commits: 300,
        additions: 2000,
        deletions: 400,
        color: 'green',
      },
    ],
    stats: [
      {
        'Murad': 93,
        'Eric': 155,
        'Linwen': 20,
        'Howard': 135,
      },
      {
        'Murad': 42,
        'Eric': 4,
        'Linwen': 57,
        'Howard': 140,

      },
      {
        'Murad': 170,
        'Eric': 44,
        'Linwen': 2,
        'Howard': 77,

      },
      {
        'Murad': 55,
        'Eric': 4,
        'Linwen': 140,
        'Howard': 65,

      }
    ],
    calendar: [ { '1': 1, '2': 8, '3': 0, '4': 0, '5': 0, name: 'Howard Chen' },
      { '1': 28, '2': 15, '3': 0, '4': 0, '5': 0, name: 'Linwen' },
      { '1': 31, '2': 22, '3': 0, '4': 0, '5': 0, name: 'EDToaster' },
      { '1': 43, '2': 35, '3': 0, '4': 0, '5': 0, name: 'Murad Akhundov' },
      { '1': 61, '2': 23, '3': 0, '4': 0, '5': 0, name: 'Eric Lindau' } ]
    ,
    languages: {
      'name': 'language',
      'children': [{
        "name": "Javascript",
        "children": [{"name": "client/src/api/api.js", "lines": 417}, {
          "name": "parsers/repo/repo.js",
          "lines": 22
        }, {"name": "parsers/repo/tree.js", "lines": 24}, {
          "name": "parsers/repo/commit_lines.js",
          "lines": 161
        }, {"name": "parsers/user/user.js", "lines": 0}, {
          "name": "server/db/repository.js",
          "lines": 68
        }, {"name": "server/env/index.js", "lines": 9}, {
          "name": "server/git/index.js",
          "lines": 46
        }, {"name": "server/routes/validator.js", "lines": 66}, {
          "name": "parsers/repostats.js",
          "lines": 172
        }, {"name": "server/index.js", "lines": 27}, {
          "name": "server/db/index.js",
          "lines": -33
        }, {"name": "client/src/reducers/login.js", "lines": 30}, {
          "name": "client/src/reducers/repositories.js",
          "lines": 74
        }, {"name": "client/src/reducers/users.js", "lines": 79}, {
          "name": "server/db/user.js",
          "lines": 49
        }, {"name": "server/routes/admin.js", "lines": 31}, {
          "name": "server/routes/authentication.js",
          "lines": 59
        }, {"name": "server/routes/user.js", "lines": 39}, {
          "name": "server/routes/repo.js",
          "lines": -2
        }, {"name": "server/db/entity.js", "lines": 30}, {
          "name": "server/routes/repoStats.js",
          "lines": 29
        }, {"name": "server/authenticator/hasher.js", "lines": 37}, {
          "name": "server/authenticator/secret.js",
          "lines": 4
        }, {"name": "server/authenticator/token.js", "lines": 0}, {
          "name": "server/db/index.mjs",
          "lines": 29
        }, {"name": "server/index.mjs", "lines": 15}, {
          "name": "server/routes/authentication.mjs",
          "lines": 0
        }, {"name": "client/src/index.js", "lines": 36}, {
          "name": "client/src/reducers/notifications.js",
          "lines": 25
        }, {"name": "client/src/api/sampleData.js", "lines": 0}, {
          "name": "client/src/geo/geo.js",
          "lines": -1
        }, {"name": "client/src/api/colours.js", "lines": 9}, {
          "name": "client/src/actions/index.js",
          "lines": 0
        }, {
          "name": "client/src/components/dashboard/QuickStats.js",
          "lines": 65
        }, {
          "name": "client/src/components/admin/Admin.js",
          "lines": 98
        }, {
          "name": "client/src/components/admin/Users.js",
          "lines": 93
        }, {
          "name": "client/src/components/repository/GitGraph.js",
          "lines": 62
        }, {
          "name": "client/src/reducers/sampleData.js",
          "lines": 20
        }, {
          "name": "client/src/components/repository/ContibutorList.js",
          "lines": 117
        }, {
          "name": "client/src/components/repository/Repository.js",
          "lines": 353
        }, {
          "name": "client/src/components/repository/AddDelete.js",
          "lines": 87
        }, {"name": "client/src/components/Header.js", "lines": 30}, {
          "name": "client/src/components/Login.js",
          "lines": 1
        }, {
          "name": "client/src/components/core/Pagination.js",
          "lines": 53
        }, {
          "name": "client/src/components/dashboard/Dashboard.js",
          "lines": 56
        }, {
          "name": "client/src/components/dashboard/Repos.js",
          "lines": 37
        }, {
          "name": "client/src/components/repository/ContributorCard.js",
          "lines": 59
        }, {
          "name": "client/src/components/dashboard/RepoSnippet.js",
          "lines": 64
        }, {"name": "client/src/components/repository/CodeStream.js", "lines": 69}, {
          "name": "client/src/App.js",
          "lines": 54
        }, {
          "name": "client/src/components/repository/Contributors.js",
          "lines": 32
        }, {
          "name": "client/src/components/repository/FolderTree.js",
          "lines": 36
        }, {
          "name": "client/src/components/repository/LanguageBreakdown.js",
          "lines": 34
        }, {"name": "client/public/js/geo.js", "lines": -11}, {
          "name": "client/src/components/admin/expansionList.js",
          "lines": 0
        }, {
          "name": "client/src/reducers/reposReducer.js",
          "lines": 97
        }, {
          "name": "client/src/components/dashboard/Calendar.js",
          "lines": 39
        }, {
          "name": "client/src/components/dashboard/LangPie.js",
          "lines": 71
        }, {
          "name": "client/src/reducers/loginReducer.js",
          "lines": 46
        }, {
          "name": "client/src/components/dashboard/Pagination.js",
          "lines": -35
        }, {
          "name": "client/src/components/admin/searchFields.js",
          "lines": 58
        }, {
          "name": "client/src/components/dashboard/dashboard.js",
          "lines": 2
        }, {
          "name": "client/src/components/dashboard/repo-snippet.js",
          "lines": 0
        }, {"name": "client/src/components/header.js", "lines": 61}, {
          "name": "client/src/components/login.js",
          "lines": 88
        }, {"name": "client/src/serviceWorker.js", "lines": 135}, {
          "name": "client/public/js/index.js",
          "lines": 142
        }, {
          "name": "client/src/components/dashboard/header.js",
          "lines": 0
        }, {
          "name": "client/src/components/dashboard/repos.js",
          "lines": 32
        }, {
          "name": "client/src/components/dashboard/searchbar.js",
          "lines": -67
        }, {"name": "client/src/containers/availableRepos.js", "lines": 0}, {
          "name": "client/src/reducers/repos.js",
          "lines": 0
        }, {
          "name": "client/src/components/dashboard/pagination.js",
          "lines": 35
        }, {"name": "client/src/redux/reducer.js", "lines": 33}, {
          "name": "client/src/components/searchbar.js",
          "lines": 67
        }, {
          "name": "client/src/components/dashboard/repository.js",
          "lines": 0
        }, {
          "name": "client/src/components/dashboard.js",
          "lines": 1
        }, {
          "name": "client/src/components/dashboard/repositories.js",
          "lines": 32
        }, {"name": "client/src/components/dashboardRepos.js", "lines": 0}]
      }, {
        "name": "React.js",
        "children": [{
          "name": "client/src/components/repository/FolderTree.jsx",
          "lines": 0
        }, {
          "name": "client/src/components/repository/Repository.jsx",
          "lines": -154
        }, {
          "name": "client/src/components/core/Notifications.jsx",
          "lines": 108
        }, {
          "name": "client/src/components/dashboard/AddRepo.jsx",
          "lines": 91
        }, {
          "name": "client/src/components/dashboard/RepoGrid.jsx",
          "lines": 5
        }, {
          "name": "client/src/components/repository/ContributorList.jsx",
          "lines": -34
        }, {
          "name": "client/src/components/core/Home.jsx",
          "lines": 42
        }, {
          "name": "client/src/components/repository/AddDelete.jsx",
          "lines": -34
        }, {
          "name": "client/src/components/repository/CodeStream.jsx",
          "lines": 2
        }, {
          "name": "client/src/components/admin/Users.jsx",
          "lines": 52
        }, {
          "name": "client/src/components/repository/MiniCalendar.jsx",
          "lines": 70
        }, {
          "name": "client/src/components/dashboard/Calendar.jsx",
          "lines": 1
        }, {
          "name": "client/src/components/dashboard/QuickStats.jsx",
          "lines": 10
        }, {
          "name": "client/src/components/auth/PrivRoute.jsx",
          "lines": 24
        }, {"name": "client/src/components/core/App.jsx", "lines": 4}, {
          "name": "client/src/components/auth/Login.jsx",
          "lines": 9
        }, {
          "name": "client/src/components/auth/Signup.jsx",
          "lines": 35
        }, {
          "name": "client/src/components/core/Header.jsx",
          "lines": -9
        }, {
          "name": "client/src/components/dashboard/LangPie.jsx",
          "lines": 1
        }, {
          "name": "client/src/components/dashboard/Language.jsx",
          "lines": 32
        }, {
          "name": "client/src/components/dashboard/RepoCard.jsx",
          "lines": 22
        }, {
          "name": "client/src/components/dashboard/Dashboard.jsx",
          "lines": -8
        }, {
          "name": "client/src/components/repository/New.jsx",
          "lines": 43
        }, {
          "name": "client/src/components/admin/searchFields.jsx",
          "lines": -58
        }, {
          "name": "client/src/components/core/PopupMenu.jsx",
          "lines": 72
        }, {
          "name": "client/src/components/core/Pagination.jsx",
          "lines": 0
        }, {
          "name": "client/src/components/repository/LanguageBreakdown.jsx",
          "lines": 0
        }, {"name": "client/src/components/auth/Auth.jsx", "lines": -1}, {
          "name": "client/src/components/PopupMenu.jsx",
          "lines": 0
        }, {"name": "client/src/components/App.jsx", "lines": 12}, {
          "name": "client/src/components/admin/Admin.jsx",
          "lines": -31
        }, {
          "name": "client/src/components/repository/Stat.jsx",
          "lines": 19
        }, {"name": "client/src/components/Signup.jsx", "lines": 90}, {
          "name": "client/src/components/Auth.jsx",
          "lines": 66
        }, {
          "name": "client/src/components/Login.jsx",
          "lines": -33
        }, {
          "name": "client/src/components/core/SearchField.jsx",
          "lines": 0
        }, {
          "name": "client/src/components/Header.jsx",
          "lines": 2
        }, {
          "name": "client/src/components/repository/GitGraph.jsx",
          "lines": -7
        }, {
          "name": "client/src/components/repository/CircleIcon.jsx",
          "lines": 0
        }, {
          "name": "client/src/components/dashboard/Repos.jsx",
          "lines": 33
        }, {
          "name": "client/src/components/repository/ContributorCard.jsx",
          "lines": -59
        }, {
          "name": "client/src/components/repository/Contributors.jsx",
          "lines": -32
        }, {"name": "client/src/components/dashboard/RepoSnippet.jsx", "lines": 8}]
      }, {
        "name": "Shell",
        "children": [{"name": "deploy.sh", "lines": 6}, {"name": "payload.sh", "lines": 5}, {
          "name": "build.sh",
          "lines": 5
        }]
      }, {
        "name": "CSS",
        "children": [{"name": "client/src/index.css", "lines": 38}, {"name": "client/public/css/style.css", "lines": 1}]
      }, {"name": "HTML", "children": [{"name": "client/public/index.html", "lines": 24}]}, {
        "name": "Other",
        "children": [{"name": "client/src/App.test.js", "lines": 9}]
      }, {
        "name": "Python",
        "children": [{"name": "scripts/GenerateRepo.py", "lines": 110}, {
          "name": "scripts/GenerateRepos.py",
          "lines": 28
        }]
      }]

    },
    addDelete: [
      {
        'id': 'additions',
        'color': 'green',
        'data': [
          {
            'x': 1,
            'y': 297
          },
          {
            'x': 2,
            'y': 168
          },
          {
            'x': 3,
            'y': 57
          },
          {
            'x': 4,
            'y': 259
          },
          {
            'x': 5,
            'y': 221
          },
          {
            'x': 6,
            'y': 144
          },
          {
            'x': 7,
            'y': 149
          }
        ]
      },
      {
        'id': 'deletions',
        'color': 'red',
        'data': [
          {
            'x': 1,
            'y': -29
          },
          {
            'x': 2,
            'y': -20
          },
          {
            'x': 3,
            'y': -57
          },
          {
            'x': 4,
            'y': -259
          },
          {
            'x': 5,
            'y': -21
          },
          {
            'x': 6,
            'y': -244
          },
          {
            'x': 7,
            'y': -300
          }
        ]
      }
    ],
    tree: {
      "path": "/home/murad/WebstormProjects/team01/",
      "name": "team01",
      "children": [{
        "path": "/home/murad/WebstormProjects/team01/build.sh",
        "name": "build.sh",
        "size": 78,
        "extension": ".sh",
        "type": "file"
      }, {
        "path": "/home/murad/WebstormProjects/team01/client",
        "name": "client",
        "children": [{
          "path": "/home/murad/WebstormProjects/team01/client/build",
          "name": "build",
          "children": [],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/client/public",
          "name": "public",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/client/public/css",
            "name": "css",
            "children": [],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/public/js",
            "name": "js",
            "children": [],
            "type": "directory"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/client/src",
          "name": "src",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/client/src/App.test.js",
            "name": "App.test.js",
            "size": 264,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/api",
            "name": "api",
            "children": [{
              "path": "/home/murad/WebstormProjects/team01/client/src/api/api.js",
              "name": "api.js",
              "size": 30718,
              "extension": ".js",
              "type": "file"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/api/colours.js",
              "name": "colours.js",
              "size": 198,
              "extension": ".js",
              "type": "file"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/api/sampleData.js",
              "name": "sampleData.js",
              "size": 46921,
              "extension": ".js",
              "type": "file"
            }],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/assets",
            "name": "assets",
            "children": [],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/components",
            "name": "components",
            "children": [{
              "path": "/home/murad/WebstormProjects/team01/client/src/components/admin",
              "name": "admin",
              "children": [{
                "path": "/home/murad/WebstormProjects/team01/client/src/components/admin/Admin.jsx",
                "name": "Admin.jsx",
                "size": 1317,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/admin/Users.jsx",
                "name": "Users.jsx",
                "size": 4151,
                "extension": ".jsx",
                "type": "file"
              }],
              "type": "directory"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/components/auth",
              "name": "auth",
              "children": [{
                "path": "/home/murad/WebstormProjects/team01/client/src/components/auth/Auth.jsx",
                "name": "Auth.jsx",
                "size": 1445,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/auth/Login.jsx",
                "name": "Login.jsx",
                "size": 2862,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/auth/PrivRoute.jsx",
                "name": "PrivRoute.jsx",
                "size": 690,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/auth/Signup.jsx",
                "name": "Signup.jsx",
                "size": 2979,
                "extension": ".jsx",
                "type": "file"
              }],
              "type": "directory"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/components/core",
              "name": "core",
              "children": [{
                "path": "/home/murad/WebstormProjects/team01/client/src/components/core/App.jsx",
                "name": "App.jsx",
                "size": 1931,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/core/Header.jsx",
                "name": "Header.jsx",
                "size": 2128,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/core/Home.jsx",
                "name": "Home.jsx",
                "size": 835,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/core/Notifications.jsx",
                "name": "Notifications.jsx",
                "size": 5056,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/core/Pagination.jsx",
                "name": "Pagination.jsx",
                "size": 1154,
                "extension": ".jsx",
                "type": "file"
              }],
              "type": "directory"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard",
              "name": "dashboard",
              "children": [{
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/AddRepo.jsx",
                "name": "AddRepo.jsx",
                "size": 2695,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/Calendar.jsx",
                "name": "Calendar.jsx",
                "size": 711,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/Dashboard.jsx",
                "name": "Dashboard.jsx",
                "size": 978,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/LangPie.jsx",
                "name": "LangPie.jsx",
                "size": 1656,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/Language.jsx",
                "name": "Language.jsx",
                "size": 730,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/QuickStats.jsx",
                "name": "QuickStats.jsx",
                "size": 1638,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/RepoCard.jsx",
                "name": "RepoCard.jsx",
                "size": 2140,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/dashboard/RepoGrid.jsx",
                "name": "RepoGrid.jsx",
                "size": 3817,
                "extension": ".jsx",
                "type": "file"
              }],
              "type": "directory"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/components/repository",
              "name": "repository",
              "children": [{
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/AddDelete.jsx",
                "name": "AddDelete.jsx",
                "size": 1047,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/CodeStream.jsx",
                "name": "CodeStream.jsx",
                "size": 1528,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/ContributorList.jsx",
                "name": "ContributorList.jsx",
                "size": 2290,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/FolderTree.jsx",
                "name": "FolderTree.jsx",
                "size": 726,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/GitGraph.jsx",
                "name": "GitGraph.jsx",
                "size": 951,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/LanguageBreakdown.jsx",
                "name": "LanguageBreakdown.jsx",
                "size": 640,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/MiniCalendar.jsx",
                "name": "MiniCalendar.jsx",
                "size": 1391,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/New.jsx",
                "name": "New.jsx",
                "size": 1154,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/Repository.jsx",
                "name": "Repository.jsx",
                "size": 5009,
                "extension": ".jsx",
                "type": "file"
              }, {
                "path": "/home/murad/WebstormProjects/team01/client/src/components/repository/Stat.jsx",
                "name": "Stat.jsx",
                "size": 349,
                "extension": ".jsx",
                "type": "file"
              }],
              "type": "directory"
            }],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/geo",
            "name": "geo",
            "children": [{
              "path": "/home/murad/WebstormProjects/team01/client/src/geo/geo.js",
              "name": "geo.js",
              "size": 5138,
              "extension": ".js",
              "type": "file"
            }],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/index.js",
            "name": "index.js",
            "size": 1098,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/reducers",
            "name": "reducers",
            "children": [{
              "path": "/home/murad/WebstormProjects/team01/client/src/reducers/login.js",
              "name": "login.js",
              "size": 2073,
              "extension": ".js",
              "type": "file"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/reducers/notifications.js",
              "name": "notifications.js",
              "size": 580,
              "extension": ".js",
              "type": "file"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/reducers/repositories.js",
              "name": "repositories.js",
              "size": 3602,
              "extension": ".js",
              "type": "file"
            }, {
              "path": "/home/murad/WebstormProjects/team01/client/src/reducers/users.js",
              "name": "users.js",
              "size": 1823,
              "extension": ".js",
              "type": "file"
            }],
            "type": "directory"
          }, {
            "path": "/home/murad/WebstormProjects/team01/client/src/serviceWorker.js",
            "name": "serviceWorker.js",
            "size": 4932,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }],
        "type": "directory"
      }, {
        "path": "/home/murad/WebstormProjects/team01/deploy.sh",
        "name": "deploy.sh",
        "size": 268,
        "extension": ".sh",
        "type": "file"
      }, {
        "path": "/home/murad/WebstormProjects/team01/parsers",
        "name": "parsers",
        "children": [{
          "path": "/home/murad/WebstormProjects/team01/parsers/repo",
          "name": "repo",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/parsers/repo/branches.js",
            "name": "branches.js",
            "size": 2461,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/parsers/repo/commit_lines.js",
            "name": "commit_lines.js",
            "size": 4983,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/parsers/repo/repo.js",
            "name": "repo.js",
            "size": 528,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/parsers/repo/tree.js",
            "name": "tree.js",
            "size": 511,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/parsers/user",
          "name": "user",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/parsers/user/user.js",
            "name": "user.js",
            "size": 0,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }],
        "type": "directory"
      }, {
        "path": "/home/murad/WebstormProjects/team01/payload.sh",
        "name": "payload.sh",
        "size": 100,
        "extension": ".sh",
        "type": "file"
      }, {
        "path": "/home/murad/WebstormProjects/team01/scripts",
        "name": "scripts",
        "children": [],
        "type": "directory"
      }, {
        "path": "/home/murad/WebstormProjects/team01/server",
        "name": "server",
        "children": [{
          "path": "/home/murad/WebstormProjects/team01/server/authenticator",
          "name": "authenticator",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/server/authenticator/hasher.js",
            "name": "hasher.js",
            "size": 843,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/authenticator/secret.js",
            "name": "secret.js",
            "size": 113,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/authenticator/token.js",
            "name": "token.js",
            "size": 0,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/server/db",
          "name": "db",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/server/db/entity.js",
            "name": "entity.js",
            "size": 723,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/db/index.js",
            "name": "index.js",
            "size": 517,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/db/repository.js",
            "name": "repository.js",
            "size": 2150,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/db/user.js",
            "name": "user.js",
            "size": 1190,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/server/env",
          "name": "env",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/server/env/index.js",
            "name": "index.js",
            "size": 213,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/server/git",
          "name": "git",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/server/git/index.js",
            "name": "index.js",
            "size": 1318,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }, {
          "path": "/home/murad/WebstormProjects/team01/server/index.js",
          "name": "index.js",
          "size": 1245,
          "extension": ".js",
          "type": "file"
        }, {
          "path": "/home/murad/WebstormProjects/team01/server/routes",
          "name": "routes",
          "children": [{
            "path": "/home/murad/WebstormProjects/team01/server/routes/admin.js",
            "name": "admin.js",
            "size": 906,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/routes/authentication.js",
            "name": "authentication.js",
            "size": 1512,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/routes/repo.js",
            "name": "repo.js",
            "size": 1326,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/routes/user.js",
            "name": "user.js",
            "size": 1126,
            "extension": ".js",
            "type": "file"
          }, {
            "path": "/home/murad/WebstormProjects/team01/server/routes/validator.js",
            "name": "validator.js",
            "size": 1874,
            "extension": ".js",
            "type": "file"
          }],
          "type": "directory"
        }],
        "type": "directory"
      }],
      "type": "directory"
    }

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
