// const fs = require('fs');

describe('Sanity tests', () => {
  // test('parser should exist', () => {
  //   expect(parse).toBeDefined();
  //   expect(parse).toBeInstanceOf(Function);
  // });

  // test('can parse a large list', done => {
  //   fs.readFile(
  //     join(__dirname, './fixtures/pages.ldm'),
  //     'utf8',
  //     (err, contents) => {
  //       if (err) {
  //         throw err;
  //       }
  //       parse(contents);
  //       done();
  //     },
  //   );
  // });
  test('should pass', () => {
    expect(require('../')).toBeDefined();
  });
});
