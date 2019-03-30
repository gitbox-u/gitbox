const dirTree = require("directory-tree");

function getTree(path, extensions) {
  const tree = dirTree(path, {
    extensions: /\.py/
  });
  return tree;
}


module.exports = getTree;