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
