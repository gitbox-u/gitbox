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

  search: "",
  filteredRepos: []
}

const ACTIONS = {
  UPDATE: 0,
};

const updateSearchField = (value) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.UPDATE,
      value
    });
  }
};


const reposReducer = (state = initial, action) => {
  const { type } = action;


  if (type === ACTIONS.UPDATE) {

    const { value } = action;
    return {
      ...state,
      search: value,
    };
  }

  return state;
};

export { updateSearchField };
export default reposReducer;