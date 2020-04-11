const { sep } = require('path');
const { extension, replaceCwdWithDot } = require('../../src/files/utils');

describe('File Utils - Extension', () => {
  test('should be defined', () => {
    expect(extension).toBeDefined();
  });

  test('should handle normal file names', () => {
    expect(extension('index.js')).toBe('js');
    expect(extension('index.html')).toBe('html');
    expect(extension('app.jsx')).toBe('jsx');
    expect(extension('config.json')).toBe('json');
  });

  test('should handle files starting with dot', () => {
    expect(extension('.gitignore')).toBe('gitignore');
    expect(extension('.env')).toBe('env');
  });

  test('should handle files with multiple dots', () => {
    expect(extension('project.config.json')).toBe('json');
    expect(extension('stuff.test.js')).toBe('js');
    expect(extension('internal-parser.mock.ts')).toBe('ts');
    expect(extension('a..b')).toBe('b');
  });

  test('should handle files with full paths', () => {
    expect(extension('./src/foo.bar')).toBe('bar');
    expect(extension('some/directory/file.ext')).toBe('ext');
    expect(extension('/home/file.extension')).toBe('extension');
    expect(extension('/code/projects/foo/.gitignore')).toBe('gitignore');
  });

  test('should return empty string if no extension', () => {
    expect(extension('foo/bar')).toBe('');
    expect(extension('/home/bar')).toBe('');
    expect(extension('/home/.app/some-dir/bar')).toBe('');
  });

  test('should not return empty string for valid inputs', () => {
    expect(extension('index.js')).toBe('js');
    expect(extension('index.html')).toBe('html');
    expect(extension('app.jsx')).toBe('jsx');
    expect(extension('config.json')).toBe('json');
    expect(extension('.gitignore')).toBe('gitignore');
    expect(extension('.env')).toBe('env');
    expect(extension('project.config.json')).toBe('json');
    expect(extension('stuff.test.js')).toBe('js');
    expect(extension('internal-parser.mock.ts')).toBe('ts');
    expect(extension('a..b')).toBe('b');
    expect(extension('./src/foo.bar')).toBe('bar');
    expect(extension('some/directory/file.ext')).toBe('ext');
    expect(extension('/home/file.extension')).toBe('extension');
    expect(extension('/code/projects/foo/.gitignore')).toBe('gitignore');
  });
});

describe('File Utils - replaceCwdWithDot', () => {
  const dotPlus = text => '.' + sep + (text || '');
  const cwd = process.cwd();

  test('should be defined', () => {
    expect(replaceCwdWithDot).toBeDefined();
  });

  test('cmd + more -> ./ + more', () => {
    expect(replaceCwdWithDot(cwd + '/bar.js')).toEqual(dotPlus('bar.js'));
    expect(replaceCwdWithDot(cwd + '/.gitignore')).toEqual(
      dotPlus('.gitignore'),
    );
    expect(replaceCwdWithDot(cwd + '/some/deeper/path.md')).toEqual(
      dotPlus('some/deeper/path.md'),
    );
  });

  test('just cwd -> ./', () => {
    expect(replaceCwdWithDot(cwd)).toEqual(dotPlus(''));
  });
});
