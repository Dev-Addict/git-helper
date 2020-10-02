const chalk = require('chalk');

exports.useNpmError = () => {
    console.log(chalk.red(`You can't use both -n and --use-npm flag in one command.`));
};
