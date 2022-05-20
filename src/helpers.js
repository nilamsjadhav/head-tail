const splitLines = (lines, separator) => lines.split(separator);

const joinLines = (lines, separator) => lines.join(separator);

const firstLines = (lines, limit) => lines.slice(0, limit);

exports.firstLines = firstLines;
exports.joinLines = joinLines;
exports.splitLines = splitLines;
