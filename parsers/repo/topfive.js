const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function topfive(path) {

  let months_sdout = [];

  let d = new Date();
  for (let i = 0; i < 5; i++) {
    const curr = d.toISOString();
    d.setMonth(d.getMonth() - 1);
    const prev = d.toISOString();


    const git = `cd "${path}"
    git shortlog HEAD -sn --no-merges --since="${prev}" --until="${curr}"`;
    months_sdout[i] = (await exec(git, {maxBuffer: 1024 * 1000 * 4})).stdout;
  }

  const stats_month = [{}, {}, {}, {}, {}];
  const committers = {};

  months_sdout.forEach((stdout, mi) => {
    stdout.split('\n').forEach((line, index) => {
      const [cs, user] = line.split('\t');
      if (user === undefined) return;
      const commits = parseInt(cs);
      stats_month[mi][user] = commits;

      if (typeof (committers[user]) === "undefined") committers[user] = commits;
      else committers[user] += commits;
    });
  });

  const sorted = Object.keys(committers).sort(function (a, b) {
    return committers[b] - committers[a]
  });

  const top5 = sorted.slice(0, Math.min(sorted.length, 5));

  return top5.map(u => {
    const out = {name: u};
    stats_month.forEach((data, mi) => {
      out[mi + 1] = data[u] === undefined ? 0 : data[u];
    });

    return out;
  })

}

module.exports = topfive;


