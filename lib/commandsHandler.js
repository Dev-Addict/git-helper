const clear = require('clear');

const {help, helpError} = require('./commands/help');
const {useYarnError} = require('./commands/useYarn');
const {setDefaultDependencyManager, setDefaultDependencyManagerError} = require('./commands/setDefaultDpendencyManager');
const configStore = require('./configStore');

const handler = async (args) => {
    clear();

    let dependencyManager = configStore.get('dependencyManager');

    if (args[0] === '--help' || args[0] === '-h' || args.length === 0)
        if (args.length <= 1)
            help();
        else {
            helpError();
            return;
        }
    else if (args[0] === '--set-default-dependency-manager' || args[0] === '-d')
        if (args.length === 2 && ['yarn', 'npm'].includes(args[1]))
            setDefaultDependencyManager(args);
        else {
            setDefaultDependencyManagerError();
            return;
        }
    else {
        if ((args.includes('--use-yarn') || args.includes('-y')) && !(args.includes('--use-yarn') && args.includes('-y')))
            dependencyManager = 'yarn';
        else {
            useYarnError();
            return;
        }
    }
};

module.exports = handler;
