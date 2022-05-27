const assert = require('assert');
const lib = require('../../src/head/headLib.js');
const { firstNParts, head, displayOutput } = lib;

describe('firstNParts', () => {
  it('should give first line', () => {
    assert.strictEqual(firstNParts('hello\nworld\ngood', '\n', 1), 'hello');
  });

  it('should give two lines', () => {
    const content = 'hello\nworld\ngood';
    assert.strictEqual(firstNParts(content, '\n', 2), 'hello\nworld');
  });

  it('should give more than two lines', () => {
    assert.strictEqual(firstNParts('1\n2\n3\n4', '\n', 3), '1\n2\n3');
  });

  it('should give all lines if count is greater than number of lines', () => {
    assert.strictEqual(firstNParts('1\n2\n3', '\n', 4), '1\n2\n3');
  });

  it('should give first ten lines when more than ten lines given', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11'; 
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'; 
    assert.strictEqual(firstNParts(content, '\n', 10), expected);
  });
});

const readData = function(mockFile, content){
  return function (filename, encoding) {
    assert.strictEqual(mockFile, filename);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

const displayContent = function (text) {
  return function (content) {
    assert.strictEqual(content, text);
  };
};

describe('head', () => {
  it('should give a line', () => {
    const mockedReadFileSync = readData('sample.txt', 'good');
    const mockedErrorLog = displayContent('good');
    const mockedLog = displayContent('good');

    const args = ['sample.txt'];
    const exitCode = head(args, mockedReadFileSync, mockedLog, mockedErrorLog);
    assert.equal(exitCode, 0);
  });
  
  it('should give a line when -n option provided with 1', () => {
    const mockedReadFileSync = readData('sample.txt', 'good');
    const mockedErrorLog = displayContent('good');
    const mockedLog = displayContent('good');

    const args = ['-n', '1', 'sample.txt'];
    const exitCode = head(args, mockedReadFileSync, mockedLog, mockedErrorLog);
    assert.equal(exitCode, 0);
  });
  
  it('should give 4 characters when -c option provided with 3', () => {
    const mockedReadFileSync = readData('sample.txt', 'good');
    const mockedErrorLog = displayContent('good');
    const mockedLog = displayContent('good');

    const args = ['-c', '4', 'sample.txt'];
    const exitCode = head(args, mockedReadFileSync, mockedLog, mockedErrorLog);
    assert.equal(exitCode, 0);
  });
  
  it('should give error', () => {
    const args = 'head: missing.txt: No such file or directory';
    const mockedReadFileSync = readData('sample.txt', 'good');
    const mockedErrorLog = displayContent(args);
    const mockedLog = displayContent('good');

    const exitCode = head(['missing.txt'],
      mockedReadFileSync, mockedLog, mockedErrorLog);
    
    assert.equal(exitCode, 1);
  });
});

const mocklogger = function () {
  return function (content) {
    this.push(content);
  };
};

describe('displayOutput', () => {
  it('should display file contents', () => {
    const mockedErrorLog = displayContent(['good']);
    const actualContent = [];
    const mockedLog = mocklogger().bind(actualContent); 

    const result = [{ file: 'sample.txt', headContent: 'good' }];
    
    displayOutput(result, mockedLog, mockedErrorLog);
    assert.deepStrictEqual(actualContent, ['good']);
  });

  it('should display multiple lines', () => {
    const mockedErrorLog = displayContent(['good']);
    const actualContent = [];
    const mockedLog = mocklogger().bind(actualContent); 

    const result = [
      { file: 'a.txt', headContent: 'good' },
      { file: 'b.txt', headContent: 'good' }
    ];
    
    const expected = [
      '==> a.txt <==\ngood\n',
      '==> b.txt <==\ngood\n'
    ];
    
    displayOutput(result, mockedLog, mockedErrorLog);
    assert.deepStrictEqual(actualContent, expected);
  });

  it('should display error', () => {
    const mockedLog = displayContent(['good']);
    const actualContent = [];
    const mockedErrorLog = mocklogger().bind(actualContent); 
    const error = 'head: sample.txt: No such file or directory';
    const result = [{ file: 'sample.txt', error}];

    displayOutput(result, mockedLog, mockedErrorLog);
    assert.deepStrictEqual(actualContent, [error]);
  });
});
