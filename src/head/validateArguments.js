const { findFiles, formatArgs } = require('./library.js');

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

const isDigitAbsent = function (options) {
  const [hypen, option] = options;
  return !isFinite(+option);
};

const isOptionInvalid = function (context) {
  const formattedArgs = formatArgs(context);
  const [option] = formattedArgs;
  const [hypen, letter] = option.split('');
  
  const isValueAbsent = isDigitAbsent(option);
  if (!isOneOfBothPresent(option) && isValueAbsent) {
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

const isOptionFollowedByNumber = function (currentGroup, files) {
  const separateOptions = formatArgs(currentGroup);
  const isNegativeNumberAbsent = isDigitAbsent(separateOptions[0].split(''));
  const [flag, value] = separateOptions;
  const isValueAbsent = !isFinite(value);

  const word = separateOptions.includes('-c') ? 'byte' : 'line'; 
  if (isNegativeNumberAbsent && isValueAbsent) {
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

const validateArgs = function (args) {
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
