const {join} = require('path');
const {existsSync, unlinkSync} = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const packageAlreadyExistsQuestions = require('../questions/packageAlreadyExistsQuestions');

module.exports = async () => {
    if (existsSync(join(process.cwd(), './package.json'))) {
        const packageAlreadyExistsQuestionsResults = await inquirer.prompt(packageAlreadyExistsQuestions);

        if (!packageAlreadyExistsQuestionsResults.isAgree) {
            console.log(chalk.green('Successfully canceled the initialization'));
            return false;
        }

        try {
            unlinkSync(join(process.cwd(), './package.json'));
            console.log(chalk.green('Successfully deleted package.json file'));
        } catch (err) {
            console.log(chalk.red(err.message));
            return false;
        }
    }
    return true;
};
