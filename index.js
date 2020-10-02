const handler = require('./lib/commandsHandler');

console.log(process.argv.slice(2));

handler(process.argv.slice(2));
