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
  const files = args.match(/[^-][a-zA-Z].*/g);
  if (files === null) {
    return;
  }
  const filenames = files.toString().split(' ');
  return filenames.filter(file => file);
};

const parseArgs = function (args) {
  const parameters = args.join(' ');
  const options = parameters.match(/^-.*\d/g);
  const filename = findFiles(parameters);

  let option = { key: 'count', value: 10 };
  if (options !== null) {
    option = structureOption(options);
  }
  return { 'filename': filename, option };
};

exports.parseArgs = parseArgs;
exports.findFiles = findFiles;
exports.structureOption = structureOption;
