const lastNLines = (content, numOfLines) => {
  const lines = content.split('\n');
  const index = lines.length - numOfLines;
  return lines.slice(index).join('\n');
};

exports.lastNLines = lastNLines;
