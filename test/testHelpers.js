const assert = require('assert');
const { splitLines, joinLines, firstLines } = require('../src/helpers.js');

describe('splitLines', () => {
  it('should split a line.', () => {
    assert.deepStrictEqual(splitLines('hello'), ['hello']);
    assert.deepStrictEqual(splitLines('bye'), ['bye']);
  });

  it('should split two lines.', () => {
    assert.deepStrictEqual(splitLines('good\nthoughts'), ['good', 'thoughts']);
    assert.deepStrictEqual(splitLines('soar\nhigh'), ['soar', 'high']);
  });

  it('should split more than two lines.', () => {
    assert.deepStrictEqual(splitLines('1\n2\n3'), ['1', '2', '3']);
  });
});

describe('joinLines', () => {
  it('should join a line.', () => {
    assert.deepStrictEqual(joinLines(['hello']), 'hello');
    assert.deepStrictEqual(joinLines(['bye']), 'bye');
  });

  it('should join two lines.', () => {
    assert.deepStrictEqual(joinLines(['good', 'thoughts']), 'good\nthoughts');
    assert.deepStrictEqual(joinLines(['soar', 'high']), 'soar\nhigh');
  });

  it('should join more than two lines.', () => {
    assert.deepStrictEqual(joinLines(['1', '2', '3']), '1\n2\n3');
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
