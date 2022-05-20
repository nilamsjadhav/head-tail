const splitLines = (lines) => lines.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (lines, limit) => lines.slice(0, limit);

exports.firstLines = firstLines;
exports.joinLines = joinLines;
exports.splitLines = splitLines;
