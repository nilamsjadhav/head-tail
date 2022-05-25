const assert = require('assert');

const lastNLines = content => content;

describe('lastNLines', () => {
  it('should give a line', () => {
    assert.strictEqual(lastNLines('hello'), 'hello');
  });
});
