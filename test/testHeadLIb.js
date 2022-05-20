const assert = require('assert');
const { firstNLines } = require('../src/headLib.js');

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
