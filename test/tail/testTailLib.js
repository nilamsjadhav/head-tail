const assert = require('assert');
const { lastNLines } = require('../../src/tail/tailLib.js');

describe('lastNLines', () => {
  it('should give a line', () => {
    assert.strictEqual(lastNLines('hello'), 'hello');
    assert.strictEqual(lastNLines('bye'), 'bye');
  });
  it('should give two lines', () => {
    assert.strictEqual(lastNLines('hello\nworld'), 'hello\nworld');
  });
  it('should give more than two lines lines', () => {
    assert.strictEqual(lastNLines('hello\nworld\nc\nd'), 'hello\nworld\nc\nd');
  });
  it('should give all line if lines less than 10', () => {
    assert.strictEqual(lastNLines('1\n2\n3\n4\n5'), '1\n2\n3\n4\n5');
  });
  it('should give last 10 lines.', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    assert.strictEqual(lastNLines(content, 10), expected);
  });

});
