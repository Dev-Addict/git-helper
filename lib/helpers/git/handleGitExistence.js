const {join} = require('path');
const {existsSync} = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const removeDirectory = require('../../utils/removeDirectory');
const gitAlreadyExistsQuestions = require('../../questions/git/gitAlreadyExistsQuestions');

module.exports = async () => {
    if (existsSync(join(process.cwd(), './.git'))) {
        const gitAlreadyExistsQuestionsResults = await inquirer.prompt(gitAlreadyExistsQuestions);

        if (!gitAlreadyExistsQuestionsResults.isAgree) {
            console.log(chalk.green('Successfully canceled the initialization'));
            return 'continue';
        }

        try {
            removeDirectory(join(process.cwd(), './git'));
            console.log(chalk.green('Successfully deleted .git directory'));
        } catch (err) {
            console.log(chalk.red(err.message));
            return false;
        }
    }
    return true;
};
