const { splitLines, firstLines, joinLines } = require('./helpers.js');
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const firstTenLines = firstLines(lines, count);
  return joinLines(firstTenLines, separator);
};

const head = function(readFile, ...args){
  const { filename, separator, count } = parseArgs(args);
  const content = readFile(filename, 'utf8');
  return firstNLines(content, separator, count);
};

exports.firstNLines = firstNLines;
exports.head = head;
