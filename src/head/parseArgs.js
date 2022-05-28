const { formatArgs } = require('./library.js');

const structureOption = function ({option, count}) {
  const keys = { '-n': 'line', '-c': 'bytes' };
  if (option === undefined) {
    return { flag: 'line', count: 10 };
  }
  const flag = keys[option];
  return { flag, count};
};

const isOption = (flag) => flag.startsWith('-');

const getCount = (arg) => +arg;

const parseArgs = (args) => {
  const separatedArgs = formatArgs(args);
  let option, count, index = 0;

  while (args.length > index && isOption(separatedArgs[index])) {
    option = separatedArgs[index];
    count = getCount(separatedArgs[index + 1]);
    index += 2;
  }
  const fileNames = separatedArgs.slice(index);
  return { option, count, fileNames };
};

const parser = function (args) {
  const {option, count, fileNames} = parseArgs(args);
  const options = structureOption({ option, count });
  return { fileNames, options };
};

exports.parser = parser;
exports.structureOption = structureOption;
exports.parseArgs = parseArgs;
