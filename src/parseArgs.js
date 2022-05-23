const decideSwitch = (args) => {
  const option = args.join().match(/[^\d].*[a-z]/g);
  return /^-\d/.test(args) ? ['-n'] : option;
};

const findValue = (option) => option.join().match(/\d/g);

const structureOption = function (options) {
  const parameters = options.match(/^-.*\d/g);
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (parameters === null) {
    return { key: 'count', value: 10 };
  }
  const option = decideSwitch(parameters);
  const value = + findValue(parameters);
  const key = keys[option];
  return { key, value};
};

const findFiles = function (args) {
  const option = [];
  for (let index = 0; index < args.length; index++) {
    if (!(args[index].includes('-') || /\d$/.test(args[index]))) {
      option.push(args[index]);
    }
  }
  return option;
};

const parseArgs = function (args) {
  const parameters = args.join(' ');
  const option = structureOption(parameters);
  const filename = findFiles(args);
  return { 'filename': filename, option };
};

exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
exports.structureOption = structureOption;
exports.decideSwitch = decideSwitch;
exports.findValue = findValue;
