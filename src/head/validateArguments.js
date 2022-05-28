const { findFiles, formatArgs } = require('./library.js');

const combinationError = () => {
  return { message: 'head: can\'t combine line and byte counts' };
};

const illegalOptionError = (letter) => {
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  return { message: `head: illegal option -- ${letter}\n${usage}` };
};

const illegalCountError = (word, file) => {
  return { message: `head: illegal ${word} count -- ${file}`};
};

const usage = () => {
  return { message: 'usage: head [-n lines | -c bytes] [file ...]'};
};

const extractOptions = function(args, file){
  const index = args.indexOf(file[0]);
  return args.slice(0, index);
};

const areBothOptionsPresent = (options) => 
  options.includes('-n') && options.includes('-c');

const assertBothPresent = function (context, presentOptions) {
  const options = context.concat(presentOptions).join(' ');

  if (areBothOptionsPresent(options)) {
    throw combinationError();
  }
};

const isOneOfBothPresent = context => 
  context.includes('-c') || context.includes('-n');

const isDigitAbsent = options => {
  const [, option] = options;
  return !isFinite(+option);
};

const assertInvalidOption = function (context) {
  const formattedArgs = formatArgs(context);
  const [option] = formattedArgs;
  const letter = option[1];
  
  const isValueAbsent = isDigitAbsent(option);
  if (!isOneOfBothPresent(option) && isValueAbsent) {
    throw illegalOptionError(letter);
  }
};

const areOptionsValid = function (options1, options2) {
  return assertInvalidOption(options1) && assertInvalidOption(options2);
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
  const value = separateOptions[1];
  const isValueAbsent = !isFinite(value);

  const word = separateOptions.includes('-c') ? 'byte' : 'line'; 

  if (isNegativeNumberAbsent && isValueAbsent) {
    throw illegalCountError(word, files[0]);
  }
};

const validateOptions = function(currentGroup, nextGroup, files){
  assertBothPresent(currentGroup, nextGroup);
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
};

const validateArgs = function (args) {
  const files = findFiles(args);
  if (files.length === 0) {
    throw usage();
  }
  validate(args, files);
};

exports.validateArgs = validateArgs;
exports.assertBothPresent = assertBothPresent;
exports.assertInvalidOption = assertInvalidOption;
exports.isOptionFollowedByNumber = isOptionFollowedByNumber;
exports.extractOptions = extractOptions;
exports.validate = validate;
exports.groupBy = groupBy;
