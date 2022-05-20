const assert = require('assert');
const { firstNLines } = require('../src/headLib.js');

describe('firstNLines', () => {
  it('should give first line', () => {
    assert.strictEqual(firstNLines('hello', '\n', 10), 'hello');
    assert.strictEqual(firstNLines('bye', '\n', 10), 'bye');
  });

  it('should give two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye', '\n', 10), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld', '\n', 10), 'hello\nworld');
  });

  it('should give more than two lines', () => {
    assert.strictEqual(firstNLines('hello\nbye', '\n', 10), 'hello\nbye');
    assert.strictEqual(firstNLines('hello\nworld', '\n', 10), 'hello\nworld');
  });
  
  it('should give first ten lines if ten lines provided', () => {
    const content = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    const expected = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    assert.strictEqual(firstNLines(content, '\n', 10), expected);
  });

  it('should give first ten lines when more than ten lines given', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11'; 
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'; 
    assert.strictEqual(firstNLines(content, '\n', 10), expected);
  });

  it('should give first line', () => {
    assert.strictEqual(firstNLines('hello\nworld\ngood', '\n', 1), 'hello');
  });

  it('should give two lines', () => {
    const content = 'hello\nworld\ngood';
    assert.strictEqual(firstNLines(content, '\n', 2), 'hello\nworld');
  });

  it('should give more than two lines', () => {
    assert.strictEqual(firstNLines('1\n2\n3\n4', '\n', 3), '1\n2\n3');
  });

  it('should give all lines if count is greater than number of lines', () => {
    assert.strictEqual(firstNLines('1\n2\n3', '\n', 4), '1\n2\n3');
  });
});
