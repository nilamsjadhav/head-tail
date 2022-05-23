const assert = require('assert');
const lib = require('../src/validateArguments.js');
const { validateArguments, areBothAbsent, checkIfNumberIsPresent, extractOptions } = lib;

describe('validateArguments', () => {
  it('should throw illegal option error and give usage', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => validateArguments('-b 1 demo.txt'), {
      message: `head: illegal option --b\n${usage}`
    });
  });

  it('should throw illegal option error and give usage', () => {
    assert.throws(() => validateArguments('-n 1 -c 1'), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('should throw illegal option error and give usage', () => {
    assert.throws(() => validateArguments('-n demo'), {
      message: 'head: illegal line count -- demo'
    });
  });
});

describe('areBothOptionsPresent', () => {
  it('should throw error if both option present', () => {
    assert.throws(() => lib.areBothOptionsPresent('-n1 -c1 demo'), {
      message: 'head: can\'t combine line and byte counts'
    });
  });
});

describe('areBothAbsent', () => {
  it('should throw error if both options absent', () => {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => areBothAbsent('-b1 demo'), {
      message: `head: illegal option --b\n${usage}`
    });
  });
});

describe('checkIfNumberIsPresent', () => {
  it('should throw error count is not present', () => {
    assert.throws(() => checkIfNumberIsPresent('-n demo'), {
      message: 'head: illegal undefined count -- n'
    });
  });
});

describe('extractOptions', () => {
  it('should give options', () => {
    const options = ['-n', '1', 'demo.txt'];
    assert.deepStrictEqual(extractOptions(options, 'demo.txt'), ['-n', '1']);
  });
});

