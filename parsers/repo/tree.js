const dirTree = require("directory-tree");
const {getLanguage, getColour, darken} = require("./LanguageTools");

function getTree(path, extensions) {
  const regex = new RegExp(`\\.(${extensions.join('|')})$`);

  const tree = dirTree(path, {
    extensions: regex,
    exclude: [/.*node_modules.*/, /.*\/build\/.*/, /.*dependencies.*/, /.*\.min\..*/, /.*\/\..*/]
  });
  fixTree(tree, "#f0f0f0");
  return tree;
}


function fixTree(tree, col){
  if(typeof(tree.children) !== "undefined"){
      delete tree.size;
      for(child of tree.children){
        fixTree(child, darken(col, .9))
      }
      tree.color = col;
  }else{
    const extension = tree.path.split('.').pop();
    if(extension === "")return;
    tree.color = getColour(getLanguage(extension));
  }
}


module.exports = getTree;