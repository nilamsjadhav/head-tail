const { findFiles } = require('./library.js');

const formatArgs = (args) => {
  return args.flatMap(
    arg => arg.startsWith('-') ?
      [arg.slice(0, 2), arg.slice(2)] : arg).filter(arg => arg);
};

const extractOptions = function(options, file){
  const index = options.indexOf(file[0]);
  return options.slice(0, index);
};

const areBothPresent = function (context, presentOptions) {
  const options = context.concat(presentOptions).join(' ');
  const areBothPresent = options.includes('-n') && options.includes('-c');
  if (areBothPresent) {
    throw { message: 'head: can\'t combine line and byte counts' };
  }
};

const isOneOfBothPresent = function (context) {
  return context.includes('-c') || context.includes('-n');
};

const isOptionInvalid = function(context){
  const [option] = context;
  const letter = option.match(/[a-z]/g);
  const isDigitPresent = !/^-\d/.test(option);

  if (!isOneOfBothPresent(option) && isDigitPresent) {
    const usage = 'usage: head [-n lines | -c bytes] [file ...]';
    throw {
      message: `head: illegal option -- ${letter}\n${usage}`
    };
  }
};

const areOptionsValid = function(options1, options2){
  return isOptionInvalid(options1) && isOptionInvalid(options2);
};

const groupBy = function (list) {
  let count = 0; 
  const partitions = [];
  while (list.length > count ) {
    partitions.push(list.slice(count, count + 2));
    count += 2;
  }  
  return partitions;
};

const isDigitAbsent = function(options){
  const isDigitAbsent = !/\d/.test(options[1]);
  let isNegativeNumberPresent = true;
  if (isDigitAbsent) {
    isNegativeNumberPresent = /^-\d/.test(options[0]);
  }
  return isNegativeNumberPresent;
};

const isOptionFollowedByNumber = function (currentGroup, files) {
  const separateOptions = formatArgs(currentGroup);
  const isNegativeNumberPresent = isDigitAbsent(separateOptions);
  const word = separateOptions.includes('-c') ? 'byte' : 'line'; 
  if (!isNegativeNumberPresent) {
    throw {
      message: `head: illegal ${word} count -- ${files[0]}`
    };
  }
};

const validateOptions = function(currentGroup, nextGroup, files){
  areBothPresent(currentGroup, nextGroup);
  areOptionsValid(currentGroup, nextGroup, files);
  isOptionFollowedByNumber(currentGroup, files);
};

const validate = function (args, files) {
  const options = extractOptions(args, files) || args;
  const partitions = groupBy(options);
  let nextPart = [], currentPart = [];

  for (let index = 0; index < partitions.length; index++) {
    currentPart = partitions[index];
    nextPart = partitions[index + 1];
    const nextOptions = nextPart || files;
    validateOptions(currentPart, nextPart, nextOptions);
  }
  return [currentPart, args];
};

const validateArgs = function(args){
  const files = findFiles(args);
  if (files.length === 0) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]'};
  }
  return validate(args, files);
};

exports.validateArgs = validateArgs;
exports.areBothPresent = areBothPresent;
exports.isOptionInvalid = isOptionInvalid;
exports.isOptionFollowedByNumber = isOptionFollowedByNumber;
exports.extractOptions = extractOptions;
exports.validate = validate;
exports.groupBy = groupBy;
