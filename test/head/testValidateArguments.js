const assert = require('assert');
const lib = require('../../src/head/validateArguments.js');
const {assertInvalidOption, assertBothPresent, isOptionFollowedByNumber } = lib;

describe('validateArgs', () => {
  it('should throw illegal option error and give usage', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => lib.validateArgs(['-b', '1', 'demo.txt']), {
      message: `head: illegal option -- b\n${usage}`
    });
  });

  it('should throw can\'t combine line and byte count error', () => {
    assert.throws(() => lib.validateArgs(['-n', '1', '-c', '1', 'sample']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('should throw illegal line count error', () => {
    assert.throws(() => lib.validateArgs(['-n', 'demo']), {
      message: 'head: illegal line count -- demo'
    });
  });

  it('should throw usage when file not specified', () => {
    assert.throws(() => lib.validateArgs(['-n1']), {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
  it('should validate file name and options', () => {
    assert.deepStrictEqual(lib.validateArgs(['-n1', 'demo']), undefined);
  });
});

describe('validate', () => {
  it('should validate options', () => {
    const actual = lib.validate(['-n', '1', 'demo'], ['demo']);
    assert.deepStrictEqual(actual, undefined);
  });

  it('should validate file name', () => {
    assert.deepStrictEqual(lib.validate(['demo'], ['demo']), undefined);
  });

  it('should throw error if both option present', () => {
    assert.throws(() => lib.validate(['-n1', '-c1', 'demo'], ['demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
});

describe('assertBothPresent', () => {
  it('should throw error if both option present', () => {
    assert.throws(() => assertBothPresent(['-n1', '-c1', 'demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
  
  it('should throw error if both option present with space', () => {
    assert.throws(() => assertBothPresent(['-n', '1', '-c', '1', 'demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
  
});

describe('assertInvalidOption', () => {
  it('should throw error when option is illegal', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => assertInvalidOption(['-b', '1']), {
      message: `head: illegal option -- b\n${usage}`
    });
  });
  it('should not throw anything when options are legal', () => {
    assert.strictEqual(assertInvalidOption(['-c', '1']), undefined);
  });
  it('should not throw anything when options is negative number', () => {
    assert.strictEqual(assertInvalidOption(['-1']), undefined);
  });
});

describe('isOptionFollowedByNumber', () => {
  it('should throw error if both value is absent', () => {
    assert.throws(() => isOptionFollowedByNumber(['-c'], ['demo']), {
      message: 'head: illegal byte count -- demo'
    });
  });
  it('should not throw error if -1 is given', () => {
    assert.equal(isOptionFollowedByNumber(['-1'], ['demo']), undefined);
  });
}); 

describe('extractOptions', () => {
  it('should give options', () => {
    const options = ['-n', '1', 'demo.txt'];
    const expected = ['-n', '1'];
    assert.deepStrictEqual(lib.extractOptions(options, 'demo.txt'), expected);
  });
});

describe('groupBy', () => {
  it('should return group of options when one option provided', () => {
    assert.deepStrictEqual(lib.groupBy(['-n', '1']), [['-n', '1']]);
  });
  it('should return group of options when one option provided', () => {
    const expected = [['-n', '1'], ['-c', '1']];
    assert.deepStrictEqual(lib.groupBy(['-n', '1', '-c', '1']), expected);
  });
});
