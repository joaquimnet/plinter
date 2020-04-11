const { readDirectory } = require('../../src/files/reader');

// TODO: For documentation: readDirectory ignores node_modules by default.

describe('Reading directories', () => {
  test('should be defined', () => {
    expect(readDirectory).toBeDefined();
  });

  test('no arguments, should not throw', done => {
    readDirectory().then(_ => done());
  });

  test('result should be an array', done => {
    readDirectory().then(res => {
      expect(res).toBeInstanceOf(Array);
      expect(res.length).toBeGreaterThan(0);
      done();
    });
  });

  test('should read files matching glob', () => {
    readDirectory({ pattern: 'package.json' }).then(res => {
      expect(res).toEqual(['package.json']);
    });
  });

  test('should ignore files matching ignore pattern', () => {
    readDirectory({ ignore: '*.json' }).then(res => {
      expect(res).not.toContain('package.json');
    });
  });
});
