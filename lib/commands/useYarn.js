const chalk = require('chalk');

exports.useYarnError = () => {
    console.log(chalk.red(`You can't use both -y and --use-yarn flag in one command.`));
};
