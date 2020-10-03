const {join} = require('path');
const {writeFileSync} = require('fs');
const beautify = require('json-beautify');
const inquirer = require('inquirer');
const chalk = require('chalk');

const checkPackage = require('./checkPackage');
const initPackageQuestions = require('../questions/initPackageQuestions');

module.exports = async () => {
    const initPackageQuestionsResults = await inquirer.prompt(initPackageQuestions);
    initPackageQuestionsResults.bugs = {
        url: initPackageQuestionsResults['bugs.url'],
        email: initPackageQuestionsResults['bugs.email']
    };
    initPackageQuestionsResults.repository = {
        type: 'git',
        url: initPackageQuestionsResults['repository']
    };
    initPackageQuestionsResults.scripts = {};
    initPackageQuestionsResults.configs = {};
    initPackageQuestionsResults.dependencies = {};
    initPackageQuestionsResults.devDependencies = {};

    const initResultsJson = beautify(initPackageQuestionsResults, null, 4, 1);

    const checkPackageResult = checkPackage(initResultsJson);

    if (!checkPackageResult) {
        return await this();
    }

    try {
        writeFileSync(join(process.cwd(), './package.json'), initResultsJson);
        console.log(chalk.green('Successfully created package.json file'));
    } catch (err) {
        console.log(chalk.red(err.message));
        return false;
    }

    return true;
};
