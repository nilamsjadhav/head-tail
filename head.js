const fs = require('fs');
const { head } = require('./src/headLib.js');
const { validateArguments } = require('./src/helpers.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    if (args.length === 0) {
      throw { message: 'usage: head [-n lines | -c bytes] [file ...]'};
    }
    if (args.length !== 1) {
      validateArguments(args.join(''));
    }
    console.log(head(fs.readFileSync, process.argv.slice(2)));
  } catch (error) {
    console.log(error.message);
  }
};

main();
