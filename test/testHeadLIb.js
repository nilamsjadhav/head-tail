const assert = require('assert');

const firstNLines = function (content) {
  return content;
};

describe('firstNLines', () => {
  it('should display first line', () => {
    assert.equal(firstNLines('hello'), 'hello');
  });

  it('should display two lines', () => {
    assert.equal(firstNLines('hello\nbye'), 'hello\nbye');
  });
});
