const assert = require('assert');
const lib = require('../src/parseArgs.js');
const { findFiles } = require('../src/library.js');
const { parseArgs, structureOption, getOption} = lib;

describe('parseArgs', () => {
  it('should parse filename', () => {
    const options = { key: 'line', value: 10 };
    const expected = { filename: ['sample.txt'], option: options };
    assert.deepStrictEqual(parseArgs(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const options = { key: 'line', value: 2 };
    const expected = { filename: ['sample.txt'], option: options};
    assert.deepStrictEqual(parseArgs(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const options = { key: 'bytes', value: 2 };
    const expected = {filename: ['sample.txt'], option: options };
    assert.deepStrictEqual(parseArgs(['-c', '2', 'sample.txt']), expected);
  });
});

describe('findFiles', () => {
  it('should give file name when a file name given', () => {
    assert.deepStrictEqual(findFiles(['sample.txt']), ['sample.txt']);
  });

  it('should give file name when -c and file name given', () => {
    const args = ['-c', '1', 'sample.txt'];
    assert.deepStrictEqual(findFiles(args), ['sample.txt']);
  });

  it('should give file name when -n and file name given', () => {
    const args = ['-n', '1', 'sample.txt'];
    assert.deepStrictEqual(findFiles(args), ['sample.txt']);
  });

  it('should give file name when two file names given', () => {
    const expected = ['sample.txt', 'demo.txt'];
    assert.deepStrictEqual(findFiles(['sample.txt', 'demo.txt']), expected);
  });
  it('should give file name when two options given', () => {
    const actual = ['-c', '1', '-n', '2', 'demo.txt'];
    assert.deepStrictEqual(findFiles(actual), ['demo.txt']);
  });

  it('should give file name when there is no space given between options', () => {
    const actual = ['-n2', 'demo.txt'];
    assert.deepStrictEqual(findFiles(actual), ['demo.txt']);
  });
  it('should give file name when number with hypen given', () => {
    const actual = ['-2', 'demo.txt'];
    assert.deepStrictEqual(findFiles(actual), ['demo.txt']);
  });
});

describe('structureOption', () => {
  it('should give count as key and 10 as value.', () => {
    const expected = { key: 'line', value: 10 };
    assert.deepStrictEqual(structureOption([]), expected);
  });
  it('should give count as key and 1 as value.', () => {
    const expected = { key: 'line', value: 1 };
    assert.deepStrictEqual(structureOption(['-n', '1']), expected);
  });

  it('should give bytes as key and 1 as value.', () => {
    const expected = { key: 'bytes', value: 1 };
    assert.deepStrictEqual(structureOption(['-c', '1']), expected);
  });
});

describe('getOption', () => {
  it('should option and value', () => {
    assert.deepStrictEqual(getOption(['-n1']), ['-n', '1']);
  });
  it('should option and value when negative number given', () => {
    assert.deepStrictEqual(getOption(['-11']), ['-11', 11]);
  });
  it('should option and value when array length is 2', () => {
    assert.deepStrictEqual(getOption(['-n', '1']), ['-n', '1']);
  });

  it('should return same array when it is empty', () => {
    assert.deepStrictEqual(getOption([]), []);
  });
});
