const lib = require('./library.js');
const { splitLines, firstLines, joinLines, getSeparator } = lib;
const { parseArgs } = require('./parseArgs.js');

const firstNLines = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const topContent = firstLines(lines, count);
  return joinLines(topContent, separator);
};

const readFile = function (readData, file, separator, value) {
  try {
    const content = readData(file, 'utf8');
    const text = firstNLines(content, separator, value);
    return { file, text, isRead: true };
  } catch (error) {
    const text = `head: ${file}: No such file or directory`;
    return { file, text, isRead: false };
  }
};

const displayOutput = function (result, log, errorLog) {
  if (result.length === 1 && result[0].isRead) {
    log(result[0].text);
    return;
  }

  result.forEach(element => {
    if (element.isRead) {
      log(`==> ${element.file} <==\n${element.text}\n`);
      return;
    }    
    errorLog(element.text);
  });
};

const head = function (readFunc, log, errorLog, args) {
  const { filename, option } = parseArgs(args);
  const separator = getSeparator(option);
  const result = [];

  for (let index = 0; index < filename.length; index++) {
    result.push(readFile(readFunc, filename[index], separator, option.value));
  }
  displayOutput(result, log, errorLog);
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.displayOutput = displayOutput;
