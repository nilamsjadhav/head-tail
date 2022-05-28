const assert = require('assert');
const lib = require('../../src/head/parseArgs.js');
const { findFiles } = require('../../src/head/library.js');
const { parseArgs, structureOption, parser } = lib;

describe('parser', () => {
  it('should parse filename', () => {
    const options = { flag: 'line', count: 10 };
    const expected = { fileNames: ['sample.txt'], options: options };
    assert.deepStrictEqual(parser(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const options = { flag: 'line', count: 2 };
    const expected = { fileNames: ['sample.txt'], options: options};
    assert.deepStrictEqual(parser(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const options = { flag: 'bytes', count: 2 };
    const expected = {fileNames: ['sample.txt'], options: options };
    assert.deepStrictEqual(parser(['-c', '2', 'sample.txt']), expected);
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
    const expected = { flag: 'line', count: 10 };
    assert.deepStrictEqual(structureOption({}), expected);
  });
  it('should give count as key and 1 as value.', () => {
    const expected = { flag: 'line', count: 1 };
    const args = { option: '-n', count: 1 };
    assert.deepStrictEqual(structureOption(args), expected);
  });

  it('should give bytes as key and 1 as value.', () => {
    const expected = { flag: 'bytes', count: 1 };
    const args = { option: '-c', count: 1 };
    assert.deepStrictEqual(structureOption(args), expected);
  });
});

describe('parseArgs', () => {
  it('should give -c as option and 1 as value', () => {
    const actual = parseArgs(['-c', '1', 'a.txt']);
    const expected = { option: '-c', count: 1, fileNames: ['a.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('should give -n as option and 2 as value', () => {
    const actual = parseArgs(['-n', '2', 'a.txt']);
    const expected = { option: '-n', count: 2, fileNames: ['a.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('should give latest value when same option repeated', () => {
    const actual = parseArgs(['-n', '2', '-n', '5', 'b.txt']);
    const expected = { option: '-n', count: 5, fileNames: ['b.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('should give -1 as option.', () => {
    const actual = parseArgs(['-1', 'a.txt']);
    const expected = { option: '-n', count: 1, fileNames: ['a.txt']};
    assert.deepStrictEqual(actual, expected);
  });
});
