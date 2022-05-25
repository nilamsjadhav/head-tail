const { splitLines, joinLines } = require('../head/library.js');

const lastNLines = (content, numOfLines) => {
  const lines = splitLines(content, '\n');
  const index = lines.length - numOfLines;
  return joinLines(lines.slice(index), '\n');
};

const lastNCharacters = (content, numOfCharacters) => {
  const index = content.length - numOfCharacters;
  return content.slice(index);
};

exports.lastNLines = lastNLines;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.lastNCharacters = lastNCharacters;
