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
    calendar: [
      {
        name: 'Murad',
        '1': 20,
        '2': 20,
        '3': 55,
        '4': 20,
        '5': 33,
      }, {
        name: 'Linwen',
        '1': 34,
        '2': 20,
        '3': 20,
        '4': 20,
        '5': 3,
      }, {
        name: 'Eric',
        '1': 20,
        '2': 20,
        '3': 21,
        '4': 20,
        '5': 20,
      }, {
        name: 'Howard',
        '1': 20,
        '2': 33,
        '3': 21,
        '4': 4,
        '5': 33,
      }, {
        name: 'Mark',
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 1,
      }
    ],
    languages: {
      'name': 'language',
      'children': [
        {
          'name': 'C++',
          'children': [
            {
              'name': 'address.cpp',
              'lines': 72594
            },
            {
              'name': 'city.cpp',
              'lines': 137732
            },
            {
              'name': 'anima.cpp',
              'lines': 81132
            },
            {
              'name': 'movie.cpp',
              'lines': 146492
            },
            {
              'name': 'user.cpp',
              'lines': 49485
            }
          ]
        },
        {
          'name': 'javascript',
          'children': [
            {
              'name': 'clone.js',
              'lines': 48385
            },
            {
              'name': 'shuffle.js',
              'lines': 116587
            },
            {
              'name': 'pick.js',
              'lines': 102176
            },
            {
              'name': 'plouc.js',
              'lines': 136373
            }
          ]
        },
        {
          'name': 'java',
          'children': [
            {
              'name': 'main.java',
              'lines': 35993
            },
            {
              'name': 'hello.java',
              'lines': 146986
            },
            {
              'name': 'a.java',
              'lines': 58568
            },
            {
              'name': 'sa.java',
              'lines': 83987
            },
            {
              'name': 'repeat.java',
              'lines': 138659
            },
            {
              'name': 'padLeft.java',
              'lines': 22276
            },
            {
              'name': 'padRight.java',
              'lines': 178134
            },
            {
              'name': 'sanitize.java',
              'lines': 99550
            },
            {
              'name': 'ploucify.java',
              'lines': 392
            }
          ]
        },
        {
          'name': 'other',
          'children': [
            {
              'name': 'json',
              'lines': 113195
            }
          ]
        }
      ]
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
    tree: {"path":"/home/murad/WebstormProjects/team01/","name":"team01","children":[{"path":"/home/murad/WebstormProjects/team01/build.sh","name":"build.sh","size":78,"extension":".sh","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client","name":"client","children":[{"path":"/home/murad/WebstormProjects/team01/client/build","name":"build","children":[],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/public","name":"public","children":[{"path":"/home/murad/WebstormProjects/team01/client/public/css","name":"css","children":[],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/public/js","name":"js","children":[],"type":"directory"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src","name":"src","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/App.test.js","name":"App.test.js","size":264,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/api","name":"api","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/api/api.js","name":"api.js","size":30718,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/api/colours.js","name":"colours.js","size":198,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/api/sampleData.js","name":"sampleData.js","size":46921,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/assets","name":"assets","children":[],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/components","name":"components","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/admin","name":"admin","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/admin/Admin.jsx","name":"Admin.jsx","size":1317,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/admin/Users.jsx","name":"Users.jsx","size":4151,"extension":".jsx","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/auth","name":"auth","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/auth/Auth.jsx","name":"Auth.jsx","size":1445,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/auth/Login.jsx","name":"Login.jsx","size":2862,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/auth/PrivRoute.jsx","name":"PrivRoute.jsx","size":690,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/auth/Signup.jsx","name":"Signup.jsx","size":2979,"extension":".jsx","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/core","name":"core","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/core/App.jsx","name":"App.jsx","size":1931,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/core/Header.jsx","name":"Header.jsx","size":2128,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/core/Home.jsx","name":"Home.jsx","size":835,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/core/Notifications.jsx","name":"Notifications.jsx","size":5056,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/core/Pagination.jsx","name":"Pagination.jsx","size":1154,"extension":".jsx","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard","name":"dashboard","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/AddRepo.jsx","name":"AddRepo.jsx","size":2695,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/Calendar.jsx","name":"Calendar.jsx","size":711,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/Dashboard.jsx","name":"Dashboard.jsx","size":978,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/LangPie.jsx","name":"LangPie.jsx","size":1656,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/Language.jsx","name":"Language.jsx","size":730,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/QuickStats.jsx","name":"QuickStats.jsx","size":1638,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/RepoCard.jsx","name":"RepoCard.jsx","size":2140,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/dashboard/RepoGrid.jsx","name":"RepoGrid.jsx","size":3817,"extension":".jsx","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository","name":"repository","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/AddDelete.jsx","name":"AddDelete.jsx","size":1047,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/CodeStream.jsx","name":"CodeStream.jsx","size":1528,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/ContributorList.jsx","name":"ContributorList.jsx","size":2290,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/FolderTree.jsx","name":"FolderTree.jsx","size":726,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/GitGraph.jsx","name":"GitGraph.jsx","size":951,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/LanguageBreakdown.jsx","name":"LanguageBreakdown.jsx","size":640,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/MiniCalendar.jsx","name":"MiniCalendar.jsx","size":1391,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/New.jsx","name":"New.jsx","size":1154,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/Repository.jsx","name":"Repository.jsx","size":5009,"extension":".jsx","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/components/repository/Stat.jsx","name":"Stat.jsx","size":349,"extension":".jsx","type":"file"}],"type":"directory"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/geo","name":"geo","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/geo/geo.js","name":"geo.js","size":5138,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/index.js","name":"index.js","size":1098,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/reducers","name":"reducers","children":[{"path":"/home/murad/WebstormProjects/team01/client/src/reducers/login.js","name":"login.js","size":2073,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/reducers/notifications.js","name":"notifications.js","size":580,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/reducers/repositories.js","name":"repositories.js","size":3602,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/client/src/reducers/users.js","name":"users.js","size":1823,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/client/src/serviceWorker.js","name":"serviceWorker.js","size":4932,"extension":".js","type":"file"}],"type":"directory"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/deploy.sh","name":"deploy.sh","size":268,"extension":".sh","type":"file"},{"path":"/home/murad/WebstormProjects/team01/parsers","name":"parsers","children":[{"path":"/home/murad/WebstormProjects/team01/parsers/repo","name":"repo","children":[{"path":"/home/murad/WebstormProjects/team01/parsers/repo/branches.js","name":"branches.js","size":2461,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/parsers/repo/commit_lines.js","name":"commit_lines.js","size":4983,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/parsers/repo/repo.js","name":"repo.js","size":528,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/parsers/repo/tree.js","name":"tree.js","size":511,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/parsers/user","name":"user","children":[{"path":"/home/murad/WebstormProjects/team01/parsers/user/user.js","name":"user.js","size":0,"extension":".js","type":"file"}],"type":"directory"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/payload.sh","name":"payload.sh","size":100,"extension":".sh","type":"file"},{"path":"/home/murad/WebstormProjects/team01/scripts","name":"scripts","children":[],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/server","name":"server","children":[{"path":"/home/murad/WebstormProjects/team01/server/authenticator","name":"authenticator","children":[{"path":"/home/murad/WebstormProjects/team01/server/authenticator/hasher.js","name":"hasher.js","size":843,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/authenticator/secret.js","name":"secret.js","size":113,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/authenticator/token.js","name":"token.js","size":0,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/server/db","name":"db","children":[{"path":"/home/murad/WebstormProjects/team01/server/db/entity.js","name":"entity.js","size":723,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/db/index.js","name":"index.js","size":517,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/db/repository.js","name":"repository.js","size":2150,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/db/user.js","name":"user.js","size":1190,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/server/env","name":"env","children":[{"path":"/home/murad/WebstormProjects/team01/server/env/index.js","name":"index.js","size":213,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/server/git","name":"git","children":[{"path":"/home/murad/WebstormProjects/team01/server/git/index.js","name":"index.js","size":1318,"extension":".js","type":"file"}],"type":"directory"},{"path":"/home/murad/WebstormProjects/team01/server/index.js","name":"index.js","size":1245,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/routes","name":"routes","children":[{"path":"/home/murad/WebstormProjects/team01/server/routes/admin.js","name":"admin.js","size":906,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/routes/authentication.js","name":"authentication.js","size":1512,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/routes/repo.js","name":"repo.js","size":1326,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/routes/user.js","name":"user.js","size":1126,"extension":".js","type":"file"},{"path":"/home/murad/WebstormProjects/team01/server/routes/validator.js","name":"validator.js","size":1874,"extension":".js","type":"file"}],"type":"directory"}],"type":"directory"}],"type":"directory"}

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
