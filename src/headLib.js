const splitLines = (lines) => lines.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (lines, limit) => lines.slice(0, limit);

const firstNLines = function (content) {
  const lines = splitLines(content);
  const firstTenLines = firstLines(lines, 10);
  return joinLines(firstTenLines);
};

exports.firstNLines = firstNLines;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.firstLines = firstLines;
