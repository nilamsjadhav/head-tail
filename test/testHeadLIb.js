const assert = require('assert');
const { firstNLines } = require('../src/headLib.js');

describe('firstNLines', () => {
  it('should display first line', () => {
    assert.equal(firstNLines('hello'), 'hello');
    assert.equal(firstNLines('bye'), 'bye');
  });

  it('should display two lines', () => {
    assert.equal(firstNLines('hello\nbye'), 'hello\nbye');
    assert.equal(firstNLines('hello\nworld'), 'hello\nworld');
  });
  
  it('should display first ten lines if 10 lines provided', () => {
    const content = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    const expected = 'hello\nbye\nworld\na\nb\nc\nd\ne\nf\nd'; 
    assert.equal(firstNLines(content), expected);
  });
});
