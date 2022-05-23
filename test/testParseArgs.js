const assert = require('assert');
const lib = require('../src/parseArgs.js');
const { parseArgs, findFiles, structureOption, decideSwitch, findValue} = lib;

describe('parseArgs', () => {
  it('should parse filename', () => {
    const options = { key: 'count', value: 10 };
    const expected = { filename: ['sample.txt'], option: options };
    assert.deepStrictEqual(parseArgs(['sample.txt']), expected);
  });

  it('should parse filename and -n option', () => {
    const options = { key: 'count', value: 2 };
    const expected = { filename: ['sample.txt'], option: options};
    assert.deepStrictEqual(parseArgs(['-n', '2', 'sample.txt']), expected);
  });

  it('should parse filename and -c option', () => {
    const options = { key: 'bytes', value: 2 };
    const expected = {filename: ['sample.txt'], option: options };
    assert.deepStrictEqual(parseArgs(['-c', '2', 'sample.txt']), expected);
  });
});

describe('findFilename', () => {
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
  it('should give count as key and 1 as value.', () => {
    const expected = { key: 'count', value: 1 };
    assert.deepStrictEqual(structureOption('-n 1'), expected);
  });

  it('should give key and value when no space in options.', () => {
    const expected = { key: 'count', value: 1 };
    assert.deepStrictEqual(structureOption('-n1'), expected);
  });

  it('should give bytes as key and 1 as value.', () => {
    const expected = { key: 'bytes', value: 1 };
    assert.deepStrictEqual(structureOption('-c 1 demo'), expected);
  });
  it('should give count as key and 1 as value when switch not given.', () => {
    const expected = { key: 'count', value: 1 };
    assert.deepStrictEqual(structureOption('-1'), expected);
  });
});

describe('decideSwitch', () => {
  it('should give option', () => {
    assert.deepStrictEqual(decideSwitch(['-c 1']), ['-c']);
  });

  it('should give option when no space is present in option and value', () => {
    assert.deepStrictEqual(decideSwitch(['-n1']), ['-n']);
  });

  it('should give option when hypen and number is provided', () => {
    assert.deepStrictEqual(decideSwitch(['-1']), ['-n']);
  });
});

describe('findValue', () => {
  it('should give value', () => {
    assert.deepStrictEqual(findValue(['-n1']), ['1']);
  });
  it('should give value when space is present.', () => {
    assert.deepStrictEqual(findValue(['-n 1']), ['1']);
  });
});
