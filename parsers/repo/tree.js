const dirTree = require("directory-tree");

function getTree(path, extensions) {
  const regex = new RegExp(`\\.(${extensions.join('|')})$`);

  const tree = dirTree(path, {
    extensions: regex,
    exclude: [/.*node_modules.*/, /.*\/build\/.*/, /.*dependencies.*/, /.*\/\..*/]
  });
  fixTree(tree);
  return tree;
}

function fixTree(tree){
  if(typeof(tree.children) !== "undefined"){
      delete tree.size;
      for(child of tree.children){
        fixTree(child)
      }
  }
}


module.exports = getTree;