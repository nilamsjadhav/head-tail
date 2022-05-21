const lib = require('./helpers.js');
const { splitLines, firstLines, joinLines, getSeparator } = lib;
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const topContent = firstLines(lines, count);
  return joinLines(topContent, separator);
};

const head = function (readFile, args) {
  const { filename, option } = parseArgs(args);
  const separator = getSeparator(option);
  let content = '';
  try {
    content = readFile(...filename, 'utf8');
  } catch (error) {
    throw { message: 'head: No such file or directory'};
  }
  return firstNLines(content, separator, option.value);
};

exports.firstNLines = firstNLines;
exports.head = head;
