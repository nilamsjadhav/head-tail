const { splitLines, firstLines, joinLines } = require('./helpers.js');
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const firstTenLines = firstLines(lines, count);
  return joinLines(firstTenLines, separator);
};

const head = function (readFile, args) {
  const { filename, separator, count } = parseArgs(args);
  let content = '';
  try {
    content = readFile(filename, 'utf8');
  } catch (error) {
    throw {
      name: filename,
      message: 'File not found'
    };
  }
  return firstNLines(content, separator, count);
};

exports.firstNLines = firstNLines;
exports.head = head;
