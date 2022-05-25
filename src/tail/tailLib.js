const { splitLines, joinLines } = require('../head/library.js');

const lastNLines = (content, numOfLines) => {
  const lines = splitLines(content, '\n');
  return joinLines(lines.slice(-numOfLines), '\n');
};

const lastNCharacters = (content, numOfCharacters) => {
  return content.slice(-numOfCharacters);
};

const reverseContent = content => {
  const lines = splitLines(content, '\n');
  return joinLines(lines.reverse(), '\n');
};

exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.reverseContent = reverseContent;
