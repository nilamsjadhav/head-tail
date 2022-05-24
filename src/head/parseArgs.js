const { validateArgs } = require('./validateArguments.js');
const { findFiles, formatArgs } = require('./library.js');

const structureOption = function (options) {
  const keys = { '-n': 'line', '-c': 'bytes' };
  if (options.length === 0) {
    return { key: 'line', value: 10 };
  }
  
  const [option, num] = options;
  if (isFinite(+option)) {
    return { key: 'line', value: num };
  }
  const value = +num;
  const key = keys[option];
  return { key, value};
};

const getOption = function (options) {
  if (options.length === 0) {
    return options;
  }
  const count = +options.join('');

  if (isFinite(count)) {
    return [options[0], Math.abs(count)];
  }
  return formatArgs(options);
};

const parseArgs = function (args) {
  const parameters = validateArgs(args);
  const option = structureOption(getOption(parameters[0]));
  const filename = findFiles(parameters[1]);
  return { 'filename': filename, option };
};

exports.parseArgs = parseArgs;
exports.structureOption = structureOption;
exports.getOption = getOption;
