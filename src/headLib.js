const { splitLines, firstLines, joinLines } = require('./helpers.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const numOfLines = count || 10;
  const firstTenLines = firstLines(lines, numOfLines);
  return joinLines(firstTenLines, separator);
};

exports.firstNLines = firstNLines;
