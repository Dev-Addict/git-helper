const chalk = require('chalk');
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
        if (['--use-yarn', '-y'].some(value => args.includes(value)) && ['--use-npm', '-n'].some(value => args.includes(value))) {
            console.log(chalk.red('you can\'t provide both --use-yarn(-y) and --use-npm(-n) flag in a single command.'));
            return;
        }
        if ((args.includes('--use-yarn') || args.includes('-y')) && !(args.includes('--use-yarn') && args.includes('-y')))
            dependencyManager = 'yarn';
        else {
            useYarnError();
            return;
        }
        if ((args.includes('--use-npm') || args.includes('-n')) && !(args.includes('--use-npm') && args.includes('-n')))
            dependencyManager = 'npm';
        else {
            useYarnError();
            return;
        }
    }
};

module.exports = handler;
