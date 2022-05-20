const assert = require('assert');
const { firstNLines, splitLines, joinLines } = require('../src/headLib.js');

describe('firstNLines', () => {
  it('should return first line', () => {
    assert.strictEqual(firstNLines('hello'), 'hello');
    assert.strictEqual(firstNLines('bye'), 'bye');
  });

  it('should return two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye'), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld'), 'hello\nworld');
  });

  it('should return more than two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye'), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld'), 'hello\nworld');
  });
  
  it('should return first ten lines if 10 lines provided', () => {
    const content = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    const expected = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    assert.strictEqual(firstNLines(content), expected);
  });

  it('should return first ten lines when more than 10 lines given', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11'; 
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'; 
    assert.strictEqual(firstNLines(content), expected);
  });
});

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
