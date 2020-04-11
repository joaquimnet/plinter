function topLevelItemsRule(context, next) {
  const { files, config: cfg } = context;
  const [errorLevel, config] = cfg;

  if (!config.items || !Array.isArray(config.items)) {
    return next();
  }

  const missing = config.items.filter(item => !files.includes(item));

  if (!missing.length) {
    return next();
  }

  return next({
    level: errorLevel,
    message: `File${missing.length === 1 ? '' : 's'} ${missing
      .map(item => `'${item}'`)
      .join(', ')} missing from the top level of the project.`,
  });
}

module.exports = topLevelItemsRule;
