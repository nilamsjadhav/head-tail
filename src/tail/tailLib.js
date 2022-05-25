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

const getOperation = flag => flag === 'line' ? lastNLines : lastNCharacters;

const tailMain = function (content, option) {
  const flag = option.flag;
  const value = option.value;
  const operation = getOperation(flag);
  return operation(content, value);
};

exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.reverseContent = reverseContent;
exports.tailMain = tailMain;
exports.getOperation = getOperation;
