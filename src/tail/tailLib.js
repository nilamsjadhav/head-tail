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

const reverseContent = content => content;

exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.reverseContent = reverseContent;
