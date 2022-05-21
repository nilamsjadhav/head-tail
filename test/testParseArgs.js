const assert = require('assert');
const { parseArgs, findFiles, structureOption} = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse filename', () => {
    const optionValue = { key: 'count', value: 10 };
    const expected = { filename: ['sample.txt'], option: optionValue };
    assert.deepStrictEqual(parseArgs(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const optionValue = { key: 'count', value: 2 };
    const expected = { filename: ['sample.txt'], option: optionValue};
    assert.deepStrictEqual(parseArgs(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const optionValue = { key: 'bytes', value: 2 };
    const expected = {filename: ['sample.txt'], option: optionValue };
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
  it('should give count as key and 1 as value.', () => {
    const expected = { key: 'count', value: 1 };
    assert.deepStrictEqual(structureOption(['-n 1']), expected);
  });

  it('should give bytes as key and 1 as value.', () => {
    const expected = { key: 'bytes', value: 1 };
    assert.deepStrictEqual(structureOption(['-c 1']), expected);
  });
});
