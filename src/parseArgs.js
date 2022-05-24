const { validateArgs } = require('./validateArguments.js');
const { findFiles } = require('./library.js');

const structureOption = function (options) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (options.length === 0) {
    return { key: 'count', value: 10 };
  }
  const [option, num] = options;
  const providedSwitch = option.match(/^-[a-z]/g);
  
  if (providedSwitch === null) {
    return { key: 'count', value: +num };
  }
  const value = +num;
  const key = keys[option];
  return { key, value};
};

const getOption = function (options) {
  if (options.length === 0) {
    return options;
  }
  const latestOption = options[options.length - 1];
  if (latestOption.length > 2) {
    const option = latestOption.match(/^-[a-z]|^-\d+/g);
    const value = latestOption.match(/\d+/g);
    return [...option, ...value];
  }
  return options;
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
