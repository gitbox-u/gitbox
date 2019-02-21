const REPOS_PER_PAGE = 4;

const initial = {
  allRepos: {
    1451: {
      name: "fpga-lightbike",
      desc: "An FPGA port of the popular lightbike game"
    },
    1932: {
      name: "CSC343A2",
      desc: "(Private repo) of CSC343 assignment 2"
    },
    2542: {
      name: "team01",
      desc: "CSC309 repository for full stack development"
    },
    1353: {
      name: "DE1-SOC-Viewer",
      desc: "Converts the waveforms out of Modelsim into a visualized format"
    },
    3123: {
      name: "Toaster Linear Algebra Library",
      desc: "Implements some of the most useful linear algebra functions, provides a way to transform coordinates in n-space down to m-space"
    },
    5245: {
      name: "Colour-A-Dinosaur-C",
      desc: "Have you ever wanted to colour a dinosaur in c?"
    },
    1433: {
      name: "NodeJS",
      desc: "Javascript interpreter"
    }
  },

  filteredRepos: [1451, 1932, 2542, 1353, 3123, 5245, 1433],
  pageRepos: [1451, 1932, 2542, 1353],

  search: "",
  numPages: 2,
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


const reposReducer = (state = initial, action) => {
  const {type} = action;

  // TODO: make more elegant.
  if (type === ACTIONS.UPDATE_SEARCH) {

    const {value} = action;

    const filtered = filterRepos(state.allRepos, value);
    const page = getPage(filtered, state.pageOffset);
    const pages = getNumPages(filtered);


    return {
      ...state,
      search: value,
      filteredRepos: filtered,
      pageRepos: page,
      numPages: pages,
    };
  } else if (type === ACTIONS.UPDATE_PAGE) {
    const {offset} = action;

    const page = getPage(state.filteredRepos, offset);

    return {
      ...state,
      pageOffset: offset,
      pageRepos: page,
    }
  }

  return state;
};

export {updateSearchField, changePage};
export default reposReducer;