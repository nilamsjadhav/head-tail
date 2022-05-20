const { splitLines, firstLines, joinLines } = require('./helpers.js');

const firstNLines = function (content) {
  const lines = splitLines(content);
  const firstTenLines = firstLines(lines, 10);
  return joinLines(firstTenLines);
};

exports.firstNLines = firstNLines;
