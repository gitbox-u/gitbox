import { getRepositories, getRepositoryData } from '../api/api';
import {getRandomColor} from '../api/colours'

const REPOS_PER_PAGE = 8;

const initial = {
  allRepos: {},
  repoData: {},

  allLangs:{},

  filteredRepos: [],
  pageRepos: [],

  search: "",
  numPages: 0,
  pageOffset: 1,

};

const ACTIONS = {
  UPDATE_SEARCH: 'REPOSITORIES_UPDATE_SEARCH',
  UPDATE_PAGE: 'REPOSITORIES_UPDATE_PAGE',

  SET_REPOS: 'REPOSITORIES_SET_REPOS',
  SET_REPO_DATA: 'REPOSITORIES_SET_REPO_DATA',
};

const refresh = () => (dispatch) => {
  return getRepositories().then(
    res => {
      if (res.auth) {
        dispatch({
          type: ACTIONS.SET_REPOS,
          allRepos: res,
        })
      }
    }
  );
};

const initDataForRepo = (id) => (dispatch) => {
  return getRepositoryData(id).then(
    res => {
      dispatch({
        type: ACTIONS.SET_REPO_DATA,
        data: res,
        id: id,
      })
    }
  )
};


const filterRepos = (repos, filter) => {
  const results = [];

  for (let id in repos) {
    if (repos[id].name && repos[id].name.toLowerCase().includes(filter.toLowerCase())) results.push(id);
  }
  return results;
};


const getNumPages = (filteredRepos) => {
  return Math.ceil(filteredRepos.length / REPOS_PER_PAGE);
};

const getPage = (filteredRepos, offset) => {
  const start = (offset - 1) * REPOS_PER_PAGE, end = (offset) * REPOS_PER_PAGE;
  return filteredRepos.slice(start, end);
};

const updateSearchField = (value) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.UPDATE_SEARCH,
      value
    });
  }
};

const changePage = (offset) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.UPDATE_PAGE,
      offset
    })
  }
};


const repositories = (state = initial, action) => {
  const { type } = action;

  // TODO: make more elegant.
  if (type === ACTIONS.UPDATE_SEARCH) {
    const { value } = action;

    const filtered = filterRepos(state.allRepos, value);
    const page = getPage(filtered, state.pageOffset);
    const pages = getNumPages(filtered);

    let allLangs = {}
    for (let id in state.allRepos) {
      if (state.allRepos[id].breakdown) {
        state.allRepos[id].breakdown.forEach(
          function (lang) {
            if (Object.keys(allLangs).length === 0 && allLangs.constructor === Object) {
              allLangs[lang.language] = getRandomColor();
            }
            else if (!(lang.language in allLangs)) {
              allLangs[lang.language] = getRandomColor();
            }
          });
      }
      }


    return {
      ...state,
      search: value,
      filteredRepos: filtered,
      pageRepos: page,
      numPages: pages,
      pageOffset: 1,
      langs: allLangs,
    };
  } else if (type === ACTIONS.UPDATE_PAGE) {
    const { offset } = action;

    const page = getPage(state.filteredRepos, offset);

    return {
      ...state,
      pageOffset: offset,
      pageRepos: page,
    }
  } else if (type === ACTIONS.SET_REPOS) {
    const { allRepos } = action;
    const filtered = filterRepos(allRepos, state.search);
    const page = getPage(filtered, state.pageOffset);
    const pages = getNumPages(filtered);

    return {
      ...state,
      filteredRepos: filtered,
      pageRepos: page,
      numPages: pages,
      allRepos,
    }
  } else if (type === ACTIONS.SET_REPO_DATA) {
    const { data, id } = action;

    return {
      ...state,
      repoData: {
        ...state.repoData,
        [id]: data,
      }
    }
  }

  return state;
};

export { updateSearchField, changePage, refresh, initDataForRepo};
export default repositories;