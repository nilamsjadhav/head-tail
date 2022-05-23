const findSwitch = (option) => option.join().match(/[^\d].*[a-z]/g);

const findValue = (option) => option.join().match(/\d/g);

const structureOption = function (options) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const option = findSwitch(options);
  const value = + findValue(options);
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
  const options = parameters.match(/^-.*\d/g);
  const filename = findFiles(args);

  let option = { key: 'count', value: 10 };
  if (options !== null) {
    option = structureOption(options);
  }
  return { 'filename': filename, option };
};

exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
exports.structureOption = structureOption;
