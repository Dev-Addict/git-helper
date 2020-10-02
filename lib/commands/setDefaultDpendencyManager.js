const chalk = require('chalk');

const configStore = require('../configStore');

exports.setDefaultDependencyManager = (args) => {
    configStore.set('dependencyManager', args[1]);
    console.log(chalk.green(`dependencyManager has successfully changed to ${args[1]}.`))
};

exports.setDefaultDependencyManagerError = () => {
    console.log(chalk.red('You should provide npm or yarn as argument to this flag.'))
};
