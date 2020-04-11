const path = require('path');

const { sep } = path;

function extension(filePath) {
  // path.basename gets the last part of a path
  const basename = path.basename(filePath);

  if (typeof basename !== 'string') {
    return '';
  }

  // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504
  const ext = basename.slice(((basename.lastIndexOf('.') - 1) >>> 0) + 2);

  // ex: .gitignore -> gitignore or .env -> env
  if (!ext && basename[0] === '.') {
    return basename.substr(1);
  }

  return ext;
}

function replaceCwdWithDot(input) {
  const replaced = input.replace(new RegExp(process.cwd(), 'g'), '.');
  return replaced === '.' ? replaced + sep : replaced;
}

module.exports = {
  extension,
  replaceCwdWithDot,
};
