const clear = require('clear');

const {help, helpError} = require('./commands/help');
const {useYarnError} = require('./commands/useYarn');
const configStore = require('./configStore');

const handler = async (args) => {
    clear();

    let dependencyManager = configStore.get('dependencyManager');

    if (args[0] === '--help' || args[0] === '-h' || args.length === 0) {
        if (args.length <= 1)
            help();
        else
            helpError();
    } else {
        if ((args.includes('--use-yarn') || args.includes('-y')) && !(args.includes('--use-yarn') && args.includes('-y')))
            dependencyManager = 'yarn';
        else
            useYarnError();
    }
};

module.exports = handler;
