#!/usr/bin/env node

const util = require('util');
const yargs = require('yargs');
const {
  bold,
  whiteBright,
  yellow,
  red,
  greenBright,
  yellowBright,
} = require('chalk');

const { version } = require('../package.json');
const { resolveConfig } = require('./config-resolution');
const { Linter } = require('./linter');
const { readDirectory } = require('./files/reader');

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
    console.log(red(bold('Error: ' + inputs[0])), '\n', ...inputs.slice(1));
  },
  ruleError: (rule, message) =>
    console.log(red(bold('Error: ' + rule)), message),
  warn: (...inputs) => {
    console.log(
      yellowBright(bold('Warn: ' + inputs[0])),
      '\n',
      ...inputs.slice(1),
    );
  },
  ruleWarn: (rule, message) => {
    console.log(yellowBright(bold('Warn: ' + rule)), message);
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
    log.error(err.message, 'Stack: ' + err.stack);
    return 1;
  }

  log.debug('Config:', config);

  const linter = new Linter(config);
  linter.addRuleHandler('top-level-items', require('./rules/top-level-items'));
  const files = await readDirectory(config);
  const result = await linter.lint(files);

  if (result.length) {
    result.forEach(error => {
      if (error.level === 'warn') {
        log.ruleWarn(error.rule, error.message);
      } else {
        log.ruleError(error.rule, error.message);
      }
      console.log('\n');
    });

    const errorCounts = result.reduce(
      (acc, cur) => {
        return { ...acc, [cur.level]: acc[cur.level] + 1 };
      },
      { error: 0, warn: 0 },
    );

    if (errorCounts.error > 0) {
      log.error(
        `Found ${errorCounts.error} errors and ${errorCounts.warn} warnings`,
      );
      return 1;
    }

    if (errorCounts.warn > 0) {
      log.warn(
        `Found ${errorCounts.error} errors and ${errorCounts.warn} warnings`,
      );
    }

    return 0;
  }
}

main().then((exitcode) => {
  process.exit(exitcode);
});
