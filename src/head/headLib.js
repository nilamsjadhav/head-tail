const lib = require('./library.js');
const { splitLines, firstLines, joinLines, getSeparator } = lib;
const { parser } = require('./parseArgs.js');
const { validateArgs } = require('./validateArguments.js');

const structureHeader = (file) => `==> ${file} <==\n`;

const formatContent = ({ file, headContent }) => 
`${structureHeader(file)}${headContent}\n`;

const identity = ({ headContent }) => headContent;

const decideFormatter = results =>
  results.length > 1 ? formatContent : identity;

const firstNParts = (content, separator, count) => {
  const lines = splitLines(content, separator);
  const topContent = firstLines(lines, count);
  return joinLines(topContent, separator);
};

const headOfFile = function (readData, file, separator, { count }) {
  let content;
  try {
    content = readData(file, 'utf8');
    const headContent = firstNParts(content, separator, count);
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
  validateArgs(args);
  const { fileNames, options } = parser(args);
  const separator = getSeparator(options);

  const headContent = fileNames.map((file) =>
    headOfFile(read, file, separator, options));
  
  displayOutput(headContent, log, errorLog);
  return getExitCode(headContent);
};

exports.firstNParts = firstNParts;
exports.head = head;
exports.displayOutput = displayOutput;
exports.headOfFile = headOfFile;
