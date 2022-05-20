const { splitLines, firstLines, joinLines } = require('./helpers.js');

const firstNLines = function (content, count) {
  const lines = splitLines(content);
  const numOfLines = count || 10;
  const firstTenLines = firstLines(lines, numOfLines);
  return joinLines(firstTenLines);
};

exports.firstNLines = firstNLines;
