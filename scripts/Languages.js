const languages = require("./in.json");
const languageColors = require("./LanguageColors.json");

var fs = require('fs');

const map = {};

  // if (language === "XML" || language === "JSON") continue;
  // const extensions = languages[language].extensions;
  // if (extensions === undefined) continue;
  // for(let extension of languages[language].extensions) {
  //   map[extension.slice(1)] = language;
  // }

for (let language in languageColors) {
  const languageData = languages[language];
  if (languageData === undefined || languageData.extensions === undefined) {
    // cannot find language
    console.log(`Could not find ${language}`);
    continue;
  }

  const extensions = languageData.extensions;
  for (let extension of extensions) {
    map[extension.slice(1)] = language;
  }
}

  fs.writeFile("out.json", JSON.stringify(map));