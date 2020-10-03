const inquirer = require('inquirer');

const shouldProvideGitQuestions = require('../../questions/git/shouldProvideGitQuestions');

module.exports = async () => {
    const shouldProvideGitQuestionsResult = await inquirer.prompt(shouldProvideGitQuestions);
    return shouldProvideGitQuestionsResult.isAgree;
};
