const { splitLines, firstLines, joinLines } = require('./helpers.js');
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const firstTenLines = firstLines(lines, count);
  return joinLines(firstTenLines, separator);
};

const getSeparator = function (option) {
  const separators = { 'count': '\n', 'bytes': '' };
  return option.key === undefined ? '\n' : separators[option.key];
};

const head = function (readFile, args) {
  const { filename, option } = parseArgs(args);
  const separator = getSeparator(option);
  let content = '';
  try {
    content = readFile(...filename, 'utf8');
  } catch (error) {
    throw {
      message: 'File not found'
    };
  }
  return firstNLines(content, separator, option.value);
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.getSeparator = getSeparator;
