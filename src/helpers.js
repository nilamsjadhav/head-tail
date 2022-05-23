const areBothOptionsPresent = (args) => {
  const message = 'head: can\'t combine line and byte counts';
  const areBothPresent = args.includes('-n') && args.includes('-c');
  if (areBothPresent) {
    throw { message };
  }
};

const areBothAbsent = (args) => {
  const isOnePresent = args.includes('-n') || args.includes('-c');
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  if (!isOnePresent) {
    throw {
      message: `head: illegal option\n${usage}`
    };
  }
};

const validateArguments = function (args) {
  if (!/^-/.test(args.toString())) {
    return;
  }
  areBothOptionsPresent(args);
  areBothAbsent(args);
};

const splitLines = (lines, separator) => lines.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const firstLines = (lines, limit) => lines.slice(0, limit);

const getSeparator = function (option) {
  const separators = { 'count': '\n', 'bytes': '' };
  return option.key === undefined ? '\n' : separators[option.key];
};

exports.firstLines = firstLines;
exports.joinLines = joinLines;
exports.splitLines = splitLines;
exports.getSeparator = getSeparator;
exports.validateArguments = validateArguments;
