const {join} = require('path');
const {writeFileSync} = require('fs');
const chalk = require('chalk');

const git = require('../../git');

module.exports = async () => {
    const userPackage = require(join(process.cwd(), './package.json'));
    const readme = `#${userPackage.name}\n\n${userPackage.description}`;

    try {
        writeFileSync(join(process.cwd(), './readme.md'), readme);
        console.log(chalk.green('Successfully created readme.md file'));

        const gitInitResult = await git.init();
        console.log(chalk.green('Successfully initialized git'));
        console.log(gitInitResult);
    } catch (err) {
        console.log(chalk.red(err.message));
        return false;
    }

    return true;
};
