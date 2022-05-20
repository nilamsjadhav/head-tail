const parseArgs = function (args) {
  const keys = { '-n': '\n', '-c': ' ' };
  const [option, value] = args.slice(0, 2);
  const separator = keys[option] || '\n';
  const count = +value || 10;
  return { 'filename': args[args.length - 1], count, separator };
};

exports.parseArgs = parseArgs;
