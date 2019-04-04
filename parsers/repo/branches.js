const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function branches(path) {
  const git = `cd "${path}"
  git log --all --date-order --pretty="%h|%p|%d|%s"`;

  const {stdout, stderr} = await exec(git, {maxBuffer: 1024 * 1000 * 4});

  const nodes = [];
  const edges = [];
  let reserve = [];
  let branchIndex = 0;
  const branches = {};

  function getBranch(sha) {

    if (branches[sha] === undefined) {
      branches[sha] = branchIndex;
      reserve.push(branchIndex);
      branchIndex += 1;
    }

    return branches[sha];
  }


  stdout.split('\n').forEach((commit, index) => {
    const tokens = commit.split('|');
    if (tokens.length < 4) return;
    const [sha, parentsstring, desc, message] = tokens;

    const parents = parentsstring.split(" ");

    const branch = getBranch(sha);
    const numParents = parents.length;
    const offset = reserve.indexOf(branch);

    const routes = [];

    if (numParents === 1) {
      if (branches[parents[0]] !== undefined) {
        // create branch
        reserve.slice(offset + 1).forEach((b, i) => routes.push([i + offset + 1, i + offset, b]));
        reserve.slice(0, offset).forEach((b, i) => routes.push([i, i, b]));

        reserve = reserve.filter((value) => value !== branch);

        routes.push([offset, reserve.indexOf(branches[parents[0]]), branch])
      } else {
        // straight
        reserve.forEach((b, i) => {
          routes.push([i, i, b]);
        });
        branches[parents[0]] = branch;
      }


    } else if (numParents === 2) {
      // merge
      branches[parents[0]] = branch;
      reserve.forEach((b, i) => {
        routes.push([i, i, b]);
      });
      routes.push([offset, reserve.indexOf(getBranch(parents[1])), getBranch(parents[1])]);
    }


    nodes.push({
      'id': sha,
      'y': offset * 50,
      //'y': branch * 100,
      'x': index * 50,
      //'routes': routes,
      'color': COLOURS[branch % COLOURS.length],
      'fixed': true,
    });

    parents.forEach(p => {
      edges.push({
        'from': sha,
        'to': p,
      })
    });
  });

  return {
    'nodes': nodes,
    'edges': edges,
  }

}

const COLOURS = [
  "#e11d21",
  "#fbca04",
  "#009800",
  "#006b75",
  "#207de5",
  "#0052cc",
  "#5319e7",
  "#f7c6c7",
  "#fad8c7",
  "#fef2c0",
  "#bfe5bf",
  "#c7def8",
  "#bfdadc",
  "#bfd4f2",
  "#d4c5f9",
  "#cccccc",
  "#84b6eb",
  "#e6e6e6",
  "#ffffff",
  "#cc317c",
];

module.exports = branches;
