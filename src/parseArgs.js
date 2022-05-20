const parseArgs = function (args) {
  const [option, value] = args.slice(0, 2);
  const separator = option === '-c' ? '' : '\n';
  const count = +value || 10;
  return { 'filename': args[args.length - 1], count, separator };
};

exports.parseArgs = parseArgs;
