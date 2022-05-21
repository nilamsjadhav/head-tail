const { splitLines, firstLines, joinLines } = require('./helpers.js');
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const firstTenLines = firstLines(lines, count);
  return joinLines(firstTenLines, separator);
};

const getSeparator = function (option) {
  const separators = { 'count': '\n', 'bytes': '' };
  const key = Object.keys(option);
  return key.length === 0 ? '\n' : separators[key];
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
  const count = Object.values(option);
  return firstNLines(content, separator, count);
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.getSeparator = getSeparator;
