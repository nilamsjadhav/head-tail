const lib = require('./library.js');
const { splitLines, firstLines, joinLines, getSeparator } = lib;
const { parseArgs } = require('./parseArgs.js');

const appendHeader = ({ file, headContent }) =>
  `==> ${file} <==\n${headContent}\n`;

const identity = ({ headContent }) => headContent;

const decideFormatter = results =>
  results.length > 1 ? appendHeader : identity;

const firstNParts = function (content, separator, count) {
  const lines = splitLines(content, separator);
  const topContent = firstLines(lines, count);
  return joinLines(topContent, separator);
};

const headOfFile = function (readData, file, separator, { value }) {
  try {
    const content = readData(file, 'utf8');
    const headContent = firstNParts(content, separator, value);
    return { file, headContent };
  } catch (err) {
    const error = `head: ${file}: No such file or directory`;
    return { file, error };
  } 
};

const displayOutput = function ( headContent, log, errorLog ) {
  const formatter = decideFormatter(headContent);  

  headContent.forEach(file => {
    if (!file.error) {
      log(formatter(file));
      return;
    }    
    errorLog(file.error);
  });
};

const getExitCode = files => files.some((file) => file.error);

const head = function (args, read, log, errorLog) {
  const { fileNames, option } = parseArgs(args);
  const separator = getSeparator(option);

  const headContent = fileNames.map((file) =>
    headOfFile(read, file, separator, option));
  
  displayOutput(headContent, log, errorLog);
  return getExitCode(headContent);
};

exports.firstNParts = firstNParts;
exports.head = head;
exports.displayOutput = displayOutput;
