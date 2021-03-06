const splitLines = (lines, separator) => lines.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const firstLines = (lines, limit) => lines.slice(0, limit);

const getSeparator = function (option) {
  const separators = { 'line': '\n', 'bytes': '' };
  return option.flag === undefined ? '\n' : separators[option.flag];
};

const findFiles = function (args) {
  const files = [];
  for (const arg of args) {
    const isFlag = arg.includes('-');
    const isNumericOption = /\d$/.test(arg);
    const isOption = isFlag || isNumericOption;
    
    if (!isOption) {
      files.push(arg);
    }
  }
  return files;
};

const isOption = (arg) => arg.startsWith('-');

const isNumericOption = (option) => isOption(option) && isFinite(option);

const groupOptionValue = (arg) => {
  if (isNumericOption(arg)) {
    return ['-n', Math.abs(+arg)];
  }
  return isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const formatArgs = (args) => {
  return args.flatMap(groupOptionValue).filter(arg => arg);
};

exports.firstLines = firstLines;
exports.joinLines = joinLines;
exports.splitLines = splitLines;
exports.getSeparator = getSeparator;
exports.findFiles = findFiles;
exports.formatArgs = formatArgs;
