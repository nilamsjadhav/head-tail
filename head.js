const fs = require('fs');
const { head } = require('./src/head/headLib.js');

const main = (args) => {
  try {
    process.exitCode = head(args, fs.readFileSync, console.log, console.error);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
