const firstNLines = function (content) {
  const lines = content.split('\n');
  const firstTenLines = lines.slice(0, 10);
  return firstTenLines.join('\n');
};
exports.firstNLines = firstNLines;
