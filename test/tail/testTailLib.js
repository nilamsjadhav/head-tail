const assert = require('assert');
const lib = require('../../src/tail/tailLib.js');
const { lastNLines, lastNCharacters, reverseContent, tailMain, getOperation } = lib;

describe('lastNLines', () => {
  it('should give a line', () => {
    assert.strictEqual(lastNLines('hello'), 'hello');
    assert.strictEqual(lastNLines('bye'), 'bye');
  });
  it('should give more than two lines lines', () => {
    assert.strictEqual(lastNLines('hello\nworld\nc\nd'), 'hello\nworld\nc\nd');
  });
  it('should give last 10 lines.', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    assert.strictEqual(lastNLines(content, 10), expected);
  });
  it('should give all lines when line count > length', () => {
    assert.strictEqual(lastNLines('a\nb\nc', 4), 'a\nb\nc');
  });
});

describe('lastNCharacters', () => {
  it('should give last one characters', () => {
    assert.strictEqual(lastNCharacters('hello', 1), 'o');
    assert.strictEqual(lastNCharacters('good', 1), 'd');
  });

  it('should give last two characters', () => {
    assert.strictEqual(lastNCharacters('hello', 2), 'lo');
    assert.strictEqual(lastNCharacters('good', 2), 'od');
  });

  it('should give some characters from previous line if last line have less character than specified value', () => {
    assert.strictEqual(lastNCharacters('a\nb\nc\nd', 3), 'c\nd');
    assert.strictEqual(lastNCharacters('hello\nworld', 7), 'o\nworld');
  });

  it('should give all characters when count > length', () => {
    assert.strictEqual(lastNCharacters('hello', 6), 'hello');
  });

});

describe('reverseContent', () => {
  it('should reverse line', () => {
    assert.strictEqual(reverseContent('hello'), 'hello');
  });
  it('should reverse order of two lines', () => {
    assert.strictEqual(reverseContent('hello\nworld'), 'world\nhello');
  });
  it('should reverse order of more than two lines', () => {
    assert.strictEqual(reverseContent('a\nb\nc\nd'), 'd\nc\nb\na');
  });
});

describe('getOperation', () => {
  it('should give lastNLines function', () => {
    assert.strictEqual(getOperation('line'), lastNLines);
  });
  it('should give lastNCharacter function', () => {
    assert.strictEqual(getOperation('byte'), lastNCharacters);
  });
});

describe('tailMain', () => {
  it('should give a last line', () => {
    const option = { flag: 'line', value: 1 };
    assert.strictEqual(tailMain('a\nb\nc\nd', option), 'd');
  });

  it('should give two last line', () => {
    const option = { flag: 'line', value: 2 };
    assert.strictEqual(tailMain('a\nb\nc\nd', option), 'c\nd');
  });
});
