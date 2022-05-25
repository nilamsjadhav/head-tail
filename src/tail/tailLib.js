const splitLines = (content, separator) => content.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const lastNLines = (content, numOfLines) => {
  const lines = splitLines(content, '\n');
  const index = lines.length - numOfLines;
  return joinLines(lines.slice(index), '\n');
};

exports.lastNLines = lastNLines;
exports.splitLines = splitLines;
