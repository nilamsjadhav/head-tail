const { validateArgs } = require('./validateArguments.js');
const { findFiles } = require('./library.js');

const formatArgs = (args) => {
  return args.flatMap(
    arg => arg.startsWith('-') ?
      [arg.slice(0, 2), arg.slice(2)] : arg).filter(arg => arg);
};

const structureOption = function (options) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (options.length === 0) {
    return { key: 'count', value: 10 };
  }
  const [option, num] = options;
  const providedSwitch = option.match(/^-[a-z]/g);
  
  if (providedSwitch === null) {
    return { key: 'count', value: num };
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

  if (isFinite(+options.join(''))) {
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
