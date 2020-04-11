module.exports = {
  rules: {
    'top-level-items': ['error', { items: ['CHANGELOG.md', 'README.md', 'LICENSE', 'src', '.editorconfig'] }],
  },
  ignore: ['*.md'],
  pattern: ['**'],
};
