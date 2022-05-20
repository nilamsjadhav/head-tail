const assert = require('assert');
const { firstNLines } = require('../src/headLib.js');

describe('firstNLines', () => {
  it('should give first line', () => {
    assert.strictEqual(firstNLines('hello'), 'hello');
    assert.strictEqual(firstNLines('bye'), 'bye');
  });

  it('should give two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye'), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld'), 'hello\nworld');
  });

  it('should give more than two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye'), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld'), 'hello\nworld');
  });
  
  it('should give first ten lines if ten lines provided', () => {
    const content = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    const expected = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    assert.strictEqual(firstNLines(content), expected);
  });

  it('should give first ten lines when more than ten lines given', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11'; 
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'; 
    assert.strictEqual(firstNLines(content), expected);
  });

  it('should give first line', () => {
    assert.strictEqual(firstNLines('hello\nworld\ngood', 1), 'hello');
  });

  it('should give two lines', () => {
    assert.strictEqual(firstNLines('hello\nworld\ngood', 2), 'hello\nworld');
  });

  it('should give more than two lines', () => {
    assert.strictEqual(firstNLines('1\n2\n3\n4', 3), '1\n2\n3');
  });

  it('should give all lines if count is greater than number of lines', () => {
    assert.strictEqual(firstNLines('1\n2\n3', 4), '1\n2\n3');
  });
});
