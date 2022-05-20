const fs = require('fs');

const { head } = require('./src/headLib.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    if (args.length === 0) {
      throw 'usage: head [-n lines | -c bytes] [file ...]';
    }
    console.log(head(fs.readFileSync, process.argv.slice(2)));
  } catch (error) {
    console.log(error);
  }
};

main();
