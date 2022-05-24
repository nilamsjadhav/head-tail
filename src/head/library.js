const splitLines = (lines, separator) => lines.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const firstLines = (lines, limit) => lines.slice(0, limit);

const getSeparator = function (option) {
  const separators = { 'line': '\n', 'bytes': '' };
  return option.key === undefined ? '\n' : separators[option.key];
};

const findFiles = function (args) {
  const option = [];
  for (let index = 0; index < args.length; index++) {
    if (!(args[index].includes('-') || /\d$/.test(args[index]))) {
      option.push(args[index]);
    }
  }
  return option;
};

const formatArgs = (args) => {
  return args.flatMap(
    arg => arg.startsWith('-') ?
      [arg.slice(0, 2), arg.slice(2)] : arg).filter(arg => arg);
};

exports.firstLines = firstLines;
exports.joinLines = joinLines;
exports.splitLines = splitLines;
exports.getSeparator = getSeparator;
exports.findFiles = findFiles;
exports.formatArgs = formatArgs;
