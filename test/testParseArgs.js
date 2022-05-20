const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse filename', () => {
    const expected = { filename: 'sample.txt', count: 10, separator: '\n' };
    assert.deepStrictEqual(parseArgs(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const expected = { filename: 'sample.txt', count: 2, separator: '\n' };
    assert.deepStrictEqual(parseArgs(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const expected = { filename: 'sample.txt', count: 2, separator: ' ' };
    assert.deepStrictEqual(parseArgs(['-c', '2', 'sample.txt']), expected);
  });
});
