const chalk = require('chalk');

const handlePackageExistence = require('../helpers/handlePackageExistence');
const createPackage = require('../helpers/createPackage');

exports.init = async (args, dependencyManager) => {
    if (!await handlePackageExistence())
        return;
    if (!await createPackage(args, dependencyManager))
        return;
};

exports.initError = () => {
    console.log(chalk.red(`You can't use both -i and --init flag in one command.`));
};
