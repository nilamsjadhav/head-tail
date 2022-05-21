const assert = require('assert');
const { parseArgs, findFiles, structureOption} = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse filename', () => {
    const expected = { filename: ['sample.txt'], option: { count: 10 } };
    assert.deepStrictEqual(parseArgs(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const expected = { filename: ['sample.txt'], option: { count: 2 }};
    assert.deepStrictEqual(parseArgs(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const expected = {filename: ['sample.txt'], option: { bytes: 2 } };
    assert.deepStrictEqual(parseArgs(['-c', '2', 'sample.txt']), expected);
  });
});

describe('findFilename', () => {
  it('should give file name when a file name given', () => {
    assert.deepStrictEqual(findFiles('sample.txt'), ['sample.txt']);
  });

  it('should give file name when -c and file name given', () => {
    assert.deepStrictEqual(findFiles('-c 1 sample.txt'), ['sample.txt']);
  });

  it('should give file name when -n and file name given', () => {
    assert.deepStrictEqual(findFiles('-n 1 sample.txt'), ['sample.txt']);
  });
  it('should give file name when two file names given', () => {
    const expected = ['sample.txt', 'demo.txt'];
    assert.deepStrictEqual(findFiles('sample.txt demo.txt'), expected);
  });
});

describe('structureOption', () => {
  it('should give option and value of it.', () => {
    assert.deepStrictEqual(structureOption(['-n 1']), {count: 1});
  });

  it('should give option and value of it.', () => {
    assert.deepStrictEqual(structureOption(['-c 1']), {bytes: 1});
  });
});
