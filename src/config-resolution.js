const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

const { replaceCwdWithDot } = require('./files/utils');

async function resolveConfig(args) {
  let configFilePath;
  if (args.config) {
    configFilePath = path.resolve(args.config);
  } else {
    configFilePath = appRoot.resolve('plinter.config.js');
  }

  const configExists = await fs.existsSync(configFilePath);

  if (configExists) {
    try {
      return require(configFilePath);
    } catch (err) {
      const error = Error(`Could not require config file. (${err.__proto__.name || err})`);
      error.stack = err.stack ? replaceCwdWithDot(err.stack) : 'none';
      throw error;
    }
  }

  throw new Error('No configuration file found.');
}

module.exports = {
  resolveConfig,
};
