const {help, helpError} = require('./commands/help');

const handler = (args) => {
    if (args[0] === '--help') {
        if (args.length === 1)
            help();
        else
            helpError();
    }
};

module.exports = handler;
