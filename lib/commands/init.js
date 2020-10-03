const chalk = require('chalk');

const handlePackageExistence = require('../helpers/package/handlePackageExistence');
const createPackage = require('../helpers/package/createPackage');
const shouldProvideGit = require('../helpers/git/shouldProvideGit');
const handleGitExistence = require('../helpers/git/handleGitExistence');
const provideGit = require('../helpers/git/provideGit');

const initPackage = async () => {
    const handlePackageExistenceResult = await handlePackageExistence();
    if (!handlePackageExistenceResult)
        return false;
    else if (handlePackageExistenceResult !== 'continue')
        if (!await createPackage())
            return false;
    return true;
};

const initGit = async (initConfig) => {
    if (await shouldProvideGit()) {
        initConfig.isGit = true;

        const handleGitExistenceResult = await handleGitExistence();
        if (!handleGitExistenceResult)
            return false;
        else if (handleGitExistenceResult !== 'continue')
            if (!await provideGit())
                return false;
    }
    return true;
};

exports.init = async (args, dependencyManager) => {
    let initConfig = {
        isGit: false,
    };

    if (!await initPackage())
        return;

    if (!await initGit(initConfig))
        return;
};

exports.initError = () => {
    console.log(chalk.red(`You can't use both -i and --init flag in one command.`));
};
