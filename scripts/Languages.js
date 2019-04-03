const languages = require("./in.json");
var fs = require('fs');

const map = {};

for (let language in languages) {
  const extensions = languages[language].extensions;
  if (extensions === undefined) continue;
  for(let extension of languages[language].extensions) {
    map[extension.slice(1)] = language;
  }
}

fs.writeFile("out.json", JSON.stringify(map));