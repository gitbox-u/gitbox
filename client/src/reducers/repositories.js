import {repos} from './sampleData';

const REPOS_PER_PAGE = 8;

const initial = {
  allRepos: repos,
  
  filteredRepos: [],
  pageRepos: [],

  search: "",
  numPages: 0,
  pageOffset: 1,

};

const ACTIONS = {
  UPDATE_SEARCH: 0,
  UPDATE_PAGE: 1,
};


const filterRepos = (repos, filter) => {
  const results = []

  for (let id in repos) {
    if (repos[id].name.toLowerCase().includes(filter.toLowerCase())) results.push(id);
  }
  return results;
};

const getNumPages = (filteredRepos) => {
  return Math.ceil(filteredRepos.length / REPOS_PER_PAGE);
}

const getPage = (filteredRepos, offset) => {
  const start = (offset - 1) * REPOS_PER_PAGE, end = (offset) * REPOS_PER_PAGE;
  return filteredRepos.slice(start, end);
}

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
}


const repositories = (state = initial, action) => {
  const { type } = action;

  // TODO: make more elegant.
  if (type === ACTIONS.UPDATE_SEARCH) {

    const { value } = action;

    const filtered = filterRepos(state.allRepos, value);
    const page = getPage(filtered, state.pageOffset);
    const pages = getNumPages(filtered);


    return {
      ...state,
      search: value,
      filteredRepos: filtered,
      pageRepos: page,
      numPages: pages,
      pageOffset: 1,
    };
  } else if (type === ACTIONS.UPDATE_PAGE) {
    const { offset } = action;

    const page = getPage(state.filteredRepos, offset);

    return {
      ...state,
      pageOffset: offset,
      pageRepos: page,
    }
  }

  return state;
};

export { updateSearchField, changePage };
export default repositories;