const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function topfive(path) {

  let months_sdout = [];

  let d = new Date();
  for (let i = 0; i < 5; i++) {
    const curr = d.toISOString();
    d.setMonth(d.getMonth() - 1);
    const prev = d.toISOString();

    const git = `cd ${path}
    git shortlog -sn --no-merges --since="${prev}" --until="${curr}"`;
    months_sdout[i] = await exec(git);
  }

  months_sdout.forEach((sdout, mi) => {
    stdout.split('\n').forEach((user, index) => {
    });
  });


}

module.exports = topfive;


