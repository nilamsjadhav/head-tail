const assert = require('assert');
const lib = require('../../src/head/library.js');
const { splitLines, joinLines, firstLines, getSeparator} = lib;

describe('splitLines', () => {
  it('should split content based on \n.', () => {
    assert.deepStrictEqual(splitLines('hello', '\n'), ['hello']);
    assert.deepStrictEqual(splitLines('bye', '\n'), ['bye']);
  });

  it('should split content based on |.', () => {
    const content = 'good|thoughts';
    assert.deepStrictEqual(splitLines(content, '|'), ['good', 'thoughts']);
    assert.deepStrictEqual(splitLines('soar|high', '|'), ['soar', 'high']);
  });

  it('should split more than two lines.', () => {
    assert.deepStrictEqual(splitLines('1\n2\n3', '\n'), ['1', '2', '3']);
  });
});

describe('joinLines', () => {
  it('should join a line.', () => {
    assert.deepStrictEqual(joinLines(['hello'], '\n'), 'hello');
    assert.deepStrictEqual(joinLines(['bye'], '\n'), 'bye');
  });

  it('should join two lines.', () => {
    const lines = ['good', 'thoughts'];
    assert.deepStrictEqual(joinLines(lines, '\n'), 'good\nthoughts');
    assert.deepStrictEqual(joinLines(['soar', 'high'], '\n'), 'soar\nhigh');
  });

  it('should join more than two lines.', () => {
    assert.deepStrictEqual(joinLines(['1', '2', '3'], '\n'), '1\n2\n3');
  });
});

describe('firstLines', () => {
  it('should give a line', () => {
    assert.deepStrictEqual(firstLines(['bye'], 1), ['bye']);
  });
  it('should give a line when two lines give', () => {
    assert.deepStrictEqual(firstLines(['bye', 'hello'], 1), ['bye']);
  });
});

describe('getSeparator', () => {
  it('should give newline separator when -n option given', () => {
    assert.equal(getSeparator({flag: 'line', count: 2}), '\n');
  });
  it('should give space separator when -c option given', () => {
    assert.strictEqual(getSeparator({flag: 'bytes', count: 2}), '');
  });
  it('should give newline separator when no option given', () => {
    assert.equal(getSeparator({}), '\n');
  });
});
