const splitLines = (content, separator) => content.split(separator);

const lastNLines = (content, numOfLines) => {
  const lines = splitLines(content, '\n');
  const index = lines.length - numOfLines;
  return lines.slice(index).join('\n');
};

exports.lastNLines = lastNLines;
exports.splitLines = splitLines;
