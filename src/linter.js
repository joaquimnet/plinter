class Linter {
  constructor(config) {
    if (!config.rules) {
      throw new Error('No rules specified in the config');
    }

    this.ruleConfigs = new Map(
      Object.entries(config.rules)
        .filter(entry => {
          if (!entry) return false;
          if (entry[0] && [false, 'off'].includes(entry[0])) return false;
          return true;
        })
        .map(entry => {
          return [
            entry[0],
            [
              ['warn', 'error'].includes(entry[1][0].toLowerCase())
                ? entry[1][0].toLowerCase()
                : 'error',
              entry[1][1],
            ],
          ];
        }),
    );
    this.loadedRules = new Map();

    this.errors = [];
  }

  addRuleHandler(ruleName, handler) {
    this.loadedRules.set(ruleName, handler);
  }

  lint(files) {
    return new Promise((resolve) => {
      this.ruleConfigs.forEach((_, rule) => {
        if (!this.loadedRules.has(rule))
          throw new Error(`Rule ${rule} not loaded.`);
      });

      const rules = [
        ...Array.from(this.ruleConfigs.entries()).map(entry => ({
          name: entry[0],
          config: entry[1],
        })),
      ];

      // console.dir(rules, { depth: 5 });

      let currentRule = 0;
      const finished = currentRule === rules.length - 1;

      const callback = error => {
        if (error) {
          this.errors.push({ ...error, rule: rules[currentRule].name });
        }
        if (finished) {
          resolve(this.errors);
          return;
        }
        console.log('cb');
        currentRule += 1;
        this.loadedRules.get(rules[currentRule].name)(
          { files, config: rules[currentRule].config },
          callback,
        );
      };

      this.loadedRules.get(rules[currentRule].name)(
        { files, config: rules[currentRule].config },
        callback,
      );
    });
  }
}

module.exports = { Linter };
