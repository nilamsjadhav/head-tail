const fs = require('fs');
const { head } = require('./src/headLib.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    if (args.length === 0) {
      throw { message: 'usage: head [-n lines | -c bytes] [file ...]'};
    }
    head(fs.readFileSync, console.log, console.error, process.argv.slice(2));
  } catch (error) {
    console.log(error.message);
  }
};

main();
