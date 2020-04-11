#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const util = require('util');
const yargs = require('yargs');
const { bold, whiteBright, yellow, red, greenBright } = require('chalk');

const { version } = require('../package.json');
const { resolveConfig } = require('./config-resolution');

const args = yargs
  .usage(bold(whiteBright('$0 pattern')))
  .version(bold(yellow('Plinter ')) + 'v' + version)
  .option('version', {
    alias: 'v',
    description: "Show Plinter's version number",
    type: 'boolean',
  })
  .option('debug', {
    alias: 'd',
    description: 'Debug mode',
    type: 'boolean',
    default: false,
  })
  .option('config', {
    alias: 'c',
    description: 'Path to configuration file',
    type: 'string',
  }).argv;

const log = {
  red: text => console.log(red(bold(text))),
  green: text => console.log(greenBright(bold(text))),
  error: (...inputs) => {
    console.log(red(bold('Error! ' + inputs[0])), '\n', ...inputs.slice(1));
  },
  debug: (...inputs) => {
    if (!args.debug) return;
    inputs = inputs.map(text => util.inspect(text, false, 5, true));
    console.log(...inputs);
  },
};

log.debug('Arguments:', args);

async function main() {
  let config;
  try {
    config = await resolveConfig(args);
  } catch (err) {
    log.error(
      err.message,
      'Stack: ' + err.stack,
    );
    return;
  }
  log.debug('Config:', config);
}

main();
