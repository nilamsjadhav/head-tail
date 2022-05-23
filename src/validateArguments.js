const { findFiles } = require('./parseArgs.js');

const formatArgs = (args) => {
  return args.flatMap(
    arg => arg.startsWith('-') ?
      [arg.slice(0, 2), arg.slice(2)] : arg).filter(arg => arg);
};

const areBothOptionsPresent = (args) => {
  const areBothPresent = args.includes('-n') && args.includes('-c');
  if (areBothPresent) {
    throw { message: 'head: can\'t combine line and byte counts' };
  }
};

const areBothAbsent = (args) => {
  const presentOption = args.match(/^-[a-z1-9]/g);
  const isOnePresent = presentOption.join().match(/[cn1-9]/g);
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  if (!isOnePresent) {
    throw {
      message: `head: illegal option -${presentOption}\n${usage}`
    };
  }
};

const extractOptions = function(options, file){
  const index = options.indexOf(file[0]);
  return options.slice(0, index);
};

const checkIfNumberIsPresent = function (args) {
  const keys = { '-n': 'line', '-c': 'byte' };
  const file = findFiles(args);
  const switches = extractOptions(args, file);
  
  for (let index = 0; index < switches.length; index++) {
    const isNextNumber = /[1-9]/.test(switches[index + 1]); 
    
    if(switches[index].startsWith('-') && !isNextNumber ) {
      const option = keys[switches[index]];
      throw { message: `head: illegal ${option} count -- ${file[0]}` };
    }
  }
};

const validateArguments = function (args) {
  if (!args.includes('-')) {
    return;
  }
  const parameters = formatArgs(args.split(' ')); 
  areBothOptionsPresent(args);
  areBothAbsent(args);
  checkIfNumberIsPresent(parameters);
};
exports.validateArguments = validateArguments;
exports.areBothAbsent = areBothAbsent;
exports.areBothOptionsPresent = areBothOptionsPresent;
exports.checkIfNumberIsPresent = checkIfNumberIsPresent;
exports.extractOptions = extractOptions;
exports.formatArgs = formatArgs;
