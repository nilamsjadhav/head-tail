const splitLines = (lines) => lines.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstNLines = function (content) {
  const lines = splitLines(content);
  const firstTenLines = lines.slice(0, 10);
  return joinLines(firstTenLines);
};
exports.firstNLines = firstNLines;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
