const assert = require('assert');
const lib = require('../../src/head/validateArguments.js');
const { validateArgs, isOptionInvalid, areBothPresent, extractOptions, isOptionFollowedByNumber, validate, groupBy } = lib;

describe('validateArgs', () => {
  it('should throw illegal option error and give usage', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => validateArgs(['-b', '1', 'demo.txt']), {
      message: `head: illegal option -- b\n${usage}`
    });
  });

  it('should throw illegal option error and give usage', () => {
    assert.throws(() => validateArgs(['-n', '1', '-c', '1', 'sample']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('should throw illegal option error and give usage', () => {
    assert.throws(() => validateArgs(['-n', 'demo']), {
      message: 'head: illegal line count -- demo'
    });
  });

  it('should throw usage when file not specified', () => {
    assert.throws(() => validateArgs(['-n1']), {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
  it('should give arguments and filename', () => {
    const expected = [['-n1'], ['-n1', 'demo']];
    assert.deepStrictEqual(validateArgs(['-n1', 'demo']), expected);
  });
});

describe('validate', () => {
  it('should give options and arguments array', () => {
    const expected = [['-n', '1'], ['-n', '1', 'demo']];
    assert.deepStrictEqual(validate(['-n', '1', 'demo'], ['demo']), expected);
  });

  it('should give filename', () => {
    const expected = [[], ['demo']];
    assert.deepStrictEqual(validate(['demo'], ['demo']), expected);
  });

  it('should throw error if both option present', () => {
    assert.throws(() => validate(['-n1', '-c1', 'demo'], ['demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
});

describe('areBothPresent', () => {
  it('should throw error if both option present', () => {
    assert.throws(() => areBothPresent(['-n1', '-c1', 'demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
  
  it('should throw error if both option present with space', () => {
    assert.throws(() => areBothPresent(['-n', '1', '-c', '1', 'demo']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
  
});

describe('isOptionsInvalid', () => {
  it('should throw error count is not present', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => isOptionInvalid(['-b', '1']), {
      message: `head: illegal option -- b\n${usage}`
    });
  });
  it('should not throw anything when options are legal', () => {
    assert.strictEqual(isOptionInvalid(['-c', '1']), undefined);
  });
  it('should not throw anything when options is negative number', () => {
    assert.strictEqual(isOptionInvalid(['-1']), undefined);
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
    assert.deepStrictEqual(extractOptions(options, 'demo.txt'), ['-n', '1']);
  });
});

describe('groupBy', () => {
  it('should return group of options when one option provided', () => {
    assert.deepStrictEqual(groupBy(['-n', '1']), [['-n', '1']]);
  });
  it('should return group of options when one option provided', () => {
    const expected = [['-n', '1'], ['-c', '1']];
    assert.deepStrictEqual(groupBy(['-n', '1', '-c', '1']), expected);
  });
});
