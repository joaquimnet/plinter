const fs = require('fs');
const util = require('util');
const { join } = require('path');
const appRoot = require('app-root-path');
const { glob, hasMagic } = require('glob-gitignore');
const ignore = require('ignore');

const readFile = util.promisify(fs.readFile);

const messages = require('../messages');

const readDirectory = async (options = {}) => {
  try {
    // Use var to declare gitignoreFile inside a try block
    var gitignoreFile = await readFile(join(appRoot.toString(), '.gitignore'), {
      encoding: 'utf8',
    });
  } catch (err) {
    gitignoreFile = 'node_modules';
    console.log(messages.MISSING_GITIGNORE);
  }
  const patterns = gitignoreFile
    .split('\n')
    .map(line => line.trim())
    .filter(line => line[0] !== '#')
    .filter(line => !hasMagic(line));

  const ig = ignore();
  ig.add(patterns);
  if (options.ignore) {
    ig.add(options.ignore);
  }

  return glob(options.pattern || '**', {
    cwd: options.root || appRoot.toString(),
    ignore: ig,
  });
};

module.exports = {
  readDirectory,
};
