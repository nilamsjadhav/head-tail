const lib = require('./helpers.js');
const { splitLines, firstLines, joinLines, getSeparator } = lib;
const { parseArgs } = require('./parseArgs.js');
const { validateArguments } = require('./validateArguments.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const topContent = firstLines(lines, count);
  return joinLines(topContent, separator);
};

const head = function (readFile, log, errorLog, args) {
  validateArguments(args.join(' '));
  const { filename, option } = parseArgs(args);
  const separator = getSeparator(option);

  for (let index = 0; index < filename.length; index++) {
    try {
      const content = readFile(filename[index], 'utf8');
      log(firstNLines(content, separator, option.value));
    } catch (error) {
      errorLog(`head: ${filename[index]}: No such file or directory`);
    }
  }  
};

exports.firstNLines = firstNLines;
exports.head = head;
