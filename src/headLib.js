const { splitLines, firstLines, joinLines } = require('./helpers.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const firstTenLines = firstLines(lines, count);
  return joinLines(firstTenLines, separator);
};

exports.firstNLines = firstNLines;
