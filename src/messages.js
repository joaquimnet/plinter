const chalk = require('chalk');

const warn = text => chalk.bold(chalk.yellow('WARN: ')) + text;

module.exports = {
  MISSING_GITIGNORE: warn(
    '.gitignore file not found on the root of your project! This could lead to performance issues.',
  ),
};
